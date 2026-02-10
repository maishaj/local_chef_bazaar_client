import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {loading,user}=useAuth();

    useEffect(() => {
    if (sessionId && !loading && user?.accessToken) {
      axiosSecure.post("/confirm-payment", { sessionId })
        .then((res) => {
          if (res.data.success) {
            Swal.fire("Paid!", "Your order is now processing.", "success");
          }
        })
    }
  }, [sessionId, axiosSecure,loading,user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4">Your order has been sent to the chef.</p>
        <button onClick={() => navigate("/dashboard/my-orders")} className="btn btn-primary mt-6">
            View My Orders
        </button>
        </div>
    );
};

export default PaymentSuccess;