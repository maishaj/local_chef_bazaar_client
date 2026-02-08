import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const MyFavourites = () => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data:favs=[],refetch}=useQuery({
        queryKey:['fav',user?.email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/favourites/${user?.email}`);
            return res.data;
        }
    })


    const handleDelete=(id)=>{
        axiosSecure.delete(`/favourites/${id}`)
        .then((res)=>{
            if(res.data.deletedCount){
                refetch();
                toast.success("Meal is removed from your favourites successfully!");
            }
        })
    }

    return (
       <div className='w-10/12 mx-auto'>
           <h1 className='text-3xl text-center font-bold mb-5'>My <span className='text-primary'>Favourites</span></h1>
           <div>
            {
                favs.map(fav => (
                    <div key={fav._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all m-5">
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="card-title text-xl font-bold text-primary">
                                        {fav.mealName || "Unknown Meal"}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Added on: {new Date(fav.addedTime).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="space-y-2">
                                <p className="text-gray-600 italic">By Chef {fav.chefName}</p>
                                <p className="text-gray-600 italic">ID: {fav.chefId}</p>
                                <p className="text-gray-600 italic">Price TK {fav.price}</p>
                            </div>

                            <div className="flex justify-end items-center mt-6 gap-3">
                                {/* delete btn */}
                                <button
                                    onClick={()=>handleDelete(fav._id)}
                                    className="btn btn-outline btn-error btn-sm px-4">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
       </div>
    );
};

export default MyFavourites;