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
    const itemsPerPage = 5; 

    const { data: users = [] } = useQuery({
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

   
    const totalPages = Math.ceil(processedUsers.length / itemsPerPage);
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

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-black mb-8 text-neutral-900 tracking-tight">Manage Users</h2>

            
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none focus:ring-2 ring-emerald-500"
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                
                <select 
                    className="select select-bordered rounded-2xl bg-white border-none font-bold"
                    onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="chef">Chef</option>
                    <option value="user">User</option>
                </select>
            </div>

         
            <div className="w-full overflow-x-auto shadow-sm rounded-3xl border border-base-300 bg-white">
                <table className="table w-full min-w-[800px]">
                    <thead className="bg-base-200/50 text-base-content/50 text-[10px] uppercase tracking-widest">
                        <tr>
                            <th className="py-5">#</th>
                            <th className="cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => requestSort('displayName')}>
                                <div className="flex items-center gap-2">Name <FaSort className="text-[10px]" /></div>
                            </th>
                            <th className="cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => requestSort('email')}>
                                <div className="flex items-center gap-2">Email <FaSort className="text-[10px]" /></div>
                            </th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-100">
                        {paginatedUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-base-100/50 transition-colors">
                                <td className="font-medium text-base-content/30">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="font-bold">{user.displayName || "N/A"}</td>
                                <td className="text-base-content/60">{user.email}</td>
                                <td>
                                    <span className={`badge badge-sm font-bold border-none px-3 py-3 ${
                                        user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                        user.role === 'chef' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge badge-ghost font-black text-[10px] uppercase ${user.status === 'fraud' ? 'text-error' : 'text-success'}`}>
                                        {user.status || 'active'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => markAsFraud(user._id)}
                                            disabled={user.status === 'fraud'}
                                            className="btn btn-ghost btn-xs text-error hover:bg-error/10"
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

           
            <div className="flex justify-between items-center mt-8">
                <p className="text-xs font-bold text-base-content/40">
                    Showing {paginatedUsers.length} of {processedUsers.length} results
                </p>
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

export default ManageUsers;