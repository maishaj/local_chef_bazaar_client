import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import star from '../../assets/stars.png';
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const AddReview = ({foodName}) => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {id}=useParams();
    const {reset}=useForm();

    const [review,setReview]=useState("");
    const [rating,setRating]=useState(5);


    const {refetch,data:reviews=[]}=useQuery({
        queryKey: ['review',id],
        queryFn: async()=>{
           const res=await axiosSecure.get(`/review/${id}`);
           return res.data;
        }
    })

    const handleReview=()=>{
        const reviewData={
            foodId:id,
            foodName:foodName,
            reviewerName:user.displayName,
            reviewerEmail:user.email,
            reviewerImage:user.photoURL,
            rating:rating,
            comment:review,
            date:new Date
        }

        axiosSecure.post('/reviews',reviewData)
        .then((res)=>{
            if(res.data.insertedId){
            refetch();
            setReview("");
            setRating(5);
            reset();
            toast.success("Thanks for your feedback");
            }
        })
    }

    return (
        <div className='w-10/12 mx-auto m-10'>
           
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    Customer Reviews <div className="badge badge-ghost">{reviews?.length || 0}</div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews?.map((review, index) => (
                        <div key={index} className="card bg-base-100 border border-base-200 shadow-sm">
                            <div className="card-body p-6">
                                <div className="flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={review.reviewerImage} alt={review.reviewerName} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg leading-tight">{review.reviewerName}</h4>
                                        <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <img 
                                            key={i} 
                                            src={star} 
                                            className={`w-4 h-4 ${i >= review.rating ? 'grayscale opacity-30' : ''}`} 
                                            alt="rating" 
                                        />
                                    ))}
                                </div>

                                <p className="mt-3 text-sm text-gray-600 italic">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col mt-6'>
                    <textarea onChange={(e)=>setReview(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Write your review here..."></textarea>
                    <div className="rating rating-md mt-4">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(1)} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(2)} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(3)} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(4)} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked onChange={() => setRating(5)} />
                    </div>
                    <button onClick={handleReview} className='w-1/2 btn btn-primary text-white m-5 md:w-1/8 lg:w-1/8'>Give Review</button>
                </div>
            </div>
        </div>
    );
};

export default AddReview;