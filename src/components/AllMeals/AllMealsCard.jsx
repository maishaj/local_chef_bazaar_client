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
    <div className="card bg-base-100 border-2 border-base-300 dark:border-slate-800 w-full mx-auto shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col rounded-2xl overflow-hidden group">
      <figure className="relative h-[220px] overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={foodImage}
          alt={foodName}
        />
        <div className="absolute top-3 right-3 bg-base-100/80 dark:bg-slate-900/80 backdrop-blur-md text-base-content text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
          ⏱️ {estimatedDeliveryTime} mins
        </div>
      </figure>

      <div className="card-body p-5 flex flex-col grow">
        <div className="grow space-y-3">
          <div className="flex justify-between items-start gap-2">
            <h2 className="card-title font-black text-base-content leading-tight">
              {foodName}
            </h2>
            <span className="text-primary font-black text-lg whitespace-nowrap">৳{foodPrice}</span>
          </div>

          <div className="flex flex-col gap-0.5 text-sm">
            <p className="font-bold text-base-content/80">
              By {chefName}{" "}
              <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-1">
                {chefsExperience}y Exp
              </span>
            </p>
            <p className="text-[11px] text-base-content/50 font-medium tracking-tight">Chef ID: {chefId}</p>
          </div>

          <p className="text-sm text-base-content/70 italic leading-relaxed line-clamp-2">
            {shortDetails}
          </p>

          <div className="pt-1">
            <span className="badge badge-primary badge-outline text-[10px] font-black uppercase tracking-widest px-3 py-2">
              {deliveryArea}
            </span>
          </div>
        </div>

        {/* Rating & Action */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-base-200 dark:border-slate-800/50">
          <div className="flex flex-col">
            <div className="flex gap-0.5 mb-1">
              {[...Array(4)].map((_, i) => (
                <img key={i} className="w-3.5 h-3.5" src={star} alt="star" />
              ))}
              <img className="w-3.5 h-3.5" src={halfStar} alt="half star" />
            </div>
            <span className="text-[10px] text-base-content/40 font-bold uppercase">Rating: {foodRating}</span>
          </div>

          <div className="card-actions">
            <Link
              to={`/meals/meal-details/${_id}`}
              className="btn btn-sm btn-primary text-white border-none rounded-xl px-6 font-black shadow-lg shadow-primary/20 transition-transform active:scale-95"
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