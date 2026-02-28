import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure=useAxiosSecure();

    const onSubmit = (data) => {

        const name=data.name;
        const email=data.email;
        const subject=data.subject;
        const message=data.message;

        axiosSecure.post('/contact',{name,email,subject,message})
        .then((res)=>{
           if(res.data.insertedId)
           {
              toast.success("Message sent! Our chefs will get back to you.");
              reset();
           }
        })
    };

    return (
       <div>
        <Navbar></Navbar>
            <div className="min-h-screen bg-base-200 py-12 px-4 flex flex-col items-center mt-8">
                {/* Heading Section */}
                <div className="max-w-6xl w-full text-center mb-12">
                    <h1 className="text-4xl md:text-4xl font-extrabold text-base-content mb-4">
                        Get in <span className="text-emerald-600">Touch</span>
                    </h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Have questions about our fresh ingredients, subscription plans, or a recent order? 
                        Our team is ready to serve you.
                    </p>
                    <div className="flex justify-center mt-4">
                        <div className="h-1 w-20 bg-emerald-600 rounded-full"></div>
                    </div>
                </div>

                <div className="max-w-6xl md:w-1/2 lg:w-1/2">    
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label font-semibold text-base-content/80">Name</label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered focus:outline-none focus:border-emerald-500 w-full" />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                                </div>

                                <div className="form-control w-full">
                                    <label className="label font-semibold text-base-content/80">Email</label>
                                    <input {...register("email", { required: true })} type="email" placeholder="Email Address" className="input input-bordered focus:outline-none focus:border-emerald-500 w-full" />
                                    {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label font-semibold text-base-content/80">Subject</label>
                                <input {...register("subject")} type="text" placeholder="How can we help?" className="input input-bordered focus:outline-none focus:border-emerald-500 w-full" />
                            </div>

                            <div className="form-control w-full">
                                <label className="label font-semibold text-base-content/80">Message</label>
                                <textarea {...register("message", { required: true })} className="textarea textarea-bordered h-32 focus:outline-none focus:border-emerald-500 w-full" placeholder="Type your message here..."></textarea>
                                {errors.message && <span className="text-red-500 text-xs mt-1">Message cannot be empty</span>}
                            </div>

                            <div className="flex justify-start">
                                <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-12 gap-2 shadow-lg transition-all active:scale-95">
                                    <FaPaperPlane /> Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        <Footer></Footer>
       </div>
    );
};

export default Contact;