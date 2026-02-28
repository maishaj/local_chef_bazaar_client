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

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-100 min-h-screen pb-20 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-[1440px] mx-auto px-6 pt-12 pb-6 border-b border-base-200">
        <h2 className="text-3xl font-black text-base-content">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Explore Our Menu"}
        </h2>
        <p className="text-sm text-base-content/50 mt-1 font-bold italic">
          {totalCount} delicious meals found
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 mt-10 flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR FILTERS */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-12">
            {/* Area Filter */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-5 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> Delivery Area
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedArea("")}
                  className={`text-left px-5 py-3 rounded-2xl text-xs font-black transition-all ${selectedArea === "" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-base-200 hover:bg-base-300 text-base-content/70"}`}
                >
                  All Areas
                </button>
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`text-left px-5 py-3 rounded-2xl text-xs font-black transition-all ${selectedArea === area ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-base-200 hover:bg-base-300 text-base-content/70"}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-5 flex items-center gap-2">
                <FaStar className="text-yellow-500" /> Minimum Rating
              </h3>
              <div className="space-y-4 px-2">
                {ratings.map((r) => (
                  <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      className="radio radio-sm radio-primary border-base-content/20"
                      checked={selectedRating === r.value}
                      onChange={() => setSelectedRating(r.value)}
                    />
                    <span className={`text-sm font-bold ${selectedRating === r.value ? "text-primary" : "text-base-content/60 group-hover:text-base-content"}`}>
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
              className="flex items-center gap-2 text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest pl-2"
            >
              <FaRedo /> Clear Filters
            </button>
          </div>
        </aside>

        {/* MAIN MEALS GRID */}
        <main className="flex-1">
          <div className="flex justify-end items-center mb-8">
            <div className="flex items-center gap-3 bg-base-200 px-5 py-2.5 rounded-full border border-base-300 shadow-sm">
              <FaSortAmountDown className="text-primary text-xs" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-base-content/40">
                Sort By:
              </span>
              <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-transparent text-xs font-black text-base-content focus:outline-none cursor-pointer"
            >
              <option value="desc" className="bg-base-100 text-base-content">
                Price: High to Low
              </option>
              <option value="asc" className="bg-base-100 text-base-content">
                Price: Low to High
              </option>
            </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {meals.length > 0 ? (
              meals.map((meal) => <AllMealsCard meal={meal} key={meal._id} />)
            ) : (
              <div className="col-span-full py-32 text-center bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
                <h3 className="text-xl font-bold text-base-content/30 italic">
                  No meals found matching your criteria.
                </h3>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-6">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-circle btn-ghost border-base-300 text-base-content disabled:opacity-30"
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
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? "bg-primary text-white shadow-xl shadow-primary/30" : "bg-base-200 hover:bg-base-300 text-base-content/60"}`}
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
                className="btn btn-circle btn-ghost border-base-300 text-base-content disabled:opacity-30"
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