import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch, FaChevronLeft, FaChevronRight, FaSort, FaClock } from 'react-icons/fa';

const ManageRoleRequests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // --- TABLE CONTROL STATES ---
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: 'requestTime', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: requests = [] } = useQuery({
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
            toast.success("Action completed successfully!");
        }
    });

    // --- LOGIC: FILTERING & SORTING ---
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

    // --- LOGIC: PAGINATION ---
    const totalPages = Math.max(1, Math.ceil(processedRequests.length / itemsPerPage));
    
    // Auto-reset to page 1 if current page becomes empty due to filtering
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
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

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-black mb-8 text-neutral-900 tracking-tight">Role Management</h2>

            {/* --- CONTROLS --- */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none focus:ring-2 ring-emerald-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <select 
                    className="select select-bordered rounded-xl bg-white border border-gray-200 font-bold shadow-sm"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* --- DATA TABLE --- */}
            <div className="w-full overflow-x-auto shadow-sm rounded-3xl border border-base-300 bg-white">
                <table className="table w-full min-w-[850px]">
                    <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest border-b">
                        <tr>
                            <th className="py-5 cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => handleSort('userName')}>
                                <div className="flex items-center gap-2">User Details <FaSort /></div>
                            </th>
                            <th>Request Type</th>
                            <th className="cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => handleSort('requestTime')}>
                                <div className="flex items-center gap-2">Time Sent <FaSort /></div>
                            </th>
                            <th>Current Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginatedData.map((req) => (
                            <tr key={req._id} className="hover:bg-emerald-50/30 transition-colors">
                                <td className="py-4">
                                    <div className="font-bold text-neutral-800">{req.userName}</div>
                                    <div className="text-xs text-gray-400">{req.userEmail}</div>
                                </td>
                                <td>
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                                        req.requestType === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {req.requestType}
                                    </span>
                                </td>
                                <td className="text-xs text-gray-500">
                                    <div className="flex items-center gap-2"><FaClock /> {new Date(req.requestTime).toLocaleDateString()}</div>
                                </td>
                                <td>
                                    <div className={`badge badge-sm font-bold border-none ${
                                        req.requestStatus === 'approved' ? 'bg-success/10 text-success' :
                                        req.requestStatus === 'rejected' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                                    }`}>
                                        {req.requestStatus}
                                    </div>
                                </td>
                                <td className="flex justify-center gap-2">
                                    <button
                                        onClick={() => updateStatus({ id: req._id, status: 'approved', userEmail: req.userEmail, requestType: req.requestType })}
                                        disabled={req.requestStatus !== 'pending'}
                                        className={`btn btn-xs rounded-lg ${req.requestStatus === 'pending' ? 'btn-success btn-outline' : 'btn-disabled'}`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus({ id: req._id, status: 'rejected' })}
                                        disabled={req.requestStatus !== 'pending'}
                                        className={`btn btn-xs rounded-lg ${req.requestStatus === 'pending' ? 'btn-error btn-outline' : 'btn-disabled'}`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {processedRequests.length === 0 && (
                    <div className="p-20 text-center text-gray-400 italic">No matching requests found.</div>
                )}
            </div>

            {/* --- PAGINATION --- */}
            <div className="flex justify-between items-center mt-6 px-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Showing {paginatedData.length} of {processedRequests.length} results
                </span>
                
                <div className="join bg-white shadow-sm border border-base-300">
                    <button 
                        className="join-item btn btn-sm bg-white border-none hover:bg-emerald-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        <FaChevronLeft className="text-[10px]" />
                    </button>
                    <button className="join-item btn btn-sm bg-white border-none font-black text-xs px-6">
                        Page {currentPage} of {totalPages}
                    </button>
                    <button 
                        className="join-item btn btn-sm bg-white border-none hover:bg-emerald-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        <FaChevronRight className="text-[10px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageRoleRequests;