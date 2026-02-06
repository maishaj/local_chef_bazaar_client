import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const Register = () => {

    const navigate=useNavigate();
    const axiosSecure=useAxiosSecure();

    const{
        register,
        handleSubmit,
        formState:{errors},
        reset,
        watch,
    }=useForm();

    const {user,createUser,logOut,updateUserProfile,googleSignIn}=useAuth();

    const password=watch("password","");

    const handleRegistration=async(data)=>{
        const email=data.email;
        const password=data.password;
        const profileImg=data.photo[0];
        
        await createUser(email,password)
        .then((res)=>{

            const formData=new FormData();
            formData.append("image",profileImg);

            //upload to imagebb using axios
            const img_API_URl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            axios.post(img_API_URl,formData)
            .then((res)=>{
                const photoURL=res.data.data.url;
                //create user in database
                const userInfo={
                    displayName:data.name,
                    email:data.email,
                    photoURL:photoURL,
                }
                axiosSecure.post('/users',userInfo)
                .then((res)=>{
                })

                //update Profile
                const profile={
                    displayName:data.name,
                    photoURL:photoURL,
                }
                updateUserProfile(profile)
                .then((res)=>{
                })
            })
            
            navigate(location?.state || "/");
            reset();
        })
        .catch((error)=>{
        })

    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <p className="py-6">
                    Register to explore a world of fresh, homemade meals from talented home cooks near you. Access your account to order, manage favorites, and enjoy delicious home-cooked food delivered straight to your door.
                </p>
                </div>
                <form onSubmit={handleSubmit(handleRegistration)} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" className="input" {...register("name",{required:true})} placeholder="Your name" />
                            {
                                errors.name?.type==="required" &&
                                <p className='text-red-500'>Your name is required</p>
                            }

                            <label className="label">Email</label>
                            <input type="email" className="input" {...register("email",{required:true})} placeholder="Your email" />
                            {
                                errors.email?.type==="required" &&
                                <p className='text-red-500'>Your email is required</p>
                            }

                            <label className='label'>Profile</label>
                            <input type="file" className="file-input" {...register("photo",{required:true})} placeholder='Your profile' />
                            {
                                errors.photo?.type==="required" &&
                                <p className='text-red-500'>Your photo is required</p>
                            }

                            <label className="label">Address</label>
                            <input type="text" className="input" {...register("address",{required:true})} placeholder="Your address" />
                            {
                                errors.address?.type==="required" &&
                                <p className='text-red-500'>Your address is required</p>
                            }

                            <label className="label">Password</label>
                            <input type="password" className="input" {...register("password",{required:true,minLength:6,pattern:
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,})} placeholder="Your password" />
                            {
                                errors.password?.type==="required" &&
                                <p className='text-red-500'>Provide your password</p>
                            }
                            {
                                errors.password?.type==="minLength" &&
                                <p className='text-red-500'>Password length must be 6 characters or longer!</p>
                            }
                            {
                                errors.password?.type==="pattern" &&
                                <p className='text-red-500'>Password must have at least one uppercase, at least one
                                lowercase, at least one digit and at least one special
                                character!!</p>
                            }

                            <label className="label">Confirm Password</label>
                            <input type="password" className='input' {...register("confirmPassword",{required:true,
                                validate:(value)=>value===password || "Passwords do not match"
                            })} placeholder='Confirm your password' />
                            {
                                errors.confirmPassword &&
                                <p className='text-red-500'>{errors.confirmPassword.message}</p>
                            }
                        <p>Already have an account? <Link to="/auth/login" className='underline'>Login</Link></p> 
                        <button className="btn btn-neutral mt-4">Register</button>
                        
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;