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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-neutral">Role Management Dashboard</h2>
            <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th>User Details</th>
                            <th>Request Type</th>
                            <th>Time Sent</th>
                            <th>Current Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => {
                            const isPending = req.requestStatus === 'pending';

                            return (
                                <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="font-bold text-gray-800">{req.userName}</div>
                                        <div className="text-sm opacity-60 italic">{req.userEmail}</div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                                            req.requestType === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {req.requestType}
                                        </span>
                                    </td>
                                    <td className="text-xs text-gray-500">{req.requestTime}</td>
                                    <td>
                                        <div className={`badge badge-md border-none font-bold ${
                                            req.requestStatus === 'approved' ? 'bg-green-500 text-white' :
                                            req.requestStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                                        }`}>
                                            {req.requestStatus}
                                        </div>
                                    </td>
                                    <td className="flex justify-center gap-3">
                                        <button 
                                            onClick={() => updateStatus({ 
                                                id: req._id, status: 'approved', 
                                                userEmail: req.userEmail, requestType: req.requestType 
                                            })}
                                            disabled={!isPending}
                                            className="btn btn-sm btn-success text-white px-4"
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => updateStatus({ id: req._id, status: 'rejected' })}
                                            disabled={!isPending}
                                            className="btn btn-sm btn-error text-white px-4"
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
                    <div className="text-center py-10 text-gray-400">No pending role requests found.</div>
                )}
            </div>
        </div>
    );
};

export default ManageRoleRequests;