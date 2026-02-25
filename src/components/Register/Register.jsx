import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const { createUser, updateUserProfile, googleSignIn, loading, setLoading } = useAuth();
    const password = watch("password", "");

    const handleRegistration = async (data) => {
        const { email, password, name, address } = data;
        const profileImg = data.photo[0];

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", profileImg);
            const img_API_URl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            
            const imgRes = await axios.post(img_API_URl, formData);
            const photoURL = imgRes.data.data.url;

            await createUser(email, password);
            await updateUserProfile({ displayName: name, photoURL });

            const userInfo = {
                displayName: name,
                email: email.toLowerCase(),
                photoURL,
                address
            };

            await axiosSecure.post('/users', userInfo);

            toast.success("Account created successfully!");
            reset();
            navigate("/");

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("This email is already registered.");
            } else {
                toast.error(error.message || "Registration failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen py-10">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="text-center lg:text-left max-w-md">
                    <h1 className="text-4xl font-bold text-emerald-600">Register now!</h1>
                    <p className="py-6 text-base-content/70 hidden md:block">
                        Join Chef Bazaar to experience fresh, homemade meals delivered to your door.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleRegistration)} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-base-300">
                    <div className="card-body">
                        
                        {/* Name Field */}
                        <div className="form-control">
                            <label htmlFor="name" className="label text-sm font-semibold text-base-content/70">Name</label>
                            <input id="name" type="text" className="input input-bordered bg-base-200" placeholder="Your name" {...register("name", { required: true })} />
                            {errors.name?.type === "required" && <p className='text-red-500 text-xs mt-1'>Your name is required</p>}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label htmlFor="email" className="label text-sm font-semibold text-base-content/70">Email</label>
                            <input id="email" type="email" className="input input-bordered bg-base-200" placeholder="Your email" {...register("email", { required: true })} />
                            {errors.email?.type === "required" && <p className='text-red-500 text-xs mt-1'>Your email is required</p>}
                        </div>

                        {/* Profile Photo */}
                        <div className="form-control">
                            <label htmlFor="photo" className="label text-sm font-semibold text-base-content/70">Profile Photo</label>
                            <input id="photo" type="file" className="file-input file-input-bordered bg-base-200 w-full" {...register("photo", { required: true })} />
                            {errors.photo?.type === "required" && <p className='text-red-500 text-xs mt-1'>Your photo is required</p>}
                        </div>

                        {/* Address */}
                        <div className="form-control">
                            <label htmlFor="address" className="label text-sm font-semibold text-base-content/70">Address</label>
                            <input id="address" type="text" className="input input-bordered bg-base-200" placeholder="Your address" {...register("address", { required: true })} />
                            {errors.address?.type === "required" && <p className='text-red-500 text-xs mt-1'>Your address is required</p>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label htmlFor="pass" className="label text-sm font-semibold text-base-content/70">Password</label>
                            <input id="pass" type="password" className="input input-bordered bg-base-200" placeholder="Your password" 
                                {...register("password", { 
                                    required: true, 
                                    minLength: 6, 
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/ 
                                })} 
                            />
                            {errors.password?.type === "required" && <p className='text-red-500 text-xs mt-1'>Provide your password</p>}
                            {errors.password?.type === "minLength" && <p className='text-red-500 text-xs mt-1'>Password length must be 6 characters or longer!</p>}
                            {errors.password?.type === "pattern" && (
                                <p className='text-red-500 text-xs mt-1 leading-tight'>
                                    Password must have at least one uppercase, lowercase, digit, and special character!
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-control">
                            <label htmlFor="confirm" className="label text-sm font-semibold text-base-content/70">Confirm Password</label>
                            <input id="confirm" type="password" className="input input-bordered bg-base-200" placeholder="Confirm your password" 
                                {...register("confirmPassword", { 
                                    required: true, 
                                    validate: (value) => value === password 
                                })} 
                            />
                            {errors.confirmPassword?.type === "required" && <p className='text-red-500 text-xs mt-1'>Please confirm your password</p>}
                            {errors.confirmPassword?.type === "validate" && <p className='text-red-500 text-xs mt-1'>Passwords do not match</p>}
                        </div>

                        <p className="text-xs mt-4">Already have an account? <Link to="/auth/login" className="text-emerald-600 font-bold hover:underline">Login</Link></p>

                        <button disabled={loading} className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none mt-6 shadow-lg">
                            {loading ? <span className="loading loading-spinner"></span> : "Register"}
                        </button>

                        <div className="divider text-[10px] uppercase font-bold opacity-30">OR</div>

                        <button type="button" onClick={googleSignIn} disabled={loading} className="btn btn-outline border-base-300 hover:bg-base-200 w-full">
                            Login with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;