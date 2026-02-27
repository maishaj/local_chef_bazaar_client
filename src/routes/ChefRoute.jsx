import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { useLocation } from 'react-router';

const ChefRoute = ({children}) => {
    const {user,loading}=useAuth();
    const {role,roleLoading}=useRole();
    const location=useLocation();

    if(loading || roleLoading)
    {
        return <Loading></Loading>
    }
    if(user && role === "chef")
    {
        return children;
    }

    return <Navigate to="/" state={location.pathname}></Navigate>
};

export default ChefRoute;