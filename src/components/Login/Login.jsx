import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUserShield, FaUserAlt } from 'react-icons/fa'; 
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue, 
    } = useForm();

    const { signIn, googleSignIn, loading, setLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const setDemo = (role) => {
        if (role === 'admin') {
            setValue("email", "samiha@gmail.com");
            setValue("password", "Samiha@123");
        } else if(role==="chef"){
            setValue("email", "ahnaf@gmail.com");
            setValue("password", "Ahnaf@123");
        }
         else {
            setValue("email", "maliha@gmail.com");
            setValue("password", "Maliha@123");
        }
        toast.success(`${role.toUpperCase()} credentials filled!`);
    };
    

    const handleLogin = (data) => {
        const email = data.email;
        const password = data.password;

        signIn(email, password)
            .then((res) => {
                toast.success("You logged in successfully!");
                reset();
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error("Failed to login.");
                setLoading(false);
            });
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
            toast.error("Failed to login.");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <form onSubmit={handleSubmit(handleLogin)} className="card bg-base-100 max-w-sm shrink-0 shadow-2xl w-11/12 mx-auto border border-base-300">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-8 text-base-content">Login Now</h1>

                    <fieldset className="fieldset p-0">
                        {/* Email Field */}
                        <label htmlFor='email' className="label text-sm font-medium text-base-content/70">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            {...register("email", { required: "Email is required" })}
                            className={`input input-bordered bg-base-200 text-base-content focus:outline-none focus:border-emerald-500 ${errors.email ? 'input-error' : ''}`}
                        />
                        {errors.email && <p className="text-error text-xs mt-1 font-medium">{errors.email.message}</p>}

                        {/* Password Field */}
                        <label htmlFor='pass' className="label text-sm font-medium text-base-content/70 mt-3">Password</label>
                        <input
                            id="pass"
                            type="password"
                            placeholder="••••••••"
                            {...register("password", { required: "Password is required" })}
                            className={`input input-bordered bg-base-200 text-base-content focus:outline-none focus:border-emerald-500 ${errors.password ? 'input-error' : ''}`}
                        />
                        {errors.password && <p className="text-error text-xs mt-1 font-medium">{errors.password.message}</p>}

                        
                        <div className="mt-4 p-3 bg-base-200 rounded-xl border border-dashed border-base-300">
                            <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2">Quick Demo Login</p>
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setDemo('admin')} 
                                    className="btn btn-xs flex-1 bg-white border-base-300 hover:bg-emerald-50 text-emerald-700"
                                >
                                    <FaUserShield className="text-[10px]" /> Admin
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setDemo('chef')} 
                                    className="btn btn-xs flex-1 bg-white border-base-300 hover:bg-emerald-50 text-emerald-700"
                                >
                                    <FaUserAlt className="text-[10px]" /> Chef
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setDemo('user')} 
                                    className="btn btn-xs flex-1 bg-white border-base-300 hover:bg-emerald-50 text-emerald-700"
                                >
                                    <FaUserAlt className="text-[10px]" /> User
                                </button>
    
                            </div>
                        </div>

                        <p className="text-xs text-base-content/60 mt-4">
                            Don't have an account? 
                            <Link to="/auth/register" className="underline text-emerald-600 font-bold ml-1 hover:text-emerald-500">Register</Link>
                        </p>

                        <button 
                            type="submit"
                            disabled={loading} 
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none mt-6 w-full shadow-lg"
                        >
                            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
                        </button>

                        <div className="divider text-[10px] text-base-content/30 uppercase font-bold tracking-widest">OR</div>
                        
                        <button className="btn bg-white text-black border-[#e5e5e5]" type="button" disabled={loading} onClick={handleGoogle} >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                         Google
                        </button>
                    </fieldset>
                </div>
            </form>
        </div>
    );
};

export default Login;