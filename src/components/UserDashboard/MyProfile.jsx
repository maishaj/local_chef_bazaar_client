import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { 
    FaUser, FaLock, FaCamera, FaSave, 
    FaChevronRight, FaEnvelope, FaMapMarkerAlt, FaShieldAlt 
} from 'react-icons/fa';
import axios from 'axios';


const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    
   
    const [activeTab, setActiveTab] = useState('personal'); 
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

  
    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const form = e.target;
        const name = form.name.value;
        const address = form.address.value;
        const imageFile = form.image.files[0];

        let currentPhotoURL = user?.photoURL;

        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);
            
            const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            
            const imgRes = await axios.post(img_API_URL, formData);
            if (imgRes.data.success) {
                currentPhotoURL = imgRes.data.data.url;
            }
        }

        await updateUserProfile({ 
            displayName: name, 
            photoURL: currentPhotoURL 
        });


        const dbRes = await axiosSecure.patch(`/users/update/${user.email}`, { 
            name, 
            photo: currentPhotoURL, 
            address 
        });

        if (dbRes.data.success) {
            toast.success("Profile synced across Firebase and DB!");
            setIsEditing(false);
            setPreview(null);
            refetch(); 
            setLoading(false);
            }
    } 
    catch (error) {
        console.error(error);
        toast.error("Failed to update profile.");
    } finally {
        setLoading(false); 
    }
}

  
    return (
        <div className="min-h-screen bg-[#F8F9FA] p-4 lg:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* --- Left Sidebar Navigation --- */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                        <div className="relative mb-4 inline-block">
                            <div className="w-28 h-28 rounded-full ring-4 ring-primary/10 overflow-hidden mx-auto shadow-inner">
                                <img 
                                    src={preview || user?.photoURL || 'https://via.placeholder.com/150'} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">{user?.displayName}</h3>
                        <p className="badge badge-primary badge-outline uppercase text-[10px] font-bold tracking-widest mt-1">
                            {role}
                        </p>

                        <nav className="mt-8 space-y-2 text-left">
                            <button 
                                onClick={() => setActiveTab('personal')}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'personal' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                <div className="flex items-center gap-3"><FaUser size={14}/> <span className="font-semibold text-sm">Account Details</span></div>
                                <FaChevronRight size={10} />
                            </button>
                            <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'security' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                <div className="flex items-center gap-3"><FaShieldAlt size={14}/> <span className="font-semibold text-sm">Security</span></div>
                                <FaChevronRight size={10} />
                            </button>
                        </nav>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[550px]">
                        
                        {activeTab === 'personal' && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                                        <p className="text-gray-400 text-sm mt-1">Manage your avatar and personal identity.</p>
                                    </div>
                                    {!isEditing && (
                                        <button 
                                            onClick={() => setIsEditing(true)} 
                                            className="btn btn-primary btn-outline btn-sm rounded-xl px-6"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleUpdate} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Name Field */}
                                        <div className="form-control w-full">
                                            <label className="label text-gray-500 font-bold text-xs uppercase">Full Name</label>
                                            <div className="relative">
                                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                                <input 
                                                    disabled={!isEditing} 
                                                    name="name" 
                                                    defaultValue={user?.displayName} 
                                                    className="input input-bordered w-full pl-10 bg-gray-50 disabled:bg-white text-gray-700 font-medium focus:input-primary" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {/* File Input for PNG/JPG */}
                                        <div className="form-control w-full">
                                            <label className="label text-gray-500 font-bold text-xs uppercase">Profile Picture</label>
                                            <div className="relative">
                                                <input 
                                                    disabled={!isEditing} 
                                                    type="file" 
                                                    name="image" 
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="file-input file-input-bordered w-full focus:file-input-primary bg-gray-50 disabled:bg-white" 
                                                />
                                            </div>
                                        </div>

                                        {/* Email (Read Only) */}
                                        <div className="form-control w-full md:col-span-2">
                                            <label className="label text-gray-500 font-bold text-xs uppercase">Email Address</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                                <input 
                                                    disabled 
                                                    defaultValue={user?.email} 
                                                    className="input input-bordered w-full pl-10 bg-gray-100 cursor-not-allowed text-gray-400" 
                                                />
                                            </div>
                                        </div>

                                        {/* Address Field */}
                                        <div className="form-control w-full md:col-span-2">
                                            <label className="label text-gray-500 font-bold text-xs uppercase">Residential Address</label>
                                            <div className="relative">
                                                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-300" />
                                                <textarea 
                                                    disabled={!isEditing} 
                                                    name="address" 
                                                    defaultValue={userInfo.address} 
                                                    className="textarea textarea-bordered w-full pl-10 bg-gray-50 disabled:bg-white h-28 text-gray-700 focus:textarea-primary" 
                                                    placeholder="Enter your current address..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-50">
                                            <button 
                                                type="button" 
                                                onClick={() => {setIsEditing(false); setPreview(null);}} 
                                                className="btn btn-ghost text-gray-400 hover:text-gray-600"
                                            >
                                                Discard
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={loading} 
                                                className="btn btn-primary px-10 shadow-lg shadow-primary/30"
                                            >
                                                {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FaSave className="mr-2"/> Save Changes</>}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="p-8 text-center py-20">
                                <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaShieldAlt size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Security & Password</h2>
                                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                    For your protection, password changes are processed via a verified email link.
                                </p>
                                <button className="btn btn-primary mt-8 px-8">Send Reset Link</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;