import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageRoleRequests = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    
    const { data: requests = []} = useQuery({
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


    return (
       <div className="p-6 bg-base-100 text-base-content min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Role Management Dashboard</h2>
            
            <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-300 bg-base-100">
                <table className="table w-full">
                    {/* Header: Removed hardcoded orange, using theme-aware neutral/base-300 */}
                    <thead className="bg-base-200 text-base-content uppercase text-xs tracking-wider">
                        <tr>
                            <th className="py-4">User Details</th>
                            <th>Request Type</th>
                            <th>Time Sent</th>
                            <th>Current Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-base-300">
                        {requests.map((req) => {
                            const isPending = req.requestStatus === 'pending';

                            return (
                                <tr key={req._id} className="hover:bg-base-200/50 transition-colors">
                                    <td>
                                        <div className="font-bold">{req.userName}</div>
                                        <div className="text-xs opacity-60 italic">{req.userEmail}</div>
                                    </td>
                                    <td>
                                        {/* Type Badge: Using subtle opacity for modern dark look */}
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ring-1 ${
                                            req.requestType === 'admin' 
                                            ? 'bg-purple-500/10 text-purple-500 ring-purple-500/20' 
                                            : 'bg-blue-500/10 text-blue-500 ring-blue-500/20'
                                        }`}>
                                            {req.requestType}
                                        </span>
                                    </td>
                                    <td className="text-xs opacity-70">
                                        {new Date(req.requestTime).toLocaleString()}
                                    </td>
                                    <td>
                                        <div className={`badge badge-md border-none font-bold py-3 ${
                                            req.requestStatus === 'approved' ? 'bg-success/20 text-success' :
                                            req.requestStatus === 'rejected' ? 'bg-error/20 text-error' : 
                                            'bg-warning/20 text-warning'
                                        }`}>
                                            {req.requestStatus}
                                        </div>
                                    </td>
                                    <td className="flex justify-center gap-3">
                                    <button
                                        onClick={() => updateStatus({
                                        id: req._id,
                                        status: 'approved',
                                        userEmail: req.userEmail,
                                        requestType: req.requestType
                                        })}
                                        disabled={!isPending}
                                        className={`btn btn-xs md:btn-sm px-4 font-bold transition-all duration-300 ${
                                        isPending
                                            ? "btn-success btn-outline hover:bg-success hover:text-white border-2"
                                            : "bg-base-300 text-base-content border-base-200 cursor-not-allowed"
                                        }`}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() => updateStatus({ id: req._id, status: 'rejected' })}
                                        disabled={!isPending}
                                        className={`btn btn-xs md:btn-sm px-4 font-bold transition-all duration-300 ${
                                        isPending
                                            ? "btn-error btn-outline hover:bg-error hover:text-white border-2"
                                            : "bg-base-300 text-base-content border-base-200 cursor-not-allowed"
                                        }`}
                                    >
                                        Reject
                                    </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                {requests.length === 0 && (
                    <div className="text-center py-12 text-base-content/40">
                        <p className="italic">No pending role requests found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageRoleRequests;