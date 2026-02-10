import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, Outlet, useParams } from 'react-router';
import star from '../../assets/stars.png';
import halfStar from '../../assets/halfstar.png';
import AddReview from '../AddReview/AddReview';
import { FaRegHeart } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import DynamicTitle from '../DynamicTitle/DynamicTitle';

const MealDetails = () => {

    const {id}=useParams();
    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();

    const {data:meal=[]}=useQuery({
        queryKey:['meals',id],
        queryFn:async()=>{
           const res=await axiosSecure.get(`/meal-details/${id}`);
           return res.data;
        }
    })

    const { data: dbUser } = useQuery({
    queryKey: ['user-db', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
    }
   });

   const isFraud=dbUser?.status==="fraud";

    const {_id,chefId,chefName,foodImage,foodPrice,deliveryArea,foodName,ingredients,estimatedDeliveryTime,
    chefsExperience,foodDetails}=meal;

    const handleFavourites=(id)=>{
        const favInfo={
            userEmail:user.email,
            mealId:id,
            mealName:foodName,
            chefId:chefId,
            chefName:chefName,
            price:foodPrice,
            addedTime:new Date()
        }
        axiosSecure.post('/favourites',favInfo)
        .then((res)=>{
            if (res.data.message === "Already exists in your favourites!") {
                toast.error(res.data.message);}
            else {
                toast.success(`${foodName} is added to your favourites!`);
            }
        }
        )
    }

    return (
        <div className='flex flex-col'>
        <div className="bg-base-100 min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                
                
                <div className="relative group">
                    <img
                        src={foodImage}
                        alt={foodName}
                        className="w-full h-[400px] object-cover rounded-3xl shadow-xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        TK {foodPrice}
                    </div>
                </div>

               
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="badge badge-secondary uppercase tracking-widest text-xs font-bold">Chef Special</div>
                            <div className="badge badge-outline text-xs font-medium italic">Exp: {chefsExperience}</div>
                        </div>
                        <h1 className="text-3xl lg:text-3xl font-bold text-neutral">{foodName}</h1>
                        <div className="flex flex-col mt-2">
                            <p className="text-gray-500 italic">
                                Prepared with love by <span className="text-primary font-bold">Chef {chefName}</span>
                            </p>
                            <p className="text-[12px] uppercase tracking-tighter text-gray-400 mt-1">
                                Chef Identity Code: <span className="font-mono">{chefId}</span>
                            </p>
                        </div>
                    </div>

                  
                    <div className='flex items-center gap-4'>
                        <div className='flex gap-1'>
                            {[...Array(4)].map((_, i) => <img key={i} className='w-5 h-5' src={star} alt="star" />)}
                            <img className='w-5 h-5' src={halfStar} alt="halfstar" />
                        </div>
                        <span className="text-sm text-gray-500 font-medium">(4.5 Rating)</span>
                    </div>

                    
                    <div className="bg-base-200 p-5 rounded-2xl">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                             🥘 Ingredients
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {ingredients?.map((ind, index) => (
                                <span key={index} className="badge badge-outline badge-md py-3 px-4 font-medium">
                                    {ind}
                                </span>
                            ))}
                        </div>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-bold">Details</h3>
                        <p className="text-black mt-2 leading-relaxed">
                            {foodDetails}
                        </p>
                    </div>

                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                            <p className="text-xs uppercase text-gray-500 font-bold">Delivery Area</p>
                            <p className="font-semibold">{deliveryArea}</p>
                        </div>
                        <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                            <p className="text-xs uppercase text-gray-500 font-bold">Delivery Time</p>
                            <p className="font-semibold">{estimatedDeliveryTime}</p>
                        </div>
                    </div>

                    <div className='flex flex-row justify-center md:block lg:block'>
                        {
                        isFraud ? 
                        (
                                <button 
                                    onClick={() => toast.error("Your account is restricted from placing orders.")}
                                    className="w-1/3 btn btn-disabled btn-lg mr-4 p-1"
                                >
                                    Order Now
                                </button>
                            ) : (
                                <Link 
                                    to={`/meals/meal-details/${_id}/place-order`} 
                                    className="w-1/3 btn btn-primary btn-lg shadow-lg hover:shadow-primary/30 mr-4 p-1"
                                >
                                    Order Now
                                </Link>)
                        }
                        <button onClick={()=>handleFavourites(_id)} className="w-1/3 btn btn-primary btn-lg shadow-lg hover:shadow-primary/30 p-1">Add to Fav</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <AddReview foodName={foodName}></AddReview>
        </div>
        <Outlet></Outlet>
        </div>
    );
};

export default MealDetails;