import React from 'react';
import logoImg from '../../assets/local_chef_bazaar_logo.png'
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {

    const {user,logOut}=useAuth();
    const navigate=useNavigate();

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
            <a className="btn btn-ghost text-xl"><img src={logoImg} className='w-15 h-15' />Chef Bazaar</a>
            </div>

            <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {links}
            </ul>
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