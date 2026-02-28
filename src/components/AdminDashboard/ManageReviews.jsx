import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { 
    FaTrashAlt, 
    FaStar, 
    FaUtensils, 
    FaSearch, 
    FaChevronLeft, 
    FaChevronRight,
    FaRegCommentDots
} from 'react-icons/fa';

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['admin-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reviews'); 
            return res.data;
        }
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredReviews = useMemo(() => {
        if (!Array.isArray(reviews)) return []; 
        return reviews.filter(item => {
            const name = item?.reviewerName?.toLowerCase() || "";
            const dish = item?.foodName?.toLowerCase() || "";
            const search = searchTerm.toLowerCase();
            return name.includes(search) || dish.includes(search);
        });
    }, [reviews, searchTerm]);

    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Remove Review?",
            text: "This feedback will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete",
            background: 'var(--fallback-b1, #fff)', // Sync with theme
            color: 'var(--fallback-bc, #000)'
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

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-base-200/50 min-h-screen transition-colors duration-300">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-base-content tracking-tight">
                        User <span className="text-primary">Reviews</span>
                    </h2>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                    <input 
                        type="text" 
                        placeholder="Search reviewer or dish..."
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 border-none shadow-sm focus:outline-none focus:ring-2 ring-primary text-base-content"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/50 text-[10px] uppercase tracking-[2px] border-b border-base-300">
                                <th className="py-6 px-8 font-bold">Reviewer</th>
                                <th className="font-bold">Dish & Comment</th>
                                <th className="font-bold text-center">Rating</th>
                                <th className="text-right px-8 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedReviews.map((item) => (
                                <tr key={item._id} className="border-b border-base-200 last:border-none hover:bg-base-200/30 transition-colors">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full ring ring-primary/10 ring-offset-base-100 ring-offset-2">
                                                    <img src={item.reviewerImage || 'https://via.placeholder.com/40'} alt="avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-base-content">{item.reviewerName}</div>
                                                <div className="text-[11px] text-base-content/50">{item.reviewerEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1 max-w-md">
                                            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider">
                                                <FaUtensils className="text-[9px]" /> {item.foodName}
                                            </div>
                                            <div className="flex gap-2">
                                                <FaRegCommentDots className="text-base-content/20 mt-1 shrink-0" />
                                                <p className="text-base-content/70 italic leading-relaxed">"{item.comment}"</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="inline-flex items-center gap-1 bg-warning/10 text-warning px-3 py-1 rounded-full font-black text-xs">
                                            <FaStar /> {item.rating}.0
                                        </div>
                                    </td>
                                    <td className="text-right px-8">
                                        <button 
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/10"
                                            title="Delete Review"
                                        >
                                            <FaTrashAlt size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {paginatedReviews.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-base-content/30 gap-3">
                        <FaRegCommentDots size={40} className="opacity-10" />
                        <p className="font-medium italic">No reviews match your search.</p>
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {filteredReviews.length > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
                        Showing {paginatedReviews.length} of {filteredReviews.length} records
                    </span>
                    
                    <div className="join bg-base-100 shadow-sm border border-base-300">
                        <button 
                            className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary/10 text-base-content"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            <FaChevronLeft size={10} />
                        </button>
                        <button className="join-item btn btn-sm bg-base-100 border-none font-black text-xs px-6 pointer-events-none text-base-content">
                            {currentPage} / {totalPages}
                        </button>
                        <button 
                            className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary/10 text-base-content"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <FaChevronRight size={10} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageReviews;