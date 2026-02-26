import React, { useState } from "react";
import logoImg from "../../assets/local_chef_bazaar_logo.png";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(null);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
      toast.success("You logged out successfully");
    });
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      navigate(`/meals?search=${searchText}`);
    }, 500);
    setTimer(newTimer);
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/meals">Meals</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      {
        user &&  <li><NavLink to="/contact">Contact Us</NavLink></li>
      }
      <li><NavLink to="/terms-and-conditions">Terms</NavLink></li>
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
      <li className="lg:hidden mt-2">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          defaultValue={searchTerm}
          className="input input-bordered input-sm w-full"
        />
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-4 sticky top-0 z-50">
      {/* Navbar Start: Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow border border-base-200">
            {links}
          </ul>
        </div>
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-1 md:gap-2 ml-1">
          <img src={logoImg} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <span className="font-bold text-sm md:text-xl">Chef Bazaar</span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Links and Desktop Search */}
      <div className="navbar-center hidden lg:flex items-center gap-4">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {links}
        </ul>
        <div className="relative">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search meals..."
            defaultValue={searchTerm}
            className="bg-base-300 text-base-content/60 placeholder:text-base-content/40 input input-bordered input-sm w-48 focus:w-64 transition-all duration-300"
          />
        </div>
      </div>

      {/* Navbar End: Theme Toggle and Profile */}
      <div className="navbar-end gap-2">
        <div className="scale-90 md:scale-100">
          <ThemeToggle />
        </div>

        {user ? (
        
          <div className="dropdown dropdown-end">
           
            <div 
              tabIndex={0} 
              role="button" 
              className="avatar btn btn-ghost btn-circle"
            >
              <div className="w-9 rounded-full ring-2 ring-[#f97416] ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" />
              </div>
            </div>

           
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-40 p-2 shadow-2xl border border-base-300"
              style={{ fontFamily: '"Roboto Slab", serif' }}
            >
              <li className="mt-2">
                <Link to="/dashboard/my-profile" className="hover:text-[#f97416] py-2">
                  My Profile
                </Link>
              </li>

              <li className="p-1">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-sm my-btn text-white border-none w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
         
          <Link 
            className="btn btn-xs md:btn-sm my-btn text-white border-none" 
            to="/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;