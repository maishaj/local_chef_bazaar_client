import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { useLocation } from 'react-router';
import Loading from '../shared/Loading/Loading';

const UserRoute = ({children}) => {
    const {user,loading}=useAuth();
    const {role,roleLoading}=useRole();
    const location=useLocation();

    if(loading || roleLoading)
    {
        return <Loading></Loading>
    }
    if(user && role === "user")
    {
        return children;
    }

    return <Navigate to="/" state={location.pathname}></Navigate>
};

export default UserRoute;