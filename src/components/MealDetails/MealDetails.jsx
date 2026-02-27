import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useParams } from "react-router";
import star from "../../assets/stars.png";
import halfStar from "../../assets/halfstar.png";
import AddReview from "../AddReview/AddReview";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import {
  FaClock,
  FaMapMarkerAlt,
  FaUtensils,
  FaUserGraduate,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import Loading from "../../shared/Loading/Loading";

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal-details/${id}`);
      return res.data;
    },
  });

  const {
    _id,
    chefId,
    chefName,
    foodImage,
    foodPrice,
    deliveryArea,
    foodName,
    ingredients,
    estimatedDeliveryTime,
    chefsExperience,
    foodDetails,
    foodRating,
  } = meal;

  const { data: relatedMeals = [] } = useQuery({
    queryKey: ["related-meals", deliveryArea, id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/related-meals?area=${deliveryArea}&id=${id}`,
      );
      return res.data;
    },
  });

  const { data: dbUser } = useQuery({
    queryKey: ["user-db", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isFraud = dbUser?.status === "fraud";

  const handleFavourites = (id) => {
    if (!user) return toast.error("Please login to add favourites");
    const favInfo = {
      userEmail: user.email,
      mealId: id,
      mealName: foodName,
      chefId,
      chefName,
      price: foodPrice,
      addedTime: new Date(),
    };
    axiosSecure.post("/favourites", favInfo).then((res) => {
      if (res.data.message === "Already exists in your favourites!") {
        toast.error(res.data.message);
      } else {
        toast.success(`${foodName} added to favourites!`);
      }
    });
  };

  if (isLoading){
    return <Loading></Loading>
  }

  return (
    <div
      className="bg-base-100 dark:bg-neutral-950 transition-colors duration-300 min-h-screen pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-base-200 dark:border-white/5">
              <img
                src={foodImage}
                alt={foodName}
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-[#059669] text-white px-6 py-2 rounded-full font-bold shadow-lg text-xl">
                  ৳ {foodPrice}
                </span>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[foodImage, foodImage, foodImage].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-24 h-20 object-cover rounded-xl opacity-70 border-2 border-transparent hover:border-[#059669] transition-all"
                  alt="gallery"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-[#059669] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Chef Special
              </span>
              <span className="flex items-center gap-1 text-sm text-base-content/60 font-sans">
                <FaUserGraduate className="text-[#059669]" /> {chefsExperience}{" "}
                Years Exp.
              </span>
            </div>

            <h1 className="text-3xl lg:text-3xl font-extrabold text-neutral-900 dark:text-white mb-2 leading-tight">
              {foodName}
            </h1>
            <p className="text-lg text-base-content/70 italic mb-6 font-sans">
              By{" "}
              <span className="text-[#059669] font-bold">Chef {chefName}</span>{" "}
              (ID: {chefId})
            </p>

            <div className="flex items-center gap-4 mb-8 bg-base-200 dark:bg-neutral-900 p-3 rounded-2xl w-fit">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <img key={i} className="w-5 h-5" src={star} alt="star" />
                ))}
                <img className="w-5 h-5" src={halfStar} alt="halfstar" />
              </div>
              <span className="text-sm font-bold dark:text-gray-300">
                {foodRating || "4.5"} / 5.0
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-base-200 dark:bg-neutral-900 rounded-2xl border border-base-300 dark:border-white/5">
                <FaClock className="text-2xl text-[#059669]" />
                <div>
                  <p className="text-[10px] uppercase opacity-50 font-bold">
                    Delivery Time
                  </p>
                  <p className="font-bold dark:text-white">
                    {estimatedDeliveryTime} Mins
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-base-200 dark:bg-neutral-900 rounded-2xl border border-base-300 dark:border-white/5">
                <FaMapMarkerAlt className="text-2xl text-[#059669]" />
                <div>
                  <p className="text-[10px] uppercase opacity-50 font-bold">
                    Area
                  </p>
                  <p className="font-bold dark:text-white">{deliveryArea}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold dark:text-white mb-3 flex items-center gap-2">
                <FaUtensils className="text-[#059669]" /> Description
              </h3>
              <p className="text-base-content/80 font-sans leading-relaxed">
                {foodDetails}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest font-bold opacity-50 mb-4">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients?.map((ind, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-base-200 dark:bg-neutral-800 rounded-lg text-sm font-medium border border-base-300 dark:border-white/5"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
              {isFraud ? (
                <button className="btn btn-lg btn-disabled px-4">
                  Account Restricted
                </button>
              ) : (
                <Link
                  to={`/meals/meal-details/${_id}/place-order`}
                  className="btn btn-lg my-btn my-btn:hover text-white border-none shadow-lg px-10 w-fit"
                >
                  Order Now
                </Link>
              )}
              <button
                onClick={() => handleFavourites(_id)}
                className="btn btn-lg btn-outline border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white px-6"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>

        {relatedMeals.length > 0 && (
          <div className="mt-20 py-16 border-t border-base-300 dark:border-white/10">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
                  More in <span className="text-[#059669]">{deliveryArea}</span>
                </h2>
                <p className="text-base-content/60 font-sans">
                  Other fresh meals from local chefs near you.
                </p>
              </div>
              <Link
                to="/meals"
                className="btn btn-ghost text-[#059669] hover:bg-transparent flex items-center gap-2"
              >
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMeals.map((item) => (
                <Link
                  key={item._id}
                  to={`/meals/meal-details/${item._id}`}
                  className="group bg-base-200 dark:bg-neutral-900 rounded-2xl overflow-hidden shadow hover:border-[#059669] transition-all"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={item.foodImage}
                      alt={item.foodName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-neutral-900 dark:text-white truncate">
                      {item.foodName}
                    </h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[#059669] font-bold">
                        ৳{item.foodPrice}
                      </span>
                      <div className="flex items-center gap-1 text-xs opacity-60">
                        <img src={star} className="w-3 h-3" alt="" />
                        <span>{item.foodRating || "4.5"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-base-300 dark:border-white/10 pt-16">
          <AddReview foodName={foodName} />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default MealDetails;
