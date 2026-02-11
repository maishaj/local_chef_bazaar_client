import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {

    const{
        register,
        handleSubmit,
        formState:{errors},
        reset,
        }=useForm();

    const {user,signIn,logOut,googleSignIn}=useAuth();
    const location=useLocation();
    const navigate=useNavigate();

    const handleLogin=(data)=>{
        const email=data.email;
        const password=data.password;

        signIn(email,password)
        .then((res)=>{
            toast.success("You logged in successfully!");
            reset();
            navigate(location?.state || "/");
        })
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
                <form onSubmit={handleSubmit(handleLogin)} className="card bg-base-100  max-w-sm shrink-0 shadow-2xl w-10/12 mx-auto">
                    <div className="card-body">
                        <h1 className='text-3xl font-semibold text-center mb-10'>Login Now</h1>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" {...register("email",{required:true})} placeholder="Your email" />
                            {
                                errors.email?.type==="required" &&
                                <p className='text-red-500'>Your email is required</p>
                            }
                            <label className="label">Password</label>
                            <input type="password" className="input" {...register("password",{required:true})} placeholder="Your password" />
                            {
                                errors.password?.type==="required" &&
                                <p className='text-red-500'>Your password is required</p>
                            }            
                        <p>Don't have an account? <Link to="/auth/register" className='underline'>Register</Link></p>           
                        <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </form>
        </div>
    );
};

export default Login;