import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyOrdersCard = ({order}) => {
    const axiosSecure = useAxiosSecure();
    const {mealName,price,quantity,foodId,chefId,paymentStatus,chefName,deliveryTime,userEmail,userAddress,orderStatus,orderTime} = order;

    const handlePayment = async() => {
        const paymentInfo = {
            orderId: order._id, 
            foodId: foodId,
            mealName: mealName,
            price: price,
            quantity: quantity,
            userEmail: userEmail
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    }
    
    return (
      
        <div className="card bg-base-200 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
            <div className="card-body p-6">
                <div className="flex justify-between items-start">
                    <div>
                       
                        <h2 className="card-title text-xl font-bold text-primary">{mealName}</h2>
                        <h2 className='font-semibold text-base-content/80 text-sm'>{orderTime}</h2>
                    </div>
                    <div className={`badge ${orderStatus === 'Pending' ? 'badge-warning' : 'badge-success'} font-bold`}>
                        {orderStatus}
                    </div>
                </div>

                <div className="divider my-2 opacity-50"></div>

                <div className="space-y-2 text-sm">
                    
                    <div className="flex justify-between">
                        <span className="text-base-content/60">Chef:</span>
                        <span className="font-medium text-base-content text-right">{chefName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-base-content/60">Ordered:</span>
                        <span className="font-medium text-base-content">{deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-base-content/60">Quantity:</span>
                        <span className="font-medium text-base-content">x{quantity}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-base-content/60">Payment:</span>
                       
                        <span className={`font-bold ${paymentStatus === 'Pending' ? 'text-error' : 'text-success'}`}>
                            {paymentStatus}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    
                    <p className="text-2xl font-bold text-primary">TK {price * quantity}</p>
                    <div className="card-actions">
                        {paymentStatus === 'Pending' && orderStatus === "Accepted" && (
                            <button onClick={handlePayment} className="btn btn-primary btn-sm px-6 shadow-lg">Pay</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrdersCard;