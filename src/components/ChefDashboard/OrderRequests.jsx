import React, { useState, useMemo, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaSearch, FaChevronLeft, FaChevronRight, FaBoxOpen } from 'react-icons/fa';

const OrderRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['request', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orderRequest/${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/order/status/${id}`, { orderStatus: status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['request', user?.email]);
            toast.success("Order status updated!");
        }
    });

    const filteredRequests = useMemo(() => {
        if (!Array.isArray(requests)) return [];
        return requests.filter(order => {
            const mealName = order?.mealName?.toLowerCase() || "";
            const customer = order?.userEmail?.toLowerCase() || "";
            const search = searchTerm.toLowerCase();
            return mealName.includes(search) || customer.includes(search);
        });
    }, [requests, searchTerm]);

    const totalResults = filteredRequests.length;
    const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);
    const currentViewCount = paginatedRequests.length;

    const handleStatusUpdate = async (id, status) => {
        try {
            await mutateAsync({ id, status });
        } catch (err) {
            toast.error("Update failed");
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-base-200/50 min-h-screen transition-colors duration-300">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-base-content">
                        Order <span className='text-primary'>Requests</span>
                    </h2>
                    <p className="text-sm text-base-content/60">
                        Showing <span className="text-primary font-bold">{currentViewCount}</span> of <span className="font-bold">{totalResults}</span> results
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        type="text" 
                        placeholder="Search meal or customer..."
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 border-none shadow-sm focus:outline-none focus:ring-2 ring-primary text-base-content"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* TABLE CONTAINER */}
            <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/50 text-[10px] uppercase tracking-[2px] border-b border-base-300">
                                <th className="py-6 px-8 font-bold text-center">#</th>
                                <th className="font-bold">Meal Details</th>
                                <th className="font-bold">Customer</th>
                                <th className="font-bold">Total</th>
                                <th className="font-bold text-center">Status</th>
                                <th className="text-center font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedRequests.map((order, index) => {
                                const isPending = order.orderStatus === 'Pending';
                                const isAccepted = order.orderStatus === 'Accepted';
                                const isDelivered = order.orderStatus === 'Delivered';

                                return (
                                    <tr key={order._id} className="border-b border-base-200 hover:bg-base-200/30 transition-colors">
                                        <td className="px-8 text-center font-medium text-base-content/40">
                                            {startIndex + index + 1}
                                        </td>
                                        <td>
                                            <div className="font-bold text-base-content">{order.mealName}</div>
                                            <div className="text-[10px] text-base-content/50 italic">{order.orderTime}</div>
                                        </td>
                                        <td>
                                            <div className="font-semibold text-base-content/80">{order.userEmail}</div>
                                            <div className="text-[11px] text-base-content/50 truncate max-w-[150px]">{order.userAddress}</div>
                                        </td>
                                        <td className="font-black text-primary">
                                            {order.price * (parseInt(order.quantity) || 1)} TK
                                            <span className="block text-[10px] text-base-content/40 font-normal">Qty: {order.quantity}</span>
                                        </td>
                                        <td className="text-center">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                isPending ? 'bg-warning/10 text-warning' : 
                                                isAccepted ? 'bg-info/10 text-info' : 
                                                isDelivered ? 'bg-success/10 text-success' : 
                                                'bg-error/10 text-error'
                                            }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-4">
                                            <div className='flex gap-2 justify-center'>
                                                <button 
                                                    onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                                                    disabled={!isPending}
                                                    className="btn btn-xs btn-error btn-outline border-2 font-bold disabled:bg-base-200 disabled:text-base-content/20 disabled:border-base-300"
                                                >
                                                    Reject
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(order._id, 'Accepted')}
                                                    disabled={!isPending}
                                                    className="btn btn-xs btn-info btn-outline border-2 font-bold disabled:bg-base-200 disabled:text-base-content/20 disabled:border-base-300"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                                    disabled={!isAccepted}
                                                    className="btn btn-xs btn-success btn-outline border-2 font-bold disabled:bg-base-200 disabled:text-base-content/20 disabled:border-base-300"
                                                >
                                                    Deliver
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {paginatedRequests.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-base-content/30">
                        <FaBoxOpen size={40} className="mb-2 opacity-20" />
                        <p className="font-medium">No results matching your search.</p>
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {totalResults > 0 && (
                <div className="flex justify-end">
                    <div className="join bg-base-100 shadow-sm border border-base-300">
                        <button 
                            className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary/10 text-base-content"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            <FaChevronLeft />
                        </button>
                        <button className="join-item btn btn-sm bg-base-100 border-none font-bold text-xs px-6 pointer-events-none text-base-content">
                            Page {currentPage} of {totalPages}
                        </button>
                        <button 
                            className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary/10 text-base-content"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderRequests;