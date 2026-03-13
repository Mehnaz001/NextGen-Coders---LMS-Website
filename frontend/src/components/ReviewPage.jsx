import React from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

const ReviewPage = () => {
  const { reviewData } = useSelector((state) => state.review);

  const reviewList = reviewData || [];

  return (
    <div className="px-6 md:px-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Loved by <span className="text-orange-500">Learners</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Thousands of students are improving their skills and building
          real-world projects with our courses.
        </p>
      </div>

      {/* Reviews */}
      {reviewList.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewList.slice(0, 6).map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewPage;