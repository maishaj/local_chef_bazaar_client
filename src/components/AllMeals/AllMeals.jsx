import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllMealsCard from "./AllMealsCard";
import { useSearchParams } from "react-router";
import {
  FaMapMarkerAlt,
  FaStar,
  FaSortAmountDown,
  FaRedo,
} from "react-icons/fa";
import Loading from "../../shared/Loading/Loading";

const AllMeals = () => {
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const itemsPerPage = 12;

  const axiosSecure = useAxiosSecure();

  const { data: result, isLoading } = useQuery({
    queryKey: [
      "allmeals",
      order,
      currentPage,
      searchTerm,
      selectedArea,
      selectedRating,
    ],
    queryFn: async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const res = await axiosSecure.get(
        `all-meals?limit=${itemsPerPage}&skip=${skip}&order=${order}&search=${searchTerm}&area=${selectedArea}&rating=${selectedRating}`,
      );
      return res.data;
    },
  });

  const meals = result?.meals || [];
  const totalCount = result?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const areas = ["Uttara", "Dhanmondi", "Banani", "Mirpur"];
  const ratings = [
    { label: "4.5+ ⭐", value: "4.5" },
    { label: "4.0+ ⭐", value: "4.0" },
    { label: "3.5+ ⭐", value: "3.5" },
  ];

  if(isLoading){
     return <Loading></Loading>
  }

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen pb-20 font-sans">
      {/* Minimal Header */}
      <div className="max-w-[1440px] mx-auto px-6 pt-12 pb-6 border-b border-gray-100 dark:border-white/5">
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          {searchTerm ? `Search: ${searchTerm}` : "Explore All Meals"}
        </h2>
        <p className="text-sm text-gray-400 mt-1 font-medium">
          {totalCount} available in your region
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 mt-10 flex flex-col lg:flex-row gap-10">
        {/* SIDEBAR */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-10">
            {/* Area Filter */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-gray-400 mb-5 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#059669]" /> Location
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedArea("")}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedArea === "" ? "bg-[#059669] text-white shadow-lg shadow-orange-500/20" : "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 text-neutral-600"}`}
                >
                  Everywhere
                </button>
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedArea === area ? "bg-[#059669] text-white shadow-lg shadow-orange-500/20" : "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 text-neutral-600"}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-gray-400 mb-5 flex items-center gap-2">
                <FaStar className="text-yellow-500" /> Ratings
              </h3>
              <div className="space-y-3">
                {ratings.map((r) => (
                  <label
                    key={r.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="rating"
                      className="radio radio-sm radio-primary"
                      checked={selectedRating === r.value}
                      onChange={() => setSelectedRating(r.value)}
                    />
                    <span
                      className={`text-sm font-bold ${selectedRating === r.value ? "text-neutral-900" : "text-gray-500 group-hover:text-neutral-700"}`}
                    >
                      {r.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedArea("");
                setSelectedRating("");
                setOrder("desc");
              }}
              className="flex items-center gap-2 text-xs font-bold text-red-500 hover:underline uppercase"
            >
              <FaRedo /> Reset filters
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-end items-center mb-8">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-900 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
              <FaSortAmountDown className="text-gray-400 text-xs" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
                Sort:
              </span>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="bg-transparent text-xs font-bold text-neutral-900 dark:text-white focus:outline-none cursor-pointer pr-2"
              >
                <option value="desc" className="font-bold">
                  Price: High to Low
                </option>
                <option value="asc" className="font-bold">
                  Price: Low to High
                </option>
              </select>
            </div>
          </div>

          {/* Grid - 4 Columns */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 w-full bg-gray-100 dark:bg-neutral-800 animate-pulse rounded-2xl"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {meals.length > 0 ? (
                meals.map((meal) => <AllMealsCard meal={meal} key={meal._id} />)
              ) : (
                <div className="col-span-full py-32 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <h3 className="text-xl font-bold text-gray-400 italic">
                    No matches found. Try resetting filters.
                  </h3>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-circle btn-ghost btn-sm border border-gray-200"
              >
                ❮
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${currentPage === i + 1 ? "bg-neutral-900 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-circle btn-ghost btn-sm border border-gray-200"
              >
                ❯
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllMeals;
