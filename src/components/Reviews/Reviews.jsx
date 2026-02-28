import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewsCard from "./ReviewsCard";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-7xl mx-auto pb-24">
      <h2 className="text-3xl font-bold text-center mb-16 underline decoration-[#059669] underline-offset-8 mt-16">
        What Our Diners Say
      </h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <ReviewsCard review={review} key={review._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
          <p className="text-base-content/50 italic font-medium text-lg">
            No reviews yet. Be the first to share your experience!
          </p>
        </div>
      )}
    </div>
  );
};

export default Reviews;