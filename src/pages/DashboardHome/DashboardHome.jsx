import React from 'react';
import useRole from '../../hooks/useRole';
import Loading from '../../shared/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import ChefDashboardHome from './ChefDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const {role,roleLoading}=useRole();

    if(roleLoading)
        return <Loading></Loading>
    if(role=="admin")
        return <AdminDashboardHome></AdminDashboardHome>
    else if (role=="chef")
        return <ChefDashboardHome></ChefDashboardHome>
    else if(role=="user")
        return <UserDashboardHome></UserDashboardHome>

};

export default DashboardHome;