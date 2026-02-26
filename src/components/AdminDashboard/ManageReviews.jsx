import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaStar, FaUtensils, FaQuoteLeft, FaSearch } from 'react-icons/fa';

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['admin-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reviews'); 
            return res.data;
        }
    });

   
    const filteredReviews = useMemo(() => {
        if (!Array.isArray(reviews)) return []; 

        return reviews.filter(item => {
            const name = item?.reviewerName?.toLowerCase() || "";
            const dish = item?.foodName?.toLowerCase() || "";
            const search = searchTerm.toLowerCase();

            return name.includes(search) || dish.includes(search);
        });
    }, [reviews, searchTerm]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Remove Review?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/admin/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Deleted!", "The review has been removed.", "success");
                }
            }
        });
    };

    return (
        <div className="p-8 bg-gray-50/30 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Manage Reviews</h2>
                    <p className="text-sm text-gray-500">
                        Moderating <span className="text-emerald-600 font-bold">{filteredReviews.length}</span> entries.
                    </p>
                </div>

                {/* SEARCH INPUT */}
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                    <input 
                        type="text" 
                        placeholder="Search reviewer or dish..."
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none focus:ring-2 ring-emerald-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
                <table className="table w-full border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[2px] border-b border-gray-100">
                            <th className="py-6 px-8">Reviewer</th>
                            <th>Dish & Comment</th>
                            <th>Rating</th>
                            <th className="text-right px-8">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredReviews.map((item) => (
                            <tr key={item._id} className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                                <td className="py-5 px-8">
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full ring ring-emerald-50 ring-offset-2">
                                                <img src={item.reviewerImage || 'https://via.placeholder.com/40'} alt={item.reviewerName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-black text-neutral-800">{item.reviewerName || "Anonymous"}</div>
                                            <div className="text-[11px] text-gray-400">{item.reviewerEmail || "No Email"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-tighter">
                                            <FaUtensils className="text-[10px]" /> {item.foodName || "Unknown Dish"}
                                        </div>
                                        <p className="text-gray-600 italic leading-relaxed">"{item.comment || "No comment provided."}"</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Post Date: {item.date}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black text-xs">
                                        <FaStar className="mb-0.5" /> {item.rating || 0}.0
                                    </div>
                                </td>
                                <td className="text-right px-8">
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-circle btn-ghost btn-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {filteredReviews.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="bg-gray-100 p-6 rounded-full text-gray-300 text-4xl">
                            <FaQuoteLeft />
                        </div>
                        <p className="text-gray-400 font-medium">
                            {searchTerm ? `No results found for "${searchTerm}"` : "No reviews found in database."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageReviews;