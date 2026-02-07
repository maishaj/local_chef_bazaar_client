import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AllMealsCard from './AllMealsCard';

const AllMeals = () => {

    const [order,setOrder]=useState("desc");

    const handleSelect=(e)=>{
        const sortText=e.target.value;
        setOrder(sortText);
    }
    
    const axiosSecure=useAxiosSecure();
    const {data:AllMeals=[]}=useQuery({
        queryKey:['allmeals',order],
        queryFn: async()=>{
          const res=await axiosSecure.get(`/all-meals?order=${order}`);
          return res.data;
        }
    })

    return (
        <div className='w-full md:w-11/12 lg:md:w-11/12 mx-auto'>
            <h1 className='text-3xl font-semibold text-center m-10'>Our <span className='text-primary'>Menu</span></h1>
            <div className='w-11/12 mx-auto flex justify-end'>
                <select onChange={handleSelect} defaultValue="Sort by Price" className="select">
                <option disabled={true}>Sort by Price</option>
                <option value={"asc"}>Asc Order</option>
                <option value={"desc"}>Desc Order</option>
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