import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Newsletter = () => {

    const{
        register,
        handleSubmit,
        reset,
    }=useForm();

    const axiosSecure=useAxiosSecure();

    const handleNewsletter=(data)=>{
        const info={
          name:data.name,
          email:data.email}
        axiosSecure.post('/newsletter',info)
        .then((res)=>{
            reset();
        });
    }

    return (
        <div className='w-10/12 mx-auto bg-[#E8F0FE] h-auto m-10 p-12 space-y-10 flex flex-col items-center'>
            <h1 className='text-4xl font-semibold'>Newsletter</h1>
            <p className='text-xl text-center'>Join our "Foodie Club" and we’ll send a secret discount code straight to your inbox every Friday.</p>
            <form onSubmit={handleSubmit(handleNewsletter)} className='flex flex-col md:flex-row lg:flex-row gap-2'>
               <input type="text" className="input" {...register("name",{required:true})} placeholder="Your name" />
               <input type="email" className="input" {...register("email",{required:true})} placeholder="Your email" />
               <button className="btn btn-neutral">Submit</button>
            </form>
        </div>
    );
};

export default Newsletter;