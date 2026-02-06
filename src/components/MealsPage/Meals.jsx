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
        <div>
            <h1 className='text-3xl font-semibold text-center m-10'>Daily <span className='text-primary'>Specials</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-10/12 mx-auto m-10 gap-10'>
            {
                meals.map(meal=><MealsCard meal={meal} key={meal._id}></MealsCard>)
            }
            </div>
        </div>
    );
};

export default Meals;