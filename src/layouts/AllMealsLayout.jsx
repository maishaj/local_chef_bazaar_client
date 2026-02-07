import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import AllMeals from '../components/AllMeals/AllMeals';
import { Outlet } from 'react-router';

const AllMealsLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AllMealsLayout;