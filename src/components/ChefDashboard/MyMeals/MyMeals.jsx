import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import MyMealsCard from './MyMealsCard';

const MyMeals = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();

    const{data:meals=[],refetch}=useQuery({
        queryKey:['meals',user?.email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/meals/${user.email}`);
            return res.data;
        }
    })

    return (
       <div className='w-11/12 mx-auto'>
           <h1 className='text-3xl font-semibold text-center m-10'>My <span className='text-primary'>Meals</span></h1>
           <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-5'>
            {
                meals.map(meal=><MyMealsCard key={meal._id} meal={meal} refetch={refetch}></MyMealsCard>)
            }
        </div>
       </div>
    );
};

export default MyMeals;