import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyOrdersCard from './MyOrdersCard';

const MyOrders = () => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data:orders=[]}=useQuery({
        queryKey:['order',user?.email],
        queryFn: async ()=>{
            const res=await axiosSecure.get(`/order/${user.email}`);
            return res.data;
        }
    })

    return (
        <div className='w-11/12 mx-auto m-5'>
            <h1 className='text-3xl text-center font-bold mb-5'>My <span className='text-primary'>Orders</span></h1>
            <div className='space-y-5 '>
                {
                 orders.map(order=><MyOrdersCard key={order._id} order={order}></MyOrdersCard>)
                }
            </div>
        </div>
    );
};

export default MyOrders;