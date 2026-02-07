import React, { use } from 'react';
import star from '../../assets/stars.png';
import halfStar from '../../assets/halfstar.png';
import { Link } from 'react-router';

const MealsCard = ({meal}) => {

    const {_id,chefName,foodImage,foodPrice,foodRating,deliveryArea,foodName}=meal;
    return (
            <div className="card bg-base-100 w-4/5 mx-auto shadow-sm h-[350px]">
                <figure>
                    <img
                    className='h-[250px] w-full object-cover'
                    src={foodImage}
                    alt="" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{foodName}</h2>
                    <h3 className='text-xl'>TK {foodPrice}</h3>
                    <div className='flex gap-1'>
                        <img className='w-6 h-6' src={star} alt="" />
                        <img className='w-6 h-6' src={star} alt="" />
                        <img className='w-6 h-6' src={star} alt="" />
                        <img className='w-6 h-6' src={star} alt="" />
                        <img className='w-6 h-6' src={halfStar} alt="" />
                    </div>
                    <div className="card-actions justify-end">
                    <Link to={`/meals/meal-details/${_id}`} className="btn btn-primary">Details</Link>
                    </div>
                </div>
            </div>
    );
};

export default MealsCard;