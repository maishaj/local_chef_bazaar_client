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
            <h1 className='text-3xl font-semibold text-center m-10'>What <span className='text-primary'>our diners</span> say</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3'>
                {
                 reviews.map(review=><ReviewsCard review={review} key={review._id}></ReviewsCard>)
                }
            </div>
        </div>
    );
};

export default Reviews;