import React from 'react';
import { NavLink, Link, Outlet } from 'react-router';
import logoImg from '../assets/local_chef_bazaar_logo.png';
import { FaUserAlt, FaComment, FaHeart, FaUserCog } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuMessageSquareQuote } from "react-icons/lu";
import { FcStatistics } from "react-icons/fc";
import DynamicTitle from '../components/DynamicTitle/DynamicTitle';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { role } = useRole();

    // Reusable styles for NavLinks
    const navLinkStyles = ({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
        ${isActive 
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
            : 'hover:bg-emerald-500/10 hover:text-emerald-600 text-base-content/70'
        }
        is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-emerald
    `;

    return (
        <div className="bg-base-100 min-h-screen">
            <DynamicTitle />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-100 border-b border-base-300 px-4">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1">
                            <Link to="/" className="flex items-center gap-2">
                                <img src={logoImg} className='w-10 h-10' alt="logo"/>
                                <span className='font-black text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
                                    Chef Bazaar
                                </span>
                            </Link>
                        </div>
                    </nav>

                    {/* Content Section */}
                    <main className="p-6 bg-base-200/30 flex-grow">
                        <Outlet />
                    </main>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col bg-base-100 border-r border-base-300 w-64 lg:w-72">
                        
                        <div className="p-6 mb-2">
                             <p className="text-[20px] uppercase tracking-[0.2em] font-bold text-base-content/40">Menu</p>
                        </div>

                        <ul className="menu w-full px-4 space-y-2 grow">
                            <li>
                                <NavLink to="/dashboard" end className={navLinkStyles} data-tip="Homepage">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className=" font-medium">Homepage</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/my-profile" className={navLinkStyles} data-tip="My Profile">
                                    <FaUserAlt className="size-4" />
                                    <span className="font-medium">My Profile</span>
                                </NavLink>
                            </li>

                            <div className="divider opacity-50 text-[10px] uppercase font-bold">Role Access</div>

                            {role === "user" && (
                                <>
                                    <li><NavLink to="/dashboard/my-orders" className={navLinkStyles} data-tip="My Orders"><IoBagSharp className="size-5" /> <span>My Orders</span></NavLink></li>
                                    <li><NavLink to="/dashboard/my-reviews" className={navLinkStyles} data-tip="My Reviews"><FaComment className="size-5" /> <span>My Reviews</span></NavLink></li>
                                    <li><NavLink to="/dashboard/my-favourites" className={navLinkStyles} data-tip="My Favourites"><FaHeart className="size-5" /> <span>My Favourites</span></NavLink></li>
                                </>
                            )}

                            {role === "chef" && (
                                <>
                                    <li><NavLink to="/dashboard/create-meal" className={navLinkStyles} data-tip="Create Meal"><IoIosAddCircle className="size-5" /> <span>Create Meal</span></NavLink></li>
                                    <li><NavLink to="/dashboard/my-meal" className={navLinkStyles} data-tip="My Meals"><GiMeal className="size-5" /> <span>My Meals</span></NavLink></li>
                                    <li><NavLink to="/dashboard/order-request" className={navLinkStyles} data-tip="Order Requests"><TbTruckDelivery className="size-5" /> <span>Order Requests</span></NavLink></li>
                                </>
                            )}

                            {role === "admin" && (
                                <>
                                    <li><NavLink to="/dashboard/manage-users" className={navLinkStyles} data-tip="Manage Users"><FaUserCog className="size-5" /> <span>Manage Users</span></NavLink></li>
                                    <li><NavLink to="/dashboard/manage-requests" className={navLinkStyles} data-tip="Manage Request"><LuMessageSquareQuote className="size-5" /> <span>Manage Request</span></NavLink></li>
                                    <li><NavLink to="/dashboard/platform-statistics" className={navLinkStyles} data-tip="Statistics"><FcStatistics className="size-5" /> <span>Platform Statistics</span></NavLink></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;