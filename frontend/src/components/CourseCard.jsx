import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 transition">
      <img
        src={course.thumbnail}
        alt="thumb"
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{course.subtitle}</p>

        <div className="flex justify-between text-sm text-gray-400">
          <span>₹{course.price}</span>
          <span>{course.students?.length || 0} Students</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
