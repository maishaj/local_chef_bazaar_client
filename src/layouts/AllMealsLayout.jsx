import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import AllMeals from '../components/AllMeals/AllMeals';

const AllMealsLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AllMeals></AllMeals>
            <Footer></Footer>
        </div>
    );
};

export default AllMealsLayout;