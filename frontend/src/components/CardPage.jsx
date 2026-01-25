import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import getPublishedCourse from "../customHooks/getPublishedCourse";

const CardPage = () => {
  getPublishedCourse();

  const { courseData } = useSelector((state) => state.course);

  return (
    <div className="px-6 md:px-16 py-12 text-white">
      <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>

      {courseData?.length === 0 ? (
        <p className="text-gray-400">No courses available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
  {courseData?.length > 0 &&
    courseData.map((course) => (
      <CourseCard key={course._id} course={course} />
    ))}
</div>

      )}
    </div>
  );
};

export default CardPage;
