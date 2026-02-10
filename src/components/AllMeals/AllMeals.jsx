import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AllMealsCard from './AllMealsCard';
import { useSearchParams } from 'react-router';

const AllMeals = () => {

    const [order,setOrder]=useState("desc");
    const [currentPage,setCurrentPage]=useState(1);

    const [searchParams,setSearchParams]=useSearchParams();
    const searchTerm=searchParams.get("search") || "";
    
    const itemsPerPage=10;
    
    const handleSelect=(e)=>{
        const sortText=e.target.value;
        setOrder(sortText);
        setCurrentPage(1);
    }

    const axiosSecure=useAxiosSecure();
    const {data:result}=useQuery({
        queryKey:['allmeals',order,currentPage,searchTerm],
        queryFn: async()=>{
          const skip = (currentPage - 1) * itemsPerPage;
          const res=await axiosSecure.get(`all-meals?limit=${itemsPerPage}&skip=${skip}&order=${order}&search=${searchTerm}`);
          return res.data;
        }
    })

    const meals=result?.meals || [];
    const totalCount=result?.totalCount || 0;

    const totalPages=Math.ceil(totalCount/itemsPerPage);
    const pages=[...Array(totalPages).keys()].map(n=>n+1);

    return (
        <div className='w-full md:w-11/12 lg:md:w-11/12 mx-auto'>
            <h1 className='text-3xl font-semibold text-center m-10'>Our <span className='text-primary'>Menu</span></h1>
            {/* sorting */}
            <div className='w-11/12 mx-auto flex justify-end'>
                <select onChange={handleSelect} defaultValue="Sort by Price" className="select">
                <option disabled={true}>Sort by Price</option>
                <option value={"asc"}>Asc Order</option>
                <option value={"desc"}>Desc Order</option>
                </select>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4 m-10'>
                {
                    meals.map(meal=><AllMealsCard meal={meal} key={meal._id}></AllMealsCard>)
                }
            </div>
            {/* pagination */}
            <div className='flex justify-center m-8'>
                 {
                    pages.map(page=>
                        <button onClick={()=>setCurrentPage(page)} key={page} className={`join-item btn btn-sm ${currentPage===page? 'btn-primary': ''}`}>
                            {page}
                        </button>
                    )
                 }
            </div>
        </div>
    );
};

export default AllMeals;