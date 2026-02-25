import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import About from '../components/About/About';
import Footer from '../shared/Footer/Footer';

const AboutLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <About></About>
            <Footer></Footer>
        </div>
    );
};

export default AboutLayout;