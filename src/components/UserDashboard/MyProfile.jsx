import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { 
    FaUser, FaLock, FaCamera, FaSave, 
    FaChevronRight, FaEnvelope, FaMapMarkerAlt, FaShieldAlt 
} from 'react-icons/fa';
import axios from 'axios';

const MyProfile = () => {
    const { user, updateUserProfile, passwordReset } = useAuth();
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

    const handleReset = () => {
        passwordReset(user?.email)
        .then(() => {
           toast.success("Email Sent! Check your inbox to reset your password.");
        })
        .catch(() => toast.error("Failed to send reset link."));
    }
   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setPreview(URL.createObjectURL(file));
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
                const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true }
                const compressedFile = await imageCompression(imageFile, options);
                const formData = new FormData();
                formData.append("image", compressedFile);
                const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
                const imgRes = await axios.post(img_API_URL, formData);
                if (imgRes.data.success) currentPhotoURL = imgRes.data.data.url;
            }

            await updateUserProfile({ displayName: name, photoURL: currentPhotoURL });
            const dbRes = await axiosSecure.patch(`/users/update/${user.email}`, { 
                name, photo: currentPhotoURL, address 
            });

            if (dbRes.data.success) {
                toast.success("Profile updated!");
                setIsEditing(false);
                setPreview(null);
                refetch();
            }
        } catch (error) {
            toast.error("Update failed.");
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className="min-h-screen bg-base-200/50 p-4 lg:p-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* --- Left Sidebar --- */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-300 text-center">
                        <div className="relative mb-4 inline-block">
                            <div className="w-28 h-28 rounded-full ring-4 ring-primary/20 overflow-hidden mx-auto shadow-inner">
                                <img 
                                    src={preview || user?.photoURL || 'https://via.placeholder.com/150'} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </div>
                        <h3 className="font-black text-xl text-base-content">{user?.displayName}</h3>
                        <p className="badge badge-primary badge-outline uppercase text-[10px] font-black tracking-widest mt-2">
                            {role}
                        </p>

                        <nav className="mt-8 space-y-2 text-left">
                            <button 
                                onClick={() => setActiveTab('personal')}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'personal' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-base-200 text-base-content/60'}`}
                            >
                                <div className="flex items-center gap-3"><FaUser size={14}/> Account</div>
                                <FaChevronRight size={10} />
                            </button>
                            <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'security' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-base-200 text-base-content/60'}`}
                            >
                                <div className="flex items-center gap-3"><FaShieldAlt size={14}/> Security</div>
                                <FaChevronRight size={10} />
                            </button>
                        </nav>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="lg:col-span-3">
                    <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 overflow-hidden min-h-[550px]">
                        
                        {activeTab === 'personal' && (
                            <div className="p-8">
                                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                                    <div>
                                        <h2 className="text-2xl font-black text-base-content">Personal Information</h2>
                                        <p className="text-base-content/50 text-sm mt-1">Manage your avatar and personal identity.</p>
                                    </div>
                                    {!isEditing && (
                                        <button 
                                            onClick={() => setIsEditing(true)} 
                                            className="btn btn-primary btn-outline btn-sm rounded-xl px-6 font-black"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleUpdate} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="form-control w-full">
                                            <label className="label text-base-content/40 font-black text-[10px] uppercase tracking-widest">Full Name</label>
                                            <div className="relative">
                                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
                                                <input 
                                                    disabled={!isEditing} 
                                                    name="name" 
                                                    defaultValue={user?.displayName} 
                                                    className="input input-bordered w-full pl-10 bg-base-200/50 disabled:bg-base-200 disabled:text-base-content/40 text-base-content font-bold focus:input-primary" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label text-base-content/40 font-black text-[10px] uppercase tracking-widest">Profile Picture</label>
                                            <input 
                                                disabled={!isEditing} 
                                                type="file" 
                                                name="image" 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="file-input file-input-bordered w-full bg-base-200/50 disabled:bg-base-200" 
                                            />
                                        </div>

                                        <div className="form-control w-full md:col-span-2">
                                            <label className="label text-base-content/40 font-black text-[10px] uppercase tracking-widest">Email Address</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20" />
                                                <input 
                                                    disabled 
                                                    defaultValue={user?.email} 
                                                    className="input input-bordered w-full pl-10 bg-base-300/50 cursor-not-allowed text-base-content/30 font-bold" 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-control w-full md:col-span-2">
                                            <label className="label text-base-content/40 font-black text-[10px] uppercase tracking-widest">Residential Address</label>
                                            <div className="relative">
                                                <FaMapMarkerAlt className="absolute left-4 top-4 text-primary/40" />
                                                <textarea 
                                                    disabled={!isEditing} 
                                                    name="address" 
                                                    defaultValue={userInfo.address} 
                                                    className="textarea textarea-bordered w-full pl-10 bg-base-200/50 disabled:bg-base-200 h-28 text-base-content font-bold focus:textarea-primary" 
                                                    placeholder="Enter your current address..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex justify-end gap-4 pt-8 border-t border-base-200">
                                            <button 
                                                type="button" 
                                                onClick={() => {setIsEditing(false); setPreview(null);}} 
                                                className="btn btn-ghost text-base-content/50 font-bold"
                                            >
                                                Discard
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={loading} 
                                                className="btn btn-primary px-10 shadow-lg shadow-primary/30 font-black"
                                            >
                                                {loading ? <span className="loading loading-spinner"></span> : <><FaSave className="mr-2"/> Save Changes</>}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="p-8 text-center py-20 flex flex-col items-center justify-center h-full">
                                <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6">
                                    <FaShieldAlt size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-base-content">Security & Password</h2>
                                <p className="text-base-content/50 mt-2 max-w-sm font-medium">
                                    For your protection, password changes are processed via a verified email link.
                                </p>
                                <button onClick={handleReset} className="btn btn-primary mt-8 px-10 font-black rounded-2xl shadow-xl shadow-primary/20">
                                    Send Reset Link
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;