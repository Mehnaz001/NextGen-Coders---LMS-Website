import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition duration-300">

      {/* User */}
      <div className="flex items-center gap-3 mb-4">

        <img
          src={review?.user?.photoUrl}
          alt=""
          className="w-11 h-11 rounded-full object-cover border border-gray-700"
        />

        <div className="flex flex-col">
          <h3 className="text-white text-sm font-semibold">
            {review?.user?.name}
          </h3>

          <p className="text-gray-500 text-xs">
            {review?.user?.role}
          </p>
        </div>

      </div>


      {/* Course */}
      <p className="text-orange-500 text-xs font-medium mb-2">
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
                : "text-gray-700"
            }
          />
        ))}
      </div>


      {/* Comment */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {review?.comment}
      </p>


      {/* Date */}
      <p className="text-gray-600 text-xs mt-4">
        {new Date(review?.reviewedAt).toLocaleDateString()}
      </p>

    </div>
  );
};

export default ReviewCard;