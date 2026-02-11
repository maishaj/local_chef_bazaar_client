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
   
    const {data:meal=[]}=useQuery({
        queryKey:['meal',id],
        queryFn: async()=>{
            const res=await axiosSecure(`/meal-details/${id}`);
            return res.data;
        }
    })

    const {_id,chefId,chefEmail,chefName,foodImage,foodPrice,deliveryArea,foodName,ingredients,estimatedDeliveryTime,
    chefsExperience,foodDetails}=meal;

    const {register,handleSubmit,reset}=useForm({
    values: {
        meal: foodName,
        price: foodPrice,
        chefId: chefId,
        email: user?.email,
        orderStatus: "Pending",
      }
    });
    

    const handleOrder=(data)=>{

        const orderInfo={
           foodId:id,
           mealName:foodName,
           chefName:chefName,
           deliveryTime:estimatedDeliveryTime,
           price:foodPrice,
           quantity:data.quantity,
           chefId:data.chefId,
           paymentStatus:"Pending",
           chefEmail:chefEmail,
           userEmail:data.email,
           userAddress:data.address,
           orderStatus:data.orderStatus,
           orderTime:data.orderTime
        }
        const totalprice= data.quantity*foodPrice;
           Swal.fire({
            title: `Your total cost is Tk ${totalprice}`,
            text: "Do you want to confirm the order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                axiosSecure.post('/order', orderInfo)
                .then((res) => {
                if (res.data.insertedId) {
                    axiosSecure.patch(`/users/address/${user?.email}`, {
                    address: data.address
                });
                reset();
                Swal.fire("Placed!", "Order placed successfully!", "success");
            }
            });
            }
            });
        };

    return (
        <div className='w-11/12 flex flex-col-reverse md:flex-row lg:flex-row justify-center items-center gap-2 mx-auto'>
           <div className='w-full md:w-1/2 lg:w-1/2'>
                <h1 className='text-3xl text-center m-10 font-bold'>Place <span className='text-primary'>Order</span></h1>
                <form onSubmit={handleSubmit(handleOrder)} className="m-10">
                        <div>
                            <fieldset className="fieldset">
                                <label className="label">Meal</label>
                                <input type="text" className="input" {...register("meal")}  readOnly/>

                                <label className="label">Price</label>
                                <input type="text" className="input" {...register("price")}  readOnly/>

                                <label className='label'>Quantity</label>
                                <input type="text" className="input" {...register("quantity",{required:true})} placeholder="quantity"/>

                                <label className='label'>Chef Id</label>
                                <input type="text" className="input" {...register("chefId")}  readOnly/>

                                <label className="label">Address</label>
                                <input type="text" className="input" {...register("address",{required:true})} placeholder="Your address" />

                                <label className="label">Email</label>
                                <input type="email" className="input" {...register("email",{required:true})} />
                            
                                <label className="label">Order Status</label>
                                <input type="text" className="input" {...register("orderStatus")}  readOnly/>

                                {/* <label className="label">Time</label>
                                <input type="text" className="input" {...register("orderTime")} readOnly/> */}
                                
                            <button className="w-full btn btn-neutral mt-4 md:w-1/4 lg:w-1/4 p-3">Place Order</button>
                            </fieldset>
                        </div>
                </form>
           </div>
           <div className='w-full md:w-1/2 lg:w-1/2 mt-10'>
                <img src={orderImg} alt="" />
           </div>
        </div>
    );
};

export default OrderPage;