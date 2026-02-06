import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer/Footer';
import Hero from '../components/Hero/Hero';

const RootLayout = () => {
    return (
        <div className='w-full mx-auto'>
            <Navbar></Navbar>
            <Hero></Hero>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;