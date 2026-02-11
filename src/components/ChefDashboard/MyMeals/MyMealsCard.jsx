import React, { useRef } from 'react';
import star from '../../../assets/stars.png';
import halfStar from '../../../assets/halfstar.png';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyMealsCard = ({meal,refetch}) => {

    const modalRef=useRef();
    const axiosSecure=useAxiosSecure();

    const modalOpen=()=>{
        modalRef.current.showModal();
    }

    const { reset, register, handleSubmit } = useForm({
        values: {
            mealName: meal.foodName,
            chefName: meal.chefName,
            price: meal.foodPrice,
            rating: meal.foodRating,
            ingredients: meal.ingredients?.join(', '), 
            details: meal.foodDetails,
            deliveryArea: meal.deliveryArea,
            deliveryTime: meal.estimatedDeliveryTime,
            experience: meal.chefsExperience
        }
    });

    const handleUpdate = async (data) => {

        const toastId = toast.loading("Saving changes...");
        try {
            const updatedInfo = {
            mealName: data.mealName,
            chefName: data.chefName,
            price: data.price,
            rating: data.rating,
            ingredients: typeof data.ingredients === 'string' 
                ? data.ingredients.split(',').map(i => i.trim()).filter(i => i !== "") 
                : data.ingredients,
            details: data.details,
            deliveryArea: data.deliveryArea,
            deliveryTime: data.deliveryTime,
            experience: data.experience
             };

            const res = await axiosSecure.patch(`/meals/${meal._id}`, updatedInfo);
            if (res.data.modifiedCount > 0) 
            {
                refetch();
                modalRef.current.close();
                toast.success("Updated successfully!", { id: toastId });
            } 
            else 
            {
                toast.dismiss(toastId);
                modalRef.current.close();
            }
            } 
            catch (error) {
            toast.error("Save failed", { id: toastId });
        }
    };

    const handleDelete=(data)=>{
        Swal.fire({
        text: "Do you want to delete this meal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes"
        }).then((result) =>{
            if (result.isConfirmed) {
                axiosSecure.delete(`/meals/${meal._id}`)
                .then((res)=>{
                    if(res.data.deletedCount)
                    {
                        refetch();
                        toast.success("Meal is deleted successfully!");
                    }
                })
           }
        })
    }

    return (
        <div>
            <div key={meal._id} className="card bg-base-100 w-full mx-auto shadow-sm h-full">
                <figure>
                    <img
                    className='h-[250px] w-full object-cover'
                    src={meal.foodImage}
                    alt="" />
                </figure>
                <div className="card-body flex flex-col grow">
                    <div className='grow space-y-1'>
                        <h2 className="card-title text-gray-500 italic">{meal.foodName}</h2>
                        <div className="bg-base-200 p-4 rounded-2xl">
                        <div className="flex flex-wrap justify-center items-center gap-1 text-gray-500 italic">
                            {meal.ingredients?.map((ind, index) => (
                                <span key={index} className="badge badge-outline badge-md py-5 font-medium">
                                    {ind}
                                </span>
                            ))}
                        </div>
                    </div>
                        <h2 className='text-[14px] md:text-[16px] lg:text-[16px] text-gray-500 italic'>By {meal.chefName}</h2>
                        <h3 className='text-[14px] md:text-[16px] lg:text-[16px] text-gray-500 italic'>Chef ID: {meal.chefId}</h3>
                        <h3 className='text-[14px] md:text-[16px] lg:text-[16px] text-gray-500 italic'>Delivery Time:  {meal.estimatedDeliveryTime} mins</h3>
                        <h3 className='text-[14px] md:text-[16px] lg:text-[16px] text-gray-500 italic'>TK {meal.foodPrice}</h3>
                    </div>
                    <div className='flex gap-1'>
                        <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                        <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                        <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                        <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                        <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={halfStar} alt="" />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-2 m-2">
                        {/* update */}
                        <button  className="btn btn-outline btn-error btn-sm px-4" onClick={()=>modalOpen()}>Update</button>
                        <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <form className='' onSubmit={handleSubmit(handleUpdate)}>
                                    <h1 className='text-2xl text-center font-semibold'>Update <span className='text-primary'>Meals</span></h1>
                                    <div className="py-4 space-y-3 flex flex-col items-center m-4">
                                    <input type="text" className="input" {...register("mealName",{required:true})} placeholder='meal name'/>
                                    <input type="text" className="input" {...register("chefName",{required:true})} placeholder='chef name'/>
                                    <input type="number" className="input" {...register("price",{required:true})} placeholder="price"/>
                                    <input type="text" className="input" {...register("rating",{required:true})} placeholder="rating"/>
                                    <input type="text" className="input" {...register("ingredients")} placeholder="Tomato, Cheese, Basil, "/>
                                    <input type="text" className="input" {...register("details")} placeholder="details"/>
                                    <input type="text" className="input" {...register("deliveryArea",{required:true})} placeholder="deliveryArea"/>
                                    <input type="text" className="input" {...register("deliveryTime",{required:true})} placeholder="deliveryTime"/>
                                    <input type="text" className="input" {...register("experience",{required:true})} placeholder='in years'/>
                                    </div>
                                    <div className="modal-action flex justify-around">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                        <button type="button" className="btn" onClick={() => modalRef.current.close()}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                        {/* delete */}
                        <button onClick={handleDelete} className="btn btn-outline btn-primary btn-sm px-4">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyMealsCard;