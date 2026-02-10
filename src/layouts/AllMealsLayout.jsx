import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import AllMeals from '../components/AllMeals/AllMeals';
import { Outlet } from 'react-router';
import DynamicTitle from '../components/DynamicTitle/DynamicTitle';

const AllMealsLayout = () => {
    return (
        <div>
            <DynamicTitle></DynamicTitle>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AllMealsLayout;