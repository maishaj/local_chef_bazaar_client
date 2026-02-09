import React from 'react';
import { Link, Outlet } from 'react-router';
import logoImg from '../assets/local_chef_bazaar_logo.png';
import { FaUserAlt } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { FaComment } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import useRole from '../hooks/useRole';
import { IoIosAddCircle } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { LuMessageSquareQuote } from "react-icons/lu";
import { FcStatistics } from "react-icons/fc";


const DashboardLayout = () => {

    const {role}=useRole();

    return (
        <div>
            <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                    {/* Sidebar toggle icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                </label>
                <Link to="/" className="px-4 flex gap-2 justify-center items-center">
                    <img src={logoImg} className='w-12 h-12'/>
                    <h1 className='font-bold'>Chef Bazaar</h1>
                </Link>
                </nav>
                {/* Page content here */}
                <div className="p-4"><Outlet></Outlet></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                {/* Sidebar content here */}
                <ul className="menu w-full grow">
                    {/* List item */}
                    {/* Homepage */}
                    <li>
                        <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                            {/* Home icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                            <span className="is-drawer-close:hidden">Homepage</span>
                        </Link>
                    </li>
                    {/* My Profile */}
                    <li>
                        <Link to="/dashboard/my-profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                            <FaUserAlt />
                            <span className="is-drawer-close:hidden">My Profile</span>
                        </Link>
                    </li>
                    {
                        role==="user" &&
                        <li>
                            <Link to="/dashboard/my-orders" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Orders">
                                <IoBagSharp />
                                <span className="is-drawer-close:hidden">My Orders</span>
                            </Link>
                            <Link to="/dashboard/my-reviews" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Reviews">
                                <FaComment />
                                <span className="is-drawer-close:hidden">My Reviews</span>
                            </Link>
                            <Link to="/dashboard/my-favourites" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Favourites">
                                <FaHeart />
                                <span className="is-drawer-close:hidden">My Favourites</span>
                            </Link>
                        </li>
                    }
                    {
                        role==="chef" &&
                        <li>
                            <Link to="/dashboard/create-meal" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create Meal">
                                <IoIosAddCircle/>
                                <span className="is-drawer-close:hidden">Create Meal</span>
                            </Link>
                            <Link to="/dashboard/my-meal" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Meals">
                                <GiMeal />
                                <span className="is-drawer-close:hidden">My Meals</span>
                            </Link>
                            <Link to="/dashboard/order-request" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Order Requests">
                                <TbTruckDelivery />
                                <span className="is-drawer-close:hidden">Order Requests</span>
                            </Link>
                        </li>
                    }
                    {
                        role==="admin" &&
                        <li>
                            <Link to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                <FaUserCog />
                                <span className="is-drawer-close:hidden">Manage Users</span>
                            </Link>
                            <Link to="/dashboard/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Request">
                                <LuMessageSquareQuote />
                                <span className="is-drawer-close:hidden">Manage Request</span>
                            </Link>
                            <Link to="/dashboard/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Platform Statistics">
                                <FcStatistics />
                                <span className="is-drawer-close:hidden">Platform Statistics</span>
                            </Link>
                        </li>
                    }

                </ul>
                </div>
            </div>
            </div>
        </div>
    );
};

export default DashboardLayout;