import React from "react";
import star from "../../assets/stars.png";
import halfStar from "../../assets/halfstar.png";
import { Link } from "react-router";

const AllMealsCard = ({ meal }) => {
  const {
    _id,
    chefId,
    chefName,
    foodImage,
    foodPrice,
    foodRating,
    deliveryArea,
    foodName,
    estimatedDeliveryTime,
    chefsExperience,
    foodDetails,
  } = meal;

  const shortDetails =
    foodDetails?.length > 70
      ? foodDetails.substring(0, 70) + "..."
      : foodDetails;

  return (
    <div className="card bg-base-100 dark:bg-neutral-900 border border-base-300 dark:border-white/10 w-full mx-auto shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <figure className="relative">
        <img
          className="h-[220px] w-full object-cover"
          src={foodImage}
          alt={foodName}
        />

        <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-lg backdrop-blur-md">
          ⏱️ {estimatedDeliveryTime} mins
        </div>
      </figure>

      <div className="card-body p-4 flex flex-col grow">
        <div className="grow space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="card-title font-bold text-neutral-900 dark:text-white leading-tight">
              {foodName}
            </h2>
            <span className="text-[#059669] font-bold">৳{foodPrice}</span>
          </div>

          <div className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-gray-400 font-sans">
            <p className="font-medium">
              By {chefName}{" "}
              <span className="text-[10px] opacity-60">
                (Exp: {chefsExperience}y)
              </span>
            </p>
            <p className="text-xs opacity-70">Chef ID: {chefId}</p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-sans line-height-relaxed italic">
            {shortDetails}
          </p>

          <div className="pt-2">
            <span className="badge badge-outline border-[#059669] text-[#059669] text-xs font-bold uppercase tracking-wider">
              {deliveryArea}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-4 h-4" src={star} alt="star" />
            ))}
            <img className="w-4 h-4" src={halfStar} alt="half star" />
          </div>

          <div className="card-actions">
            <Link
              to={`/meals/meal-details/${_id}`}
              className="btn btn-sm my-btn my-btn:hover text-white border-none rounded-md px-4"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMealsCard;
