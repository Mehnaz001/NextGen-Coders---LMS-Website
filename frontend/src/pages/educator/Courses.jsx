import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../../App.jsx";
import axios from "axios";
import { setCreatorCourseData } from "../../redux/courseSlice.js";

const StatusBadge = ({ status }) => {
  const isPublished = status === true;

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-semibold border
      ${
        isPublished
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreator",
          { withCredentials: true }
        );

        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    creatorCourses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 lg:px-16 py-8">

      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <button
          onClick={() => navigate("/createcourse")}
          className="flex items-center justify-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2 bg-orange-500 text-black rounded-full text-sm sm:text-base font-semibold hover:bg-orange-400 transition w-fit"
        >
          <FaPlus />
          Create Course
        </button>

      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Your Courses
      </h1>

      {/* COURSE LIST */}
      <div className="space-y-4">

        {creatorCourseData?.map((course) => (
          <div
            key={course._id}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-orange-500/40 transition"
          >

            {/* MOBILE STACK / DESKTOP ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* COURSE INFO */}
              <div className="flex items-start sm:items-center gap-4">

                <img
                  src={
                    course.thumbnail ||
                    "https://www.shutterstock.com/image-vector/add-picture-icon-vector-symbol-600nw-2529626937.jpg"
                  }
                  alt="thumbnail"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/20 flex-shrink-0"
                />

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-base sm:text-lg truncate max-w-[200px] sm:max-w-none">
                      {course.title}
                    </h3>

                    <StatusBadge status={course.isPublished} />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-1">
                    <p>{course.students?.length || 0} Students</p>
                    <p>₹{course.price || 0}</p>
                  </div>

                </div>
              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() => navigate(`/editcourse/${course._id}`)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20 rounded-full text-sm sm:text-base hover:bg-orange-500 hover:text-black transition w-fit"
              >
                <FaEdit />
                Edit
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Courses;
