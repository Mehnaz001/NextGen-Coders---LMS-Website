import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-orange-500 transition">

      {/* User */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={review?.user?.photoUrl}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-white">
            {review?.user?.name}
          </h3>
          <p className="text-gray-400 text-sm">
            {review?.user?.role}
          </p>
        </div>
      </div>

      {/* Course */}
      <p className="text-orange-500 text-sm mb-3">
        {review?.course?.title}
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < review?.rating
                ? "text-orange-500"
                : "text-gray-600"
            }
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-400 text-sm">
        {review?.comment}
      </p>

      {/* Date */}
      <p className="text-gray-500 text-xs mt-4">
        {new Date(review?.reviewedAt).toLocaleDateString()}
      </p>

    </div>
  );
};

export default ReviewCard;