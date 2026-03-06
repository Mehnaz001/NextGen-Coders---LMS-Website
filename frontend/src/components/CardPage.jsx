import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import getPublishedCourse from "../customHooks/getPublishedCourse";

const CardPage = () => {
  getPublishedCourse();

  const { courseData } = useSelector((state) => state.course);

  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-wide mb-4 text-orange-500 bg-clip-text">
            Courses That Shape Your Future
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore industry-ready courses crafted to boost your skills, confidence,
            and career growth. Learn what truly matters, from experts you can trust.
          </p>
        </div>


        {courseData && courseData.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courseData.map((course) => (
            <CourseCard key={course._id} course={course} reviews={course.reviews}/>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Loading courses...</p>
      )}
      </div>
    </section>
  );
};

export default CardPage;
