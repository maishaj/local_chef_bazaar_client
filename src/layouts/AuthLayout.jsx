import React from 'react';
import { Outlet } from 'react-router';
import Register from '../components/Register/Register';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;