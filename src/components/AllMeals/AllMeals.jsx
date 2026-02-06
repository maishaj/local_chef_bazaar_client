import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AllMealsCard from './AllMealsCard';

const AllMeals = () => {

    const axiosSecure=useAxiosSecure();
    const {data:AllMeals=[]}=useQuery({
        queryKey:['allmeals'],
        queryFn: async()=>{
          const res=await axiosSecure.get('/all-meals');
          return res.data;
        }
    })

    return (
        <div className='w-full md:w-11/12 lg:md:w-11/12 mx-auto'>
            <h1 className='text-3xl font-semibold text-center m-10'>Our <span className='text-primary'>Menu</span></h1>
            <div className='w-11/12 mx-auto flex justify-end'>
                <select defaultValue="Pick a color" className="select">
                <option disabled={true}>Pick a color</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
                </select>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4 m-10'>
                {
                    AllMeals.map(meal=><AllMealsCard meal={meal} key={meal._id}></AllMealsCard>)
                }
            </div>
        </div>
    );
};

export default AllMeals;