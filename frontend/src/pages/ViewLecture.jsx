import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";

const ViewLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const [educator, setEducator] = useState(null);
  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get course from Redux
  useEffect(() => {
    if (courseData.length > 0) {
      const selectedCourse = courseData.find(
        (c) => c._id.toString() === courseId.toString()
      );

      if (selectedCourse) {
        setCourse(selectedCourse);
        setCurrentLecture(selectedCourse.lectures[0]);
      }

      setLoading(false);
    }
  }, [courseData, courseId]);

  // 🔐 Enrollment Check
  useEffect(() => {
    const isEnrolled = userData?.enrolledCourses?.some((c) =>
      (typeof c === "string" ? c : c._id).toString() ===
      courseId.toString()
    );

    if (!isEnrolled) {
      navigate(`/course/${courseId}`);
    }
  }, [userData, courseId, navigate]);

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

  if (loading)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <ClipLoader color="orange" />
      </div>
    );

  if (!course) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-10">

      {/* 🔙 Back */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-8"
      >
        <FaArrowLeft /> Back
      </div>

      

      <div className="grid md:grid-cols-3 gap-10">

        {/* 🎥 Video Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">
            {currentLecture?.lectureTitle}
          </h2>

          <video
            src={currentLecture?.videoUrl}
            controls
            className="w-full rounded-xl border border-white/10"
          />
        </div>

        {/* 📚 Lecture List */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 max-h-[500px] overflow-y-auto">

          <h3 className="text-lg font-semibold mb-4">
            Course Content
          </h3>

          {course.lectures.map((lec, index) => (
            <div
              key={lec._id}
              onClick={() => setCurrentLecture(lec)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                currentLecture?._id === lec._id
                  ? "bg-orange-500 text-black"
                  : "hover:bg-white/10"
              }`}
            >
              Lecture {index + 1}: {lec.lectureTitle}
            </div>
          ))}

          {/* 👨‍🏫 Educator Details Section */}
{educator && (
  <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6">
    
    <h2 className="text-2xl font-semibold mb-6">
      About the Instructor
    </h2>

    <div className="flex items-start gap-6">
      
      <img
        src={educator.photoUrl}
        alt="educator"
        className="w-24 h-24 rounded-full object-cover border border-white/20"
      />

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">
          {educator.name}
        </h3>

        {educator.bio && (
          <p className="text-gray-300 leading-relaxed">
            {educator.description}
          </p>
        )}

        {educator.email && (
          <p className="text-gray-400">
            {educator.email}
          </p>
        )}
      </div>

    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default ViewLecture;