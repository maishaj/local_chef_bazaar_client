import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Login = () => {

    const{
        register,
        handleSubmit,
        formState:{errors},
        reset,
        }=useForm();

    const {user,signIn,googleSignIn,loading,setLoading}=useAuth();
    const axiosSecure=useAxiosSecure();
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
        .catch((error)=>{
        toast.error("Failed to login.");
        setLoading(false);
       })
    }

    const handleGoogle = async () => {
    try {
        const result = await googleSignIn();
        const user = result.user;

        await new Promise(resolve => setTimeout(resolve, 500));

        const userInfo = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            address: "",
        };

        await axiosSecure.post("/users", userInfo);

        toast.success("You logged in successfully!");
        navigate(location?.state || "/");

    } catch (error) {
        console.error("Google Login Error:", error);
        toast.error("Failed to login.");
    }
};


    return (
        <div className="hero bg-base-200 min-h-screen">
            <form onSubmit={handleSubmit(handleLogin)} className="card bg-base-100 max-w-sm shrink-0 shadow-2xl w-11/12 mx-auto border border-base-300">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-8 text-base-content">Login Now</h1>
                    
                    <fieldset className="fieldset p-0">
                        <label htmlFor="email-field" className="label text-sm font-medium text-base-content/70">
                            Email Address
                        </label>
                        <input 
                            id="email-field"
                            type="email" 
                            placeholder="name@company.com"
                        
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })} 
                            className={`input input-bordered bg-base-200 text-base-content focus:border-emerald-500 ${errors.email ? 'input-error' : ''}`} 
                        />
                    
                        {errors.email && (
                            <p className="text-error text-xs mt-1 font-medium">{errors.email.message}</p>
                        )}

                        <label htmlFor="password-field" className="label text-sm font-medium text-base-content/70 mt-3">
                            Password
                        </label>
                        <input 
                            id="password-field"
                            type="password" 
                            placeholder="••••••••"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Must be at least 6 characters" }
                            })} 
                            className={`input input-bordered bg-base-200 text-base-content focus:border-emerald-500 ${errors.password ? 'input-error' : ''}`} 
                        />
                        {errors.password && (
                            <p className="text-error text-xs mt-1 font-medium">{errors.password.message}</p>
                        )}

                        <p className="text-xs text-base-content/60 mt-4">
                            Don't have an account? 
                            <Link to="/auth/register" className="underline text-emerald-600 font-bold ml-1 hover:text-emerald-500">Register</Link>
                        </p>

                    
                        <button 
                            type="submit"
                            disabled={loading} 
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none mt-6 w-full shadow-lg"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        <div className="divider text-[10px] text-base-content/30 uppercase font-bold tracking-widest">OR</div>

                        <button 
                            type="button" 
                            disabled={loading}
                            onClick={handleGoogle} 
                            className="btn btn-outline border-base-200 hover:bg-base-200 text-base-content w-full flex items-center justify-center gap-3 transition-all"
                        >
                            <svg width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Google
                        </button>
                    </fieldset>
                </div>
            </form>
        </div>
    );
};

export default Login;