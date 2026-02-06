import React from 'react';
import { Outlet } from 'react-router';
import Register from '../components/Register/Register';

const AuthLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;