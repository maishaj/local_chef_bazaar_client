import React from "react";
import star from "../../assets/stars.png";
import halfStar from "../../assets/halfstar.png";
import { Link } from "react-router";

const MealsCard = ({ meal }) => {
  const {
    _id,
    chefName,
    foodImage,
    foodPrice,
    foodRating,
    deliveryArea,
    foodName,
    foodDetails,
  } = meal;

  const descriptionPreview =
    foodDetails?.length > 65 ? foodDetails.slice(0, 65) + "..." : foodDetails;

  return (
   <div className="card bg-base-100 border border-base-300 dark:border-white/10 w-full mx-auto shadow-md hover:shadow-xl transition-all h-[400px] flex flex-col group">
  <figure className="h-48 overflow-hidden">
    <img
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      src={foodImage}
      alt={foodName}
    />
  </figure>

  <div className="card-body p-5 flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start gap-2">
       
        <h2 className="card-title font-bold text-base-content leading-tight">
          {foodName}
        </h2>
        <span className="text-primary font-bold whitespace-nowrap">{foodPrice} TK</span>
      </div>

      
      <p className="text-xs text-base-content/70 mt-1 mb-2">
        📍 {deliveryArea} • By {chefName}
      </p>

      <p className="text-sm text-base-content/80 font-sans italic leading-snug line-clamp-2">
        {descriptionPreview}
      </p>
    </div>

    <div className="mt-auto">
      <div className="flex gap-1 items-center mb-4">
        {[...Array(4)].map((_, i) => (
          <img key={i} className="w-4 h-4" src={star} alt="star" />
        ))}
        <img className="w-4 h-4" src={halfStar} alt="half star" />
        <span className="text-xs text-base-content/50 ml-1">({foodRating})</span>
      </div>

      <div className="card-actions justify-end">
        <Link
          to={`/meals/meal-details/${_id}`}
          className="btn btn-sm btn-primary text-white border-none px-6 rounded-lg"
        >
          Details
        </Link>
      </div>
    </div>
  </div>
</div>
  );
};

export default MealsCard;
