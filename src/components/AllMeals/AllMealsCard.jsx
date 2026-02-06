import React from 'react';
import star from '../../assets/stars.png';
import halfStar from '../../assets/halfstar.png';

const AllMealsCard = ({meal}) => {

    const {_id,chefName,foodImage,foodPrice,foodRating,deliveryArea,foodName,ingredients,estimatedDeliveryTime,
    chefsExperience,foodDetails}=meal;

    const chefId=_id.split('c')[0];

    return (
        <div className="card bg-base-100 w-full mx-auto shadow-sm h-full">
            <figure>
                <img
                className='h-[250px] w-full object-cover'
                src={foodImage}
                alt="" />
            </figure>
            <div className="card-body flex flex-col grow">
                <div className='grow space-y-1'>
                    <h2 className="card-title font-bold">{foodName}</h2>
                    <h2 className='text-[14px] md:text-[16px] lg:text-[16px]'>By {chefName}</h2>
                    <h3 className='text-[14px] md:text-[16px] lg:text-[16px]'>Chef ID: {chefId}</h3>
                    <h3 className='text-[14px] md:text-[16px] lg:text-[16px]'>TK {foodPrice}</h3>
                </div>
                <div className='flex gap-1'>
                    <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                    <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                    <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                    <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={star} alt="" />
                    <img className='w-3.5 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6' src={halfStar} alt="" />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    );
};

export default AllMealsCard;