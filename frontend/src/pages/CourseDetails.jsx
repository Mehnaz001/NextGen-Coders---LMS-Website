import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaStar, FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReviewCard from "../components/ReviewCard";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const { reviewData } = useSelector((state) => state.review);

  const [course, setCourse] = useState(null);
  const [educator, setEducator] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingReview, setLoadingReview] = useState(false);
  const [openLectureId, setOpenLectureId] = useState("");
  const [isEnroll, setIsEnroll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const isFree = course?.price === 0;
  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/course/getcourse/${courseId}`, { withCredentials: true }
      );
      setCourse(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch course");
    } finally {
      setLoadingCourse(false);
    }
  };

  // Check enrollment
  const checkEnrollment = () => {
    const enrolled = userData?.enrolledCourses || [];
    const verify = enrolled.some((c) => (typeof c === "string" ? c : c._id).toString() === courseId?.toString());
    if (verify) setIsEnroll(true);
  };

  // Fetch educator info
  const fetchEducator = async () => {
    if (course?.creator) {
      try {
        const result = await axios.post(
          `${serverUrl}/api/course/creator`,
          { userId: course.creator },
          { withCredentials: true }
        );
        setEducator(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Get other courses by creator
  const fetchCreatorCourses = () => {
    if (educator?._id && courseData.length > 0) {
      const otherCourses = courseData.filter((c) => c.creator === educator._id && c._id !== courseId);
      setCreatorCourses(otherCourses);
    }
  };

  // Average rating
  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(courseReviews);

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(serverUrl + `/api/order/razorpay-order`, { userId, courseId }, { withCredentials: true })
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "Mehnaz Codes",
        description: "Course Enroll Payment",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            const verifyPayment = await axios.post(serverUrl + '/api/order/verifypayment', { ...response, courseId, userId }, { withCredentials: true })
            setIsEnroll(true)
            toast.success(verifyPayment.data.message)
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
    }
  }
  const handleFreeEnroll = async (courseId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/course/free-enroll`,
        { courseId },
        { withCredentials: true }
      );

      setIsEnroll(true);
      toast.success(res.data.message || "Enrolled successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error enrolling");
    }
  };
  const handleReview = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please add rating and comment");
      return;
    }
    setLoadingReview(true);
    try {
      await axios.post(`${serverUrl}/api/review/createreview`, { rating, comment, courseId }, { withCredentials: true });
      toast.success("Review Added");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setLoadingReview(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId, courseData]);

  useEffect(() => {
    checkEnrollment();
  }, [userData, courseId]);

  useEffect(() => {
    fetchEducator();
  }, [course]);

  useEffect(() => {
    fetchCreatorCourses();
  }, [educator, courseData]);

  if (loadingCourse)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <ClipLoader color="#f97316" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 md:px-20 py-10">
      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-10"
      >
        <FaArrowLeft /> Back
      </div>

      {/* Top Section */}
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <img src={course.thumbnail} alt="" className="w-full h-[320px] object-cover rounded-xl" />
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white">{course.title}</h1>
          <p className="text-gray-400">{course.subTitle}</p>

          <div className="flex items-center gap-4">
            <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm">{course.category}</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar /> <span>{avgRating}</span>
            </div>

            <span>
              {course.price === 0 ? "Free" : `₹${course.price}`}
            </span>

          </div>

          {educator && (
            <div className="flex items-center gap-3 pt-2">
              <img src={educator.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
              <span className="text-sm text-gray-300">{educator.name}</span>
            </div>
          )}

          {isEnroll ? (
            <button onClick={() => navigate(`/viewlecture/${courseId}`)} className="mt-4 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:shadow-[0_0_25px_rgba(249,115,22,0.9)] hover:scale-105 transition-all duration-300">
              Watch Now
            </button>
          ) : (
            <button
              className="mt-4 px-8 py-3 bg-orange-500 rounded-full text-black font-semibold hover:bg-orange-400 transition"
              onClick={() => {
                if (!userData) {
                  navigate("/signup");
                } else {
                  if (isFree) {
                    handleFreeEnroll(courseId);
                  } else {
                    handleEnroll(userData._id, courseId);
                  }
                }
              }}
            >
              {isFree ? "Enroll Free" : "Enroll Now"}
            </button>
          )}
        </div>
      </div>

      {/* About */}
      <div className="mt-14 bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">About this course</h2>
        <p className="text-gray-400 leading-relaxed">{course.description}</p>
      </div>

      {/* Curriculum */}
      <div className="mt-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Course Curriculum</h2>
          <div className="space-y-3">
            {course.lectures?.map((lec, index) => (
              <div key={lec._id} className="bg-[#141414] border border-[#1f1f1f] rounded-lg">
                <div
                  onClick={() => (lec.isPreviewFree ? setOpenLectureId(openLectureId === lec._id ? "" : lec._id) : null)}
                  className="p-4 flex justify-between items-center cursor-pointer"
                >
                  <span className="text-sm">
                    Lecture {index + 1}: {lec.lectureTitle}
                  </span>
                  {lec.isPreviewFree ? <span className="text-orange-400 text-xs">Preview</span> : <FaLock className="text-gray-500 text-sm" />}
                </div>
                {openLectureId === lec._id && (
                  <div className="p-4">
                    <video src={lec.videoUrl} controls className="rounded-lg w-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Free Preview */}
        {course.lectures?.some((lec) => lec.isPreviewFree) && (
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Free Preview</h2>
            <video src={course.lectures.find((lec) => lec.isPreviewFree)?.videoUrl} controls className="rounded-lg w-full" />
          </div>
        )}
      </div>

      {/* Other Courses */}
      {creatorCourses.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-white mb-6">More courses by {educator?.name}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {creatorCourses.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/course/${item._id}`)}
                className="bg-[#141414] border border-[#1f1f1f] rounded-xl overflow-hidden cursor-pointer hover:border-orange-500"
              >
                <img src={item.thumbnail} alt="" className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">

                    <span>
                      {item.price === 0 ? "Free" : `₹${item.price}`}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar size={10} /> <span>{item.rating || "4.5"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Form */}
      <div className="mt-16 bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Give your feedback</h2>
        <div className="flex gap-3 text-xl text-gray-500 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar key={num} onClick={() => setRating(num)} className={`cursor-pointer ${num <= rating ? "text-yellow-400" : ""}`} />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-4 rounded-lg bg-[#0f0f0f] border border-[#1f1f1f] outline-none focus:border-orange-500"
        />
        <button
          className="mt-4 px-8 py-3 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-400"
          onClick={handleReview}
          disabled={loadingReview}
        >
          {loadingReview ? <ClipLoader color="#000" size={20} /> : "Submit Review"}
        </button>
      </div>

      {/* Reviews */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold text-white mb-6">Student Reviews</h2>
        {courseReviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {courseReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
