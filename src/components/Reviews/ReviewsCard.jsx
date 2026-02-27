import React from 'react';
import star from '../../assets/stars.png';
import halfStar from '../../assets/halfstar.png';

const ReviewsCard = ({ review }) => {
    const { reviewerName, reviewerImage, comment, date, rating = 4.5 } = review;
    
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className='bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring-2 ring-emerald-500/10">
                            <img src={reviewerImage} alt={reviewerName} />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold text-base-content leading-none'>{reviewerName}</h3>
                        <span className='text-[12px] text-base-content/50 font-medium'>{formattedDate}</span>
                    </div>
                </div>

                {/* Rating Badge */}
                <div className='flex items-center bg-emerald-50 px-2 py-1 rounded-lg gap-1'>
                    <img className='w-3 h-3' src={star} alt="rating" />
                    <span className='text-xs font-bold text-emerald-700'>{rating}</span>
                </div>
            </div>

            {/* Comment Section */}
            <div className='relative'>
                {/* Optional: Decorative Quote Mark */}
                <span className="absolute -top-2 -left-1 text-4xl text-base-content/5 opacity-20">"</span>
                <p className='text-base-content/80 text-sm leading-relaxed italic'>
                    {comment}
                </p>
            </div>

            {/* Footer Stars */}
            <div className='flex gap-0.5 mt-5 pt-4 border-t border-base-100'>
                {[...Array(5)].map((_, i) => {
                    const isFull = i + 1 <= Math.floor(rating);
                    const isHalf = !isFull && i < rating;
                    return (
                        <img 
                            key={i} 
                            className='w-4 h-4' 
                            src={isFull ? star : (isHalf ? halfStar : star)} 
                            style={{ filter: isFull || isHalf ? 'none' : 'grayscale(100%) opacity(20%)' }}
                            alt="star" 
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewsCard;