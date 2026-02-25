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
       <div className="p-6 bg-base-100 text-base-content min-h-screen">
    <h2 className="text-2xl font-bold mb-6">All Users ({users.length})</h2>
    
    <div className="overflow-x-auto shadow-2xl rounded-xl border border-base-300">
        <table className="table w-full">
           
            <thead className="bg-base-300 text-base-content uppercase text-xs tracking-wider">
                <tr>
                    <th className="py-4">#</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            
            <tbody className="divide-y divide-base-300">
                {users.map((user, index) => (
                    
                    <tr key={user._id} className="hover:bg-base-200/50 transition-colors border-base-300">
                        <th className="text-base-content/50 font-medium">{index + 1}</th>
                        
                       
                        <td className="font-semibold text-base-content">
                            {user.displayName || "N/A"}
                        </td>
                        
                        <td className="text-base-content/70">{user.email}</td>
                        
                        <td>
                          
                            <span className={`capitalize px-3 py-1 rounded-full text-xs font-bold ring-1 ${
                                user.role === 'admin' ? 'bg-purple-500/10 text-purple-500 ring-purple-500/20' :
                                user.role === 'chef' ? 'bg-blue-500/10 text-blue-500 ring-blue-500/20' : 
                                'bg-base-content/10 text-base-content/70 ring-base-content/20'
                            }`}>
                                {user.role}
                            </span>
                        </td>
                        
                        <td>
                            <span className={`badge border-none font-bold py-3 ${
                                user.status === 'fraud' ? 'bg-error/20 text-error' : 'bg-success/20 text-success'
                            }`}>
                                {user.status || 'active'}
                            </span>
                        </td>
                        
                        <td className="text-center">
                            {user.role !== 'admin' && (
                               <button 
                                onClick={() => markAsFraud(user._id)}
                                disabled={user.status === 'fraud'}
                                className={`btn btn-sm px-4 font-bold transition-all duration-300 ${
                                    user.status === 'fraud' 
                                    ? 'btn-ghost bg-base-300 text-base-content cursor-not-allowed' 
                                    : 'btn-error btn-outline hover:bg-error hover:text-white border-2'
                                }`}
                            >
                                {user.status === 'fraud' ? (
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.366zM7.5 4.072a6 6 0 017.39 7.39L7.5 4.072zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                                        </svg>
                                        Fraudulent
                                    </span>
                                ) : (
                                    'Make Fraud'
                                )}
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