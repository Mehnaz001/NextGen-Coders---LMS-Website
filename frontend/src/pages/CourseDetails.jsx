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
  const [loading, setLoading] = useState(true);
  const [openLectureId, setOpenLectureId] = useState("");
  const [isEnroll, setIsEnroll] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
    const verify = userData?.enrolledCourses?.some((c) =>
      (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );

    if (verify) setIsEnroll(true);
  };

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

    handleCreator();

  }, [course]);

  useEffect(() => {

    if (educator?._id && courseData.length > 0) {

      const otherCourses = courseData.filter(
        (c) => c.creator === educator._id && c._id !== courseId
      );

      setCreatorCourses(otherCourses);
    }

  }, [educator, courseData]);

  const courseReviews = reviewData?.filter(
    (review) => review.course?._id?.toString() === courseId?.toString()
  );

  const calculateAvgReview = (reviews) => {

    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);

    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(course?.reviews);

  const handleReview = async () => {

    try {

      await axios.post(
        serverUrl + `/api/review/createreview`,
        { rating, comment, courseId },
        { withCredentials: true }
      );

      toast.success("Review Added");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex justify-center items-center">
        <ClipLoader color="#f97316" />
      </div>
    );

  return (

    <div className="min-h-screen bg-[#0b0b0b] text-gray-200 px-6 md:px-20 py-10">

      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-10"
      >
        <FaArrowLeft /> Back
      </div>

      {/* Top Section */}

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        <img
          src={course.thumbnail}
          alt=""
          className="w-full h-[320px] object-cover rounded-xl"
        />

        <div className="p-6 space-y-4">

          <h1 className="text-3xl font-semibold text-white">
            {course.title}
          </h1>

          <p className="text-gray-400">
            {course.subTitle}
          </p>

          <div className="flex items-center gap-4">

            <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>

            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span>{avgRating}</span>
            </div>

          </div>

          {educator && (
            <div className="flex items-center gap-3 pt-2">

              <img
                src={educator.photoUrl}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />

              <span className="text-sm text-gray-300">
                {educator.name}
              </span>

            </div>
          )}

          {isEnroll ? (
            <button
              onClick={() => navigate(`/viewlecture/${courseId}`)}
              className="mt-4 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:shadow-[0_0_25px_rgba(249,115,22,0.9)] hover:scale-105 transition-all duration-300"
            >
              Watch Now
            </button>
          ) : (
            <button
              onClick={() => {
                if (!userData) {
                  navigate("/signup");
                } else {
                  handleEnroll(); // your enroll function
                }
              }}
              className="mt-4 px-8 py-3 bg-orange-500 rounded-full text-black font-semibold hover:bg-orange-400 transition"
            >
              Enroll Now
            </button>
          )}

        </div>

      </div>

      {/* Description */}

      <div className="mt-14 bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          About this course
        </h2>

        <p className="text-gray-400 leading-relaxed">
          {course.description}
        </p>

      </div>

      {/* Lectures */}

      <div className="mt-16 grid lg:grid-cols-2 gap-10">

        <div>

          <h2 className="text-xl font-semibold text-white mb-6">
            Course Curriculum
          </h2>

          <div className="space-y-3">

            {course.lectures?.map((lec, index) => (

              <div
                key={lec._id}
                className="bg-[#141414] border border-[#1f1f1f] rounded-lg"
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

                  <span className="text-sm">
                    Lecture {index + 1}: {lec.lectureTitle}
                  </span>

                  {lec.isPreviewFree ? (
                    <span className="text-orange-400 text-xs">
                      Preview
                    </span>
                  ) : (
                    <FaLock className="text-gray-500 text-sm" />
                  )}

                </div>

                {openLectureId === lec._id && (
                  <div className="p-4">
                    <video
                      src={lec.videoUrl}
                      controls
                      className="rounded-lg w-full"
                    />
                  </div>
                )}

              </div>

            ))}

          </div>

        </div>

        {/* Preview */}

        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-4">
            Free Preview
          </h2>

          <video
            src={course.lectures?.find((lec) => lec.isPreviewFree)?.videoUrl}
            controls
            className="rounded-lg w-full"
          />

        </div>

      </div>

      {/* Creator Courses */}

      {creatorCourses.length > 0 && (

        <div className="mt-16">

          <h2 className="text-xl font-semibold text-white mb-6">
            More courses by {educator?.name}
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {creatorCourses.map((item) => (

              <div
                key={item._id}
                onClick={() => navigate(`/course/${item._id}`)}
                className="bg-[#141414] border border-[#1f1f1f] rounded-xl overflow-hidden cursor-pointer hover:border-orange-500"
              >

                <img
                  src={item.thumbnail}
                  className="w-full h-36 object-cover"
                  alt=""
                />

                <div className="p-4">

                  <h3 className="font-medium text-sm line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-400">

                    <span>₹{item.price}</span>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar size={10} />
                      <span>{item.rating || "4.5"}</span>
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

        <h2 className="text-xl font-semibold text-white mb-6">
          Give your feedback
        </h2>

        <div className="flex gap-3 text-xl text-gray-500 mb-4">

          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              onClick={() => setRating(num)}
              className={`cursor-pointer ${num <= rating ? "text-yellow-400" : ""}`}
            />
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
        >
          Submit Review
        </button>

      </div>

      {/* Reviews */}

      <div className="mt-14">

        <h2 className="text-xl font-semibold text-white mb-6">
          Student Reviews
        </h2>

        {courseReviews?.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet
          </p>
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