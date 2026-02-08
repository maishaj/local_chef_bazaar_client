import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import orderImg from '../../assets/place-order.jpg'
import Swal from 'sweetalert2';

const OrderPage = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();
    const {id}=useParams();
    const {register,handleSubmit,reset}=useForm();
    
    const {data:meal=[]}=useQuery({
        queryKey:['meal',id],
        queryFn: async()=>{
            const res=await axiosSecure(`/meal-details/${id}`);
            return res.data;
        }
    })

    const {_id,chefId,chefName,foodImage,foodPrice,deliveryArea,foodName,ingredients,estimatedDeliveryTime,
    chefsExperience,foodDetails}=meal;

    const handleOrder=(data)=>{

        const orderInfo={

           foodId:id,
           mealName:foodName,
           price:foodPrice,
           quantity:data.quantity,
           chefId:data.chefId,
           paymentStatus:"Pending",
           userEmail:data.email,
           userAddress:data.address,
           orderStatus:data.orderStatus,
           orderTime:data.orderTime
        }
        const totalprice= data.quantity*foodPrice;
        axiosSecure.post('/order',orderInfo)
        .then((res)=>{
            Swal.fire({
            title: `Your total cost is Tk ${totalprice}`,
            text: "Do you want to confirm the order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then((result) => {
            if (result.isConfirmed) {
                reset();
                Swal.fire({
                title: "Placed!",
                text: "Order placed successfully!",
                icon: "success"
                });
            }
            });
            })
        }

    return (
        <div className='w-10/12 flex justify-center items-center gap-2 mx-auto'>
           <div className='w-1/2'>
                <h1 className='text-3xl text-center m-10 font-bold'>Place <span className='text-primary'>Order</span></h1>
                <form onSubmit={handleSubmit(handleOrder)} className="m-10">
                        <div>
                            <fieldset className="fieldset">
                                <label className="label">Meal</label>
                                <input type="text" className="input" {...register("meal",{required:true})} defaultValue={foodName} readOnly/>

                                <label className="label">Price</label>
                                <input type="text" className="input" {...register("price",{required:true})} defaultValue={foodPrice} readOnly/>

                                <label className='label'>Quantity</label>
                                <input type="text" className="input" {...register("quantity",{required:true})} placeholder="quantity"/>

                                <label className='label'>Chef Id</label>
                                <input type="text" className="input" {...register("chefId",{required:true})} defaultValue={chefId} readOnly/>

                                <label className="label">Address</label>
                                <input type="text" className="input" {...register("address",{required:true})} placeholder="Your address" />

                                <label className="label">Email</label>
                                <input type="email" className="input" {...register("email",{required:true})} defaultValue={user.email}/>
                            
                                <label className="label">Order Status</label>
                                <input type="text" className="input" {...register("orderStatus",{required:true})} defaultValue={"Pending"} readOnly/>

                                <label className="label">Time</label>
                                <input type="text" className="input" {...register("orderTime",{required:true})} defaultValue={new Date()} readOnly/>
                                
                            <button className="btn btn-neutral mt-4 w-1/4">Place Order</button>
                            </fieldset>
                        </div>
                </form>
           </div>
           <div className='w-1/2'>
                <img src={orderImg} alt="" />
           </div>
        </div>
    );
};

export default OrderPage;