import React, { useState } from 'react';
import logoImg from '../../assets/local_chef_bazaar_logo.png'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {

    const {user,logOut}=useAuth();
    const navigate=useNavigate();4
    const [timer,setTimer]=useState(null);

    const [searchParams]=useSearchParams();
    const searchTerm=searchParams.get("search") || "";

    const links=
    <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/meals">Meals</NavLink></li>
        {
            user &&
            <>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    const handleLogout=()=>{
        logOut()
        .then((res)=>{
            navigate("/");
            toast.success("You logged out successfully");
        })
    }

    const handleSearch=(e)=>{
        const searchText=e.target.value;

        if(timer){
            clearTimeout(timer);
        }
        const newTimer=setTimeout(()=>{
           navigate(`/meals?search=${searchText}`);
        },500);

        setTimer(newTimer);
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  {links}
                </ul>
            </div>
            <a className="btn btn-ghost text-xl"><img src={logoImg} className='w-10 h-10 md:w-15 md:h-15  lg:w-15 lg:h-15' /><span className='text-[14px] md:text-[18px] lg:text-[18px]'>Chef Bazaar</span></a>
            </div>

            <div className="navbar-center hidden lg:flex md:flex gap-5">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
                <div>
                    <input 
                    onChange={handleSearch}
                    name="search" 
                    type="text" 
                    placeholder="Search meals..." 
                    defaultValue={searchTerm}
                    className="input input-bordered w-24 md:w-auto input-sm" 
                    />
                </div>
            </div>
            

            <div className="navbar-end">
            {
              user?
              <>
              <img className='w-10 h-10 mr-2 rounded-full' src={user.photoURL} alt="" />
              <button onClick={handleLogout} className="btn my-btn text-white">Logout</button>
              </>
               : 
              <Link className='btn my-btn text-white' to="/auth/login">Login</Link>
            }
            </div>
        </div>
    );
};

export default Navbar;