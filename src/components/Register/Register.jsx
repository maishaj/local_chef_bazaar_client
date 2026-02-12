import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import toast from 'react-hot-toast';


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

    // const handleRegistration=async(data)=>{
    //     const email=data.email;
    //     const password=data.password;
    //     const profileImg=data.photo[0];
        
    //     await createUser(email,password)
    //     .then((res)=>{

    //         const formData=new FormData();
    //         formData.append("image",profileImg);

    //         //upload to imagebb using axios
    //         const img_API_URl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
    //         axios.post(img_API_URl,formData)
    //         .then((res)=>{
    //             const photoURL=res.data.data.url;
    //             //create user in database
    //             const userInfo={
    //                 displayName:data.name,
    //                 email:data.email,
    //                 photoURL:photoURL,
    //                 address:data.address
    //             }
    //             const dbRes=axiosSecure.post('/users',userInfo)
    //             .then((res)=>{
    //             })

    //             //update Profile
    //             const profile={
    //                 displayName:data.name,
    //                 photoURL:photoURL,
    //             }
    //             updateUserProfile(profile)
    //             .then((res)=>{
    //             })
    //         })
    //         toast.success("You registered successfully!");
    //         navigate(location?.state || "/");
    //         reset();
    //     })
    //     .catch((error)=>{
    //     })

    // }
    const handleRegistration = async (data) => {
    const { email, password, name, address } = data;
    const profileImg = data.photo[0];

    try {
        const res = await createUser(email, password);

        const formData = new FormData();
        formData.append("image", profileImg);
        const img_API_URl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        
        const imgRes = await axios.post(img_API_URl, formData);
        const photoURL = imgRes.data.data.url;

        const userInfo = {
            displayName: name,
            email: email.toLowerCase(), 
            photoURL: photoURL,
            address: address
        };

        const dbRes = await axiosSecure.post('/users', userInfo);

        if (dbRes.data.message === "User already exists") {
            toast.error("This email is already registered in our database!");
            return; 
        }

        const profile = { displayName: name, photoURL: photoURL };
        await updateUserProfile(profile);

        toast.success("You registered successfully!");
        reset();
        navigate(location?.state || "/");

    } catch (error) {
        console.error(error);

        if (error.code === 'auth/email-already-in-use') {
            toast.error("Email already in use. Please try logging in.");
        } else if (error.response?.data?.message === "User already exists") {
             toast.error("User already exists in our records.");
        } else {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    }
};

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
        console.error(error);
        toast.error("Failed to login.");
    }
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left mt-15">
                <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold">Register now!</h1>
                <p className="hidden md:block lg:block text-xl py-6">
                    Register to explore a world of fresh, homemade meals from talented home cooks near you. Access your account to order, manage favorites, and enjoy delicious home-cooked food delivered straight to your door.
                </p>
                </div>
                <form onSubmit={handleSubmit(handleRegistration)} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-12">
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
                        <button onClick={handleGoogle} className="btn bg-white text-black border-[#e5e5e5] w-full border-2">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                        </button>
                        
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;