import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const AdminDashboardHome = () => {

    const {user}=useAuth();
    const {role}=useRole();

    return (
         <div>
          <div className="hero h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-content mb-10 shadow-lg">
          <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between px-10">
        
        <div className="hidden lg:block">
           <img 
             src={user?.photoURL} 
             className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover" 
             alt="Profile" 
           />
        </div>
        
       
        <div>
          <h1 className="text-4xl font-bold">Welcome back, {user?.displayName || 'Chef'}!</h1>
          <p className="py-2 text-lg opacity-90">
            {role === 'admin' ? "The platform is under your command." : 
             role === 'chef' ? "Your kitchen is heating up! New orders are waiting." : 
             "Ready for your next delicious meal?"}
          </p>
          <div className="flex gap-3 mt-4">
             <div className="badge badge-outline p-4 font-semibold uppercase">{role}</div>
             <span className="opacity-75 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {new Date().toLocaleDateString()}
             </span>
          </div>
          </div>
          </div>
          </div>
        </div>
    );
};

export default AdminDashboardHome;