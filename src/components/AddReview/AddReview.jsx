import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import star from '../../assets/stars.png';
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast';

const AddReview = ({ foodName }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { refetch, data: reviews = [] } = useQuery({
        queryKey: ['review', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${id}`);
            return res.data;
        }
    });

    const handleReview = async () => {
        if (!review.trim()) return toast.error("Please share your thoughts first!");
        
        setIsSubmitting(true);
        const reviewData = {
            foodId: id,
            foodName: foodName,
            reviewerName: user?.displayName,
            reviewerEmail: user?.email,
            reviewerImage: user?.photoURL,
            rating: rating,
            comment: review,
            date: new Date()
        };

        try {
            const res = await axiosSecure.post('/reviews', reviewData);
            if (res.data.insertedId) {
                refetch();
                setReview("");
                setRating(5);
                toast.success("Feedback submitted successfully!");
            }
        } catch (error) {
            toast.error("Failed to post review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16'>
            <div className="flex flex-col lg:flex-row gap-12">
                
               
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 border-b border-base-200 pb-4">
                        <h2 className="text-2xl font-extrabold tracking-tight text-base-content">
                            Guest Feedback
                        </h2>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
                            {reviews?.length || 0} Reviews
                        </span>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-base-100 border-2 border-dashed border-base-300 rounded-3xl">
                            <p className="text-base-content/50 font-medium">No reviews yet for {foodName}.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((rev, index) => (
                                <div key={index} className="group p-6 bg-base-100 border border-base-200 rounded-2xl transition-all duration-300 hover:border-emerald-200 hover:shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-xl">
                                                    <img src={rev.reviewerImage} alt={rev.reviewerName} />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base-content">{rev.reviewerName}</h4>
                                                <div className="flex gap-0.5 my-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <img 
                                                            key={i} 
                                                            src={star} 
                                                            className={`w-3 h-3 ${i >= rev.rating ? 'opacity-20 grayscale' : ''}`} 
                                                            alt="star" 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-base-content/40">
                                            {new Date(rev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-base-content/70 leading-relaxed italic text-[15px]">
                                        "{rev.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

              
                <div className="lg:w-[400px]">
                    <div className="sticky top-10 bg-base-100 border border-base-200 shadow-xl shadow-base-300/20 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-base-content mb-1">Rate your experience</h3>
                        <p className="text-sm text-base-content/50 mb-6">Your feedback helps others make better choices.</p>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Quality Rating</label>
                                <div className="rating rating-md w-full justify-between bg-base-200/50 p-3 rounded-xl border border-base-200">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <input 
                                            key={num}
                                            type="radio" 
                                            name="rating-input" 
                                            className="mask mask-star-2 bg-orange-400 transition-transform active:scale-90" 
                                            checked={rating === num}
                                            onChange={() => setRating(num)} 
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-2 block">Review Details</label>
                                <textarea 
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)} 
                                    className="textarea textarea-bordered w-full h-36 bg-base-50 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all rounded-xl text-base" 
                                    placeholder="Tell us what you loved (or didn't)..."
                                ></textarea>
                            </div>

                            <button 
                                onClick={handleReview} 
                                disabled={isSubmitting}
                                className={`btn w-full border-none text-white font-bold h-12 rounded-xl transition-all duration-300
                                    ${isSubmitting ? 'bg-gray-400' : 'bg-[#059669] hover:bg-[#047857] shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40'}
                                `}
                            >
                                {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Post Review"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddReview;