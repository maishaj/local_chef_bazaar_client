import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const axiosSecure=useAxiosSecure();
    const queryClient=useQueryClient();

    const {data:users=[]}=useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res=await axiosSecure.get('/users');
            return res.data;
        }
    })

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

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage All Users ({users.length})</h2>
            <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-orange-500 text-white text-sm">
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <th>{index + 1}</th>
                                <td className="font-semibold text-gray-700">{user.displayName || "N/A"}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`capitalize px-3 py-1 rounded-full text-xs font-bold ${
                                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                        user.role === 'chef' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge border-none font-bold ${
                                        user.status === 'fraud' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                    }`}>
                                        {user.status || 'active'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => markAsFraud(user._id)}
                                            disabled={user.status === 'fraud'}
                                            className={`btn btn-sm p-3 ${
                                                user.status === 'fraud' ? 'btn-disabled' : 'btn-error btn-outline'
                                            }`}
                                        >
                                            {user.status === 'fraud' ? 'Fraudulent' : 'Make Fraud'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;