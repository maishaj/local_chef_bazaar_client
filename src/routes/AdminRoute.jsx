import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading/Loading';

const AdminRoute = ({children}) => {

    const {user,loading}=useAuth();
    const {role,roleLoading}=useRole();
    const location=useLocation();

    if(loading || roleLoading)
    {
        return <Loading></Loading>
    }
    if(user && role === "admin")
    {
        return children;
    }

    return <Navigate to="/" state={location.pathname}></Navigate>
};

export default AdminRoute;