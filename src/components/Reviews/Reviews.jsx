import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ReviewsCard from './ReviewsCard';

const Reviews = () => {

    const axiosSecure=useAxiosSecure();
    const {data:reviews=[]}=useQuery({
        queryKey:['reviews'],
        queryFn: async ()=>{
            const res=await axiosSecure.get('/reviews');
            return res.data;
        }
    })

    return (
        <div className='w-10/12 mx-auto'>
            <h2 className="text-3xl font-bold text-center mb-16 underline decoration-[#f97416] underline-offset-8 mt-16">What Our Diners Say</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3'>
                {
                 reviews.map(review=><ReviewsCard review={review} key={review._id}></ReviewsCard>)
                }
            </div>
        </div>
    );
};

export default Reviews;