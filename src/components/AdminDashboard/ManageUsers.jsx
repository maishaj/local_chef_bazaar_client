import React, { useState, useMemo } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaSearch, FaChevronLeft, FaChevronRight, FaSort } from 'react-icons/fa';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: 'displayName', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Slightly increased for better desktop view

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { mutateAsync: markAsFraud } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/fraud/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success("User marked as Fraud successfully!");
        }
    });

    const processedUsers = useMemo(() => {
        let filtered = users.filter(user => 
            (user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
             user.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterRole === "all" || user.role === filterRole)
        );

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
                const valB = b[sortConfig.key]?.toString().toLowerCase() || "";
                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [users, searchTerm, filterRole, sortConfig]);

    const totalPages = Math.ceil(processedUsers.length / itemsPerPage) || 1;
    const paginatedUsers = processedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-base-200/30 min-h-screen transition-colors duration-300">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-base-content tracking-tight">Manage <span className="text-primary">Users</span></h2>
            </div>

            {/* FILTERS SECTION */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 border-none shadow-sm focus:outline-none focus:ring-2 ring-primary text-base-content"
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                
                <select 
                    className="select select-bordered rounded-2xl bg-base-100 border-none shadow-sm font-bold text-base-content focus:outline-none focus:ring-2 ring-primary w-full md:w-auto"
                    onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="chef">Chef</option>
                    <option value="user">User</option>
                </select>
            </div>

            {/* TABLE SECTION */}
            <div className="w-full overflow-x-auto shadow-sm rounded-3xl border border-base-300 bg-base-100">
                <table className="table w-full">
                    <thead className="bg-base-200/50 text-base-content/50 text-[10px] uppercase tracking-widest border-b border-base-200">
                        <tr>
                            <th className="py-6 px-6">#</th>
                            <th className="cursor-pointer hover:text-primary transition-colors" onClick={() => requestSort('displayName')}>
                                <div className="flex items-center gap-2">Name <FaSort className="opacity-30" /></div>
                            </th>
                            <th className="cursor-pointer hover:text-primary transition-colors" onClick={() => requestSort('email')}>
                                <div className="flex items-center gap-2">Email <FaSort className="opacity-30" /></div>
                            </th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200">
                        {paginatedUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-base-200/30 transition-colors">
                                <td className="px-6 font-medium text-base-content/30">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="font-bold text-base-content">{user.displayName || "Anonymous"}</td>
                                <td className="text-base-content/60">{user.email}</td>
                                <td>
                                    <span className={`badge badge-sm font-bold border-none px-3 py-3 ${
                                        user.role === 'admin' ? 'bg-secondary/10 text-secondary' :
                                        user.role === 'chef' ? 'bg-primary/10 text-primary' : 
                                        'bg-base-300 text-base-content/70'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${user.status === 'fraud' ? 'text-error' : 'text-success'}`}>
                                        ● {user.status || 'active'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => markAsFraud(user._id)}
                                            disabled={user.status === 'fraud'}
                                            className="btn btn-ghost btn-xs text-error hover:bg-error/10 disabled:text-base-content/20"
                                        >
                                            {user.status === 'fraud' ? 'Restricted' : 'Mark Fraud'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
                <p className="text-xs font-bold text-base-content/40">
                    Showing {paginatedUsers.length} of {processedUsers.length} total users
                </p>
                
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
        </div>
    );
};

export default ManageUsers;