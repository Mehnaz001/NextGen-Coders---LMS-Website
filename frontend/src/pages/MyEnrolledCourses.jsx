import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const MyEnrolledCourses = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const enrolledCourses = userData?.enrolledCourses || [];
  console.log(enrolledCourses)
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-10">

      {/* Back Arrow */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-8 w-fit"
      >
        <FaArrowLeft /> Back
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-10">
        My Enrolled Courses
      </h1>

      {/* Empty State */}
      {enrolledCourses.length === 0 ? (
        <p className="text-gray-400">
          You haven't enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500 transition"
            >

              {/* Thumbnail */}
              <img
                src={course.thumbnail}
                alt=""
                className="w-full h-48 object-cover"
              />

              <div className="p-5 space-y-3">

                <h2 className="text-lg font-semibold line-clamp-2">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-400">
                  Category : {course.category || "N/A"}
                </p>

                <p className="text-sm text-orange-400">
                  Level : {course.level || "N/A"}
                </p>

                {/* Watch Now Button */}
                <button
                  onClick={() =>
                    navigate(`/viewlecture/${course._id}`)
                  }
                  className="w-full mt-3 py-2 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-400 transition cursor-pointer"
                >
                  Watch Now
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;