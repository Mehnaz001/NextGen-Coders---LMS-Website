import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";   // ✅ import

const CourseCard = ({ course }) => {
  const navigate = useNavigate();                 // ✅ create

  const DEFAULT_THUMBNAIL =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";

  const priceLabel =
    !course.price || Number(course.price) === 0 ? "Free" : `₹${course.price}`;

    const calculateAvgReview = (reviews) => {
    if(!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((sum, review)=> sum + review.rating,0)
    return (total/reviews.length).toFixed(1)
  }

  const avgRating = calculateAvgReview(course?.reviews)

  return (
    <div
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500 hover:border-2 transition cursor-pointer"
      onClick={() => navigate(`/viewcourse/${course._id}`)}  // ✅ match route
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail || DEFAULT_THUMBNAIL}
          alt="thumbnail"
          className="w-full h-44 object-cover"
        />

        {/* Category */}
        {course.category && (
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-white/20 backdrop-blur">
            {course.category}
          </span>
        )}

        {/* Price */}
        <span className="absolute top-3 right-3 bg-orange-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
          {priceLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-white">
          {course.title}
        </h3>

        {course.subTitle && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {course.subTitle}
          </p>
        )}

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-3 text-sm text-gray-400">
          <span>{course.students?.length || 0} Students</span>

          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span>{avgRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
