import React, { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyReviews = () => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const modalRef=useRef();
    const [rev,setRev]=useState(null);

    const {data:reviews=[],refetch}=useQuery({
        queryKey:['reviews',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/reviews/${user?.email}`);
            return res.data;
        }
    })

    const handleUpdate=(e)=>{
        e.preventDefault();
        const form = e.target;
        const rating = form.rating.value;
        const comment = form.comment.value;
        const updatedReview ={ rating, comment };
        axiosSecure.patch(`/reviews/update/${rev._id}`,updatedReview)
        .then((res)=>{
            if(res.data.modifiedCount){
                refetch();
                toast.success("Your review is updated successfully!");
                modalRef.current.close()
            }
        })
    }

    const modalOpen=(review)=>{
        setRev(review);
        modalRef.current.showModal();
    }

    const handleDelete=(id)=>{
        Swal.fire({
        text: "Do you want to remove this review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes"
        }).then((result) =>{
             if (result.isConfirmed) {
            axiosSecure.delete(`/reviews/${id}`)
            .then((res)=>{
                refetch();
                toast.success("Your review is removed successfully!");
            })
          }
        })
    }
               

    return (
       <div className='w-10/12 mx-auto'>
           <h1 className='text-3xl text-center font-bold mb-5'>My <span className='text-primary'>Reviews</span></h1>
           <div>
            {
                reviews.map(review => (
                    <div key={review._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all m-5">
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="card-title text-xl font-bold text-primary">
                                        {review.foodName || "Unknown Meal"}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Added on: {new Date(review.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="badge badge-secondary font-bold p-3 flex">
                                    <span>⭐</span> <span>{review.rating}/5</span>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="space-y-2">
                                <p className="text-gray-600 italic">
                                    "{review.comment}"
                                </p>
                            </div>

                            <div className="flex justify-end items-center mt-6 gap-3">
                                {/* update btn */}
                                <button  className="btn btn-outline btn-error btn-sm px-4" onClick={()=>modalOpen(review)}>Update</button>
                                    <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Update Review</h3>
                                        <form onSubmit={handleUpdate}>
                                        <div className="py-4 space-y-3">
                                            <input type="number" name="rating" placeholder="Rating (1-5)" className="input input-bordered w-full" defaultValue={review.rating} />
                                            <textarea name="comment" className="textarea textarea-bordered w-full" defaultValue={review.comment}></textarea>
                                        </div>
                                        <div className="modal-action">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                            <button type="button" className="btn" onClick={() => modalRef.current.close()}>Cancel</button>
                                        </div>
                                        </form>
                                    </div>
                                    </dialog>
                                {/* delete btn */}
                                <button
                                    onClick={() => handleDelete(review._id)} 
                                    className="btn btn-outline btn-error btn-sm px-4">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
       </div>
    );
};

export default MyReviews;