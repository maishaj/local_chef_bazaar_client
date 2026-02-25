import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MealsCard from './MealsCard';

const Meals = () => {

    const axiosSecure=useAxiosSecure();
    const {data:meals=[]}=useQuery({
      queryKey:['meals'],
      queryFn: async()=>{
        const res=await axiosSecure.get('/meals');
        return res.data;
      }
    })

    return (
        <div className='w-11/12 mx-auto'>
           <h2 className="text-3xl font-bold text-center mb-16 underline decoration-[#f97416] underline-offset-8 mt-16">Daily Specials</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5'>
            {
                meals.map(meal=><MealsCard meal={meal} key={meal._id}></MealsCard>)
            }
            </div>
        </div>
    );
};

export default Meals;