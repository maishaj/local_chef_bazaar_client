import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Meals from '../components/MealsPage/Meals';
import Reviews from '../components/Reviews/Reviews';
import Newsletter from '../components/Newsletter/Newsletter';

const RootLayout = () => {
    return (
        <div className='w-full mx-auto'>
            <Navbar></Navbar>
            <Hero></Hero>
            <Meals></Meals>
            <Reviews></Reviews>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;