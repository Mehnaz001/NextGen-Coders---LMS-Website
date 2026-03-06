import React from "react";
import ReviewCard from "./ReviewCard";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const ReviewPage = () => {

  const { reviewData } = useSelector((state) => state.review);
  console.log(reviewData)
  // safe default
  const reviewList = reviewData || [];

  const totalReviews = reviewList.length;

  const averageRating =
    totalReviews > 0
      ? reviewList.reduce((acc, r) => acc + r.rating, 0) / totalReviews
      : 0;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Student Reviews</h1>
        <p className="text-gray-400">
          See what learners are saying about your courses.
        </p>
      </div>

      {/* Rating Summary */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <h2 className="text-4xl font-bold text-orange-500">
            {averageRating.toFixed(1)}
          </h2>

          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(averageRating)
                    ? "text-orange-500"
                    : "text-gray-600"
                }
              />
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-2">
            Based on {totalReviews} reviews
          </p>
        </div>

        <div className="text-gray-400 text-sm max-w-md text-center md:text-left">
          High-quality structured courses with real-world examples.
          Keep improving your content to maintain top ratings.
        </div>

      </div>

      {totalReviews > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewList.slice(0, 6).map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No reviews yet.
        </div>
      )}

    </div>
  );
};

export default ReviewPage;