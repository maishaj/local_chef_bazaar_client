import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import createmealImg from '../../assets/createmealsImg.jpg';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const CreateMeal = () => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {register,handleSubmit,reset}=useForm({
        values:{
            email:user?.email,
        }
    });

    const { data: dbUser } = useQuery({
    queryKey: ['user-db', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
    }
   });

   const isFraud=dbUser?.status==="fraud";

    const handleCreateMeal= (data)=>{
        const toastId = toast.loading("Adding your meal...");
        //image
        const imageFile=data.image[0];
        const formData=new FormData();
        formData.append("image",imageFile);

        const img_API_URl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        const res=axios.post(img_API_URl,formData);
        const photoURL=res.data.data.url;

        //ingredients
        const ingredientsArray=data.ingredients.split(',').map(item=>item.trim()).filter(item=>item!=="");
       
       const mealInfo={

           foodName:data.mealName,
           foodImage:photoURL,
           chefName:data.chefName,
           foodPrice:parseFloat(data.price),
           foodRating:parseFloat(data.rating),
           deliveryArea:data.deliveryArea,
           ingredients:ingredientsArray,
           estimatedDeliveryTime:data.deliveryTime,
           chefsExperience:data.experience,
           foodDetails:data.details,
           chefEmail:user.email,
           userEmail:user.email,
           createdAt:new Date().toLocaleString()
       }

       axiosSecure.post('/meals',mealInfo)
       .then((res)=>{
         if(res.data.insertedId)
         {
            reset();
            toast.success("Your meal is added successfully!",{id:toastId});
         }
       })
    }

    return (
        <div className='w-10/12 mx-auto'>
            <h1 className='text-3xl text-center m-10 font-bold'>Create<span className='text-primary'>Meals</span></h1>
               <div className='flex flex-col-reverse md:flex-row lg:flex-row'>
                   <form onSubmit={handleSubmit(handleCreateMeal)} className="m-10 w-full md:w-1/2 lg:w-1/2">
                        <div>
                            <fieldset className="fieldset">
                                <label className="label">Meal Name</label>
                                <input type="text" className="input" {...register("mealName",{required:true})} placeholder='meal name'/>

                                <label className="label">Chef Name</label>
                                <input type="text" className="input" {...register("chefName",{required:true})} placeholder='chef name'/>

                                <label className="label">Email</label>
                                <input type="email" className="input" {...register("email")}/>

                                <label className="label">Meal Image</label>
                                <input type="file" className="file-input" {...register("image", { required: true })} placeholder='meal image' />

                                <label className='label'>Price</label>
                                <input type="number" className="input" {...register("price",{required:true})} placeholder="price"/>

                                <label className='label'>Rating</label>
                                <input type="text" className="input" {...register("rating",{required:true})} placeholder="rating"/>

                                <label className='label'>Ingredients</label>
                                <input type="text" className="input" {...register("ingredients")} placeholder="Tomato, Cheese, Basil, "/>

                                <label className='label'>Details</label>
                                <input type="text" className="input" {...register("details")} placeholder="details"/>

                                <label className="label">Delivery Area</label>
                                <input type="text" className="input" {...register("deliveryArea",{required:true})} placeholder="deliveryArea"/>

                                <label className="label">Estimated Delivery Time</label>
                                <input type="text" className="input" {...register("deliveryTime",{required:true})} placeholder="deliveryTime"/>

                                <label className="label">Your experience</label>
                                <input type="text" className="input" {...register("experience",{required:true})} placeholder='in years'/>
                            {
                                isFraud ? 
                                (
                                <button className="btn btn-disabled mt-4 w-1/4">Create</button>
                                ) : (
                                <button className="btn btn-primary mt-4 w-1/4">Create</button>
                                )
                            }
                            </fieldset>
                        </div>
                   </form>
                   <div className='w-full md:w-1/2 lg:w-1/2 mx-auto'>
                      <img src={createmealImg}  alt="" />
                   </div>
               </div>
        </div>
    );
};

export default CreateMeal;