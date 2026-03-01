import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaStar, FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const [educator, setEducator] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openLectureId, setOpenLectureId] = useState("");
  const [isEnroll, setIsEnroll] = useState(false)

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const fetchCourse = async () => {
    try {
      let selected = courseData.find((c) => c._id === courseId);

      if (!selected) {
        const res = await axios.get(
          `${serverUrl}/api/course/getcourse/${courseId}`
        );
        selected = res.data;
      }

      setCourse(selected);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses.some((c)=> (typeof c === 'string'? c: c._id).toString() === courseId?.toString())
    if(verify) {
      setIsEnroll(true)
    }
  }
  useEffect(() => {
    fetchCourse();
  }, [courseId, courseData]);

  useEffect(() => {
    checkEnrollment();
  }, [userData, courseId]);

  useEffect(() => {
    const handleCreator = async () => {
      if (course?.creator) {
        try {
          const result = await axios.post(`${serverUrl}/api/course/creator`, { userId: course?.creator }, { withCredentials: true })
          console.log(result)
          setEducator(result.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    handleCreator()
  }, [course])

  useEffect(() => {
    if (educator?._id && courseData.length > 0) {
      const otherCourses = courseData.filter((c) =>
        c.creator === educator?._id && c._id !== courseId)
      setCreatorCourses(otherCourses)
    }

  }, [educator, courseData])
  if (loading)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <ClipLoader color="orange" />
      </div>
    );

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(serverUrl + '/api/order/razorpay-order', { userId, courseId }, { withCredentials: true })
      console.log(orderData)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: 'INR',
        name: "Mehnaz Codes",
        description: "Course Enroll Payment",
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("Razorpay Payment", response)
          try {
            const verifyPayment = await axios.post(serverUrl + '/api/order/verifypayment', { ...response, courseId, userId }, { withCredentials: true })
            setIsEnroll(true)
            toast.success(verifyPayment.data.message)
          } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-10">
      {/* 🔙 Back */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-8"
      >
        <FaArrowLeft /> Back
      </div>

      {/* 🖼️ Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={course.thumbnail}
          alt="thumb"
          className="rounded-2xl w-full h-64 object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-400">{course.subTitle}</p>

          <div className="flex items-center gap-4">
            <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>

            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span>{course.rating || "4.5"}</span>
            </div>

            <span className="text-xl font-semibold">
              ₹{course.price || "Free"}
            </span>
          </div>

          {/* 👤 Creator */}
          {educator && (
            <div
              onClick={() => navigate(`/profile/${educator._id}`)}
              className="flex items-center gap-3 cursor-pointer hover:text-orange-500"
            >
              <img
                src={educator.photoUrl}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <span>{educator.name}</span>
            </div>
          )}

          {
            isEnroll? <button className="mt-6 w-52 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-orange-400 transition"
            onClick ={()=>navigate(`/viewlecture/${courseId}`)}
            >
            Watch Now
          </button> : <button className="mt-6 w-52 py-3 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-400 transition"
            onClick={() => handleEnroll(userData._id, courseId)}
          >
            Enroll Now
          </button>
          }
        </div>
      </div>

      {/* 📝 Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">
          What you'll learn
        </h2>
        <p className="text-gray-300">{course.description}</p>
      </div>

      {/* 📚 Curriculum */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Curriculum</h2>

        <div className="space-y-4">
          {course.lectures?.map((lec, index) => (
            <div
              key={lec._id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <div
                onClick={() =>
                  lec.isPreviewFree
                    ? setOpenLectureId(
                      openLectureId === lec._id ? "" : lec._id
                    )
                    : null
                }
                className="p-4 flex justify-between items-center cursor-pointer"
              >
                <div>
                  Lecture {index + 1}: {lec.lectureTitle}
                </div>

                {lec.isPreviewFree ? (
                  <span className="text-orange-500 text-sm">
                    Preview
                  </span>
                ) : (
                  <FaLock className="text-gray-400" />
                )}
              </div>

              {openLectureId === lec._id && (
                <div className="px-4 pb-4">
                  <video
                    src={lec.videoUrl}
                    controls
                    className="w-full rounded-xl border border-white/10"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ Other Courses by Creator */}
      {creatorCourses.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            More courses by {educator?.name}
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {creatorCourses.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/course/${item._id}`)
                }
                className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-orange-500 transition"
              >
                <img
                  src={item.thumbnail}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                  alt=""
                />

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                  <span>₹{item.price}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar size={12} />
                    <span>{item.rating || "4.5"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⭐ Review Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-6">
          isko shi karna hai 
        </h2>
        yha ye extra likh hai 

        <div className="flex gap-3 text-2xl text-gray-400 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              onClick={() => setRating(num)}
              className={`cursor-pointer ${num <= rating ? "text-yellow-400" : ""
                }`}
            />
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-4 rounded-lg bg-black/40 border border-white/10 outline-none"
        />

        <button className="mt-4 px-8 py-3 bg-orange-500 text-black rounded-full font-semibold">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
