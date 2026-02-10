import React from 'react';
import { Outlet } from 'react-router';
import Register from '../components/Register/Register';
import DynamicTitle from '../components/DynamicTitle/DynamicTitle';

const AuthLayout = () => {
    return (
        <div>
            <DynamicTitle></DynamicTitle>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;