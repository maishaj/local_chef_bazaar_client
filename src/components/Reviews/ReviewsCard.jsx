import React from 'react';
import star from '../../assets/stars.png';
import halfStar from '../../assets/halfstar.png'

const ReviewsCard = ({review}) => {

    const {reviewerName,reviewerImage,comment,date}=review;
    const newDate=date.split('T')[0];
    
    return (
        <div className='w-4/5 space-y-3 shadow-lg p-12 rounded-xl m-10'>
            <img className='w-20 h-20 rounded-full' src={reviewerImage} alt="" />
            <p>{comment}</p>
            <h2>{reviewerName}</h2>
            <div className='flex gap-1'>
                <img className='w-6 h-6' src={star} alt="" />
                <img className='w-6 h-6' src={star} alt="" />
                <img className='w-6 h-6' src={star} alt="" />
                <img className='w-6 h-6' src={star} alt="" />
                <img className='w-6 h-6' src={halfStar} alt="" />
            </div>
            <h2>{newDate}</h2>
        </div>
    );
};

export default ReviewsCard;