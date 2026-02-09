import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const OrderRequests = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();
    const queryClient=useQueryClient();

    const {data:requests=[]}=useQuery({
        queryKey:['request',user?.email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/orderRequest/${user.email}`);
            return res.data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/order/status/${id}`, { orderStatus: status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['request', user?.email]);
            toast.success("Order updated successfully!");
        }
    });

    const handleStatusUpdate = async (id, status) => {
        try {
            await mutateAsync({ id, status });
        } catch (err) {
            toast.error("Failed to update status");
        }
    };
    return (
        <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Incoming Order Requests: {requests.length}</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="table w-full">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th>#</th>
                                <th>Meal Name</th>
                                <th>Customer Info</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {requests.map((order, index) => {
                            const isPending = order.orderStatus === 'Pending';
                            const isAccepted = order.orderStatus === 'Accepted';
                            const isCancelled = order.orderStatus === 'Cancelled';
                            const isDelivered = order.orderStatus === 'Delivered';

                            return (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{order.mealName}</div>
                                        <span className="text-xs opacity-50">{order.orderTime}</span>
                                    </td>
                                    <td>
                                        <div className="text-sm font-semibold">{order.userEmail}</div>
                                        <div className="text-xs">{order.userAddress}</div>
                                    </td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price * parseInt(order.quantity)} BDT</td>
                                    <td>
                                        <span className={`badge ${
                                            isPending ? 'badge-warning' : 
                                            isAccepted ? 'badge-info' : 
                                            isDelivered ? 'badge-success' : 'badge-error'
                                        }`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className='flex flex-col md:flex-row gap-2'>
                                        <button 
                                            onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                                            disabled={!isPending || isCancelled || isDelivered}
                                            className="btn btn-sm btn-outline btn-error"
                                        >
                                            Cancel
                                        </button>

                                        <button 
                                            onClick={() => handleStatusUpdate(order._id, 'Accepted')}
                                            disabled={!isPending || isCancelled || isDelivered}
                                            className="btn btn-sm btn-outline btn-primary"
                                        >
                                            Accept
                                        </button>

                                        <button 
                                            onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                            disabled={!isAccepted || isCancelled || isDelivered}
                                            className="btn btn-sm btn-outline btn-success"
                                        >
                                            Deliver
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                </div>
        </div>
    );
};

export default OrderRequests;