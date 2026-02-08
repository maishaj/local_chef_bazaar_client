import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyOrdersCard = ({order}) => {

    const axiosSecure=useAxiosSecure()

    const {mealName,price,quantity,foodId,chefId,paymentStatus,chefName,deliveryTime,userEmail,userAddress,orderStatus}=order;

    const handlePayment=async()=>{
        const paymentInfo={
            foodId:foodId,
            mealName:mealName,
            price:price,
            quantity:quantity,
            userEmail:userEmail
        }
        const res=await axiosSecure.post('/create-checkout-session',paymentInfo);
        window.location.href= res.data.url;

    }
    
    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all">
                <div className="card-body p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-xl font-bold text-primary">{mealName}</h2>
                        <div className={`badge ${orderStatus === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
                            {orderStatus}
                        </div>
                    </div>

                    <div className="divider my-2"></div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Chef:</span>
                            <span className="font-medium text-right">{chefName} (ID: {chefId})</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Ordered:</span>
                            <span className="font-medium">{deliveryTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Quantity:</span>
                            <span className="font-medium">x{quantity}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-500">Payment:</span>
                            <span className={`font-bold ${paymentStatus === 'Pending' ? 'text-error' : 'text-success'}`}>
                                {paymentStatus}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <p className="text-2xl font-bold text-secondary">TK {price * quantity}</p>
                        <div className="card-actions">
                            {paymentStatus === 'Pending' && (
                                <button onClick={handlePayment} className="btn btn-primary btn-sm px-6">Pay</button>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default MyOrdersCard;