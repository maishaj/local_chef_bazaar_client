import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const OrderRequests = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();

    return (
        <div>
            
        </div>
    );
};

export default OrderRequests;