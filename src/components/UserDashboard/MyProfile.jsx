import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyProfile = () => {

    const {user}=useAuth();
    console.log(user);
    const {role}=useRole();
    const axiosSecure=useAxiosSecure();

    const {data:userInfo=[]}=useQuery({
        queryKey:['userInfo',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })

    const handleRoleRequest=(requestedRole)=>{
        const reqData={
            userId:userInfo._id,
            userName:userInfo.displayName,
            userEmail:userInfo.email,
            requestType:requestedRole,
            requestStatus:"pending",
            requestTime:new Date().toLocaleString
        }
        Swal.fire({
            title: `You want to be an ${requestedRole}?`,
            text: "The admin will review your request shortly",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes"
            }).then((result) =>{
                 if(result.isConfirmed){
                    axiosSecure.post('/request-role',reqData)
                    .then((res)=>{
                        if(res.data.message){
                          toast.error(res.data.message);
                        }
                        else{
                          toast.success("The admin will review your request shortly!");
                     }
                    })
                 }
            })
    }

    return (
        <div className="flex justify-center p-6 lg:p-12">
            <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row items-center gap-8">
            
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="User profile" />
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <div className="mt-2 flex gap-2 justify-center md:justify-start">
                                <span className={`badge badge-lg font-semibold uppercase ${role === 'admin' ? 'badge-error' : 'badge-primary'}`}>
                                    {role}
                                </span>
                                <span className={`badge badge-lg font-semibold uppercase ${userInfo.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                                    {userInfo.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="divider">Profile Details</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-6 rounded-xl">
                        <div>
                            <p className="text-xs uppercase text-gray-400 font-bold">Address</p>
                            <p className="text-lg">{userInfo.address || "No address provided"}</p>
                        </div>
                        

                        {role === 'chef' && (
                            <div>
                                <p className="text-xs uppercase text-gray-400 font-bold">Chef ID</p>
                                <p className="text-lg font-mono text-secondary">{userInfo.chefId}</p>
                            </div>
                        )}
                    </div>
                
                    <div className="card-actions justify-end mt-8 border-t pt-6 gap-4">
                        {role === 'user' && (
                            <button onClick={()=>{handleRoleRequest("chef")}} className="btn btn-secondary btn-outline">Be a Chef</button>
                        )}
                        {role !== 'admin' && (
                            <button onClick={()=>{handleRoleRequest("admin")}} className="btn btn-accent btn-outline">Be an Admin</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;