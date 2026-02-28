import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch, FaChevronLeft, FaChevronRight, FaSort, FaClock, FaUserShield, FaUserEdit } from 'react-icons/fa';

const ManageRoleRequests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: 'requestTime', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Optimized for admin view

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['role-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/request-role');
            return res.data;
        }
    });

    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, status, userEmail, requestType }) => {
            const res = await axiosSecure.patch(`/admin/role-request/${id}`, { 
                status, userEmail, requestType 
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['role-requests']);
            toast.success("Request status updated!");
        }
    });

    const processedRequests = useMemo(() => {
        let result = requests.filter(req => 
            (req.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
             req.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (statusFilter === "all" || req.requestStatus === statusFilter)
        );

        if (sortConfig.key) {
            result.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [requests, searchTerm, statusFilter, sortConfig]);

    const totalPages = Math.max(1, Math.ceil(processedRequests.length / itemsPerPage));
    
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [searchTerm, statusFilter, totalPages, currentPage]);

    const paginatedData = processedRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-base-200/50 min-h-screen transition-colors duration-300">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-base-content tracking-tight">
                    Role <span className="text-primary">Requests</span>
                </h2>
            </div>

            {/* CONTROLS */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 border-none shadow-sm focus:outline-none focus:ring-2 ring-primary text-base-content"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <select 
                    className="select select-bordered rounded-2xl bg-base-100 border-none shadow-sm font-bold text-base-content focus:outline-none focus:ring-2 ring-primary w-full md:w-auto"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* DATA TABLE */}
            <div className="w-full overflow-x-auto shadow-sm rounded-3xl border border-base-300 bg-base-100">
                <table className="table w-full">
                    <thead className="bg-base-200/50 text-base-content/50 text-[10px] uppercase tracking-widest border-b border-base-300">
                        <tr>
                            <th className="py-6 px-8 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('userName')}>
                                <div className="flex items-center gap-2">User Details <FaSort className="opacity-30" /></div>
                            </th>
                            <th>Request Type</th>
                            <th className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('requestTime')}>
                                <div className="flex items-center gap-2">Time Sent <FaSort className="opacity-30" /></div>
                            </th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200">
                        {paginatedData.map((req) => (
                            <tr key={req._id} className="hover:bg-base-200/30 transition-colors">
                                <td className="py-4 px-8">
                                    <div className="font-bold text-base-content">{req.userName}</div>
                                    <div className="text-xs text-base-content/50">{req.userEmail}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm font-black border-none px-3 py-3 gap-2 ${
                                        req.requestType === 'admin' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                                    }`}>
                                        {req.requestType === 'admin' ? <FaUserShield /> : <FaUserEdit />}
                                        {req.requestType}
                                    </span>
                                </td>
                                <td className="text-xs text-base-content/60">
                                    <div className="flex items-center gap-2">
                                        <FaClock className="opacity-30" /> 
                                        {new Date(req.requestTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge badge-sm font-bold border-none ${
                                        req.requestStatus === 'approved' ? 'bg-success/10 text-success' :
                                        req.requestStatus === 'rejected' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                                    }`}>
                                        ● {req.requestStatus}
                                    </div>
                                </td>
                                <td className="px-8">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => updateStatus({ id: req._id, status: 'approved', userEmail: req.userEmail, requestType: req.requestType })}
                                            disabled={req.requestStatus !== 'pending'}
                                            className="btn btn-xs btn-success btn-outline rounded-lg disabled:bg-base-200 disabled:text-base-content/20"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateStatus({ id: req._id, status: 'rejected' })}
                                            disabled={req.requestStatus !== 'pending'}
                                            className="btn btn-xs btn-error btn-outline rounded-lg disabled:bg-base-200 disabled:text-base-content/20"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {processedRequests.length === 0 && (
                    <div className="p-20 text-center text-base-content/30 italic">No matching requests found.</div>
                )}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
                <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
                    Showing {paginatedData.length} of {processedRequests.length} total requests
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
                        Page {currentPage} / {totalPages}
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
        </div>
    );
};

export default ManageRoleRequests;