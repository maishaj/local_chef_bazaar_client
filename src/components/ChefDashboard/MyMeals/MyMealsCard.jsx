import React, { useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const MyMealsCard = ({ meal, refetch }) => {
    const modalRef = useRef();
    const axiosSecure = useAxiosSecure();

    const { reset, register, handleSubmit } = useForm({
        values: {
            mealName: meal.foodName,
            chefName: meal.chefName,
            price: meal.foodPrice,
            rating: meal.foodRating,
            ingredients: meal.ingredients?.join(', '),
            details: meal.foodDetails,
            deliveryArea: meal.deliveryArea,
            deliveryTime: meal.estimatedDeliveryTime,
            experience: meal.chefsExperience
        }
    });

    const handleUpdate = async (data) => {
        const toastId = toast.loading("Saving changes...");
        try {
            const updatedInfo = {
                mealName: data.mealName,
                chefName: data.chefName,
                price: parseFloat(data.price),
                rating: data.rating,
                ingredients: typeof data.ingredients === 'string'
                    ? data.ingredients.split(',').map(i => i.trim()).filter(i => i !== "")
                    : data.ingredients,
                details: data.details,
                deliveryArea: data.deliveryArea,
                deliveryTime: data.deliveryTime,
                experience: data.experience
            };

            const res = await axiosSecure.patch(`/meals/${meal._id}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                refetch();
                modalRef.current.close();
                toast.success("Updated successfully!", { id: toastId });
            } else {
                toast.dismiss(toastId);
                modalRef.current.close();
            }
        } catch (error) {
            toast.error("Save failed", { id: toastId });
        }
    };

    const handleDelete = () => {
        Swal.fire({
            title: "Delete Meal?",
            text: "Are you sure? This cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it",
            // Dark mode support for SweetAlert
            background: 'var(--fallback-b1,oklch(var(--b1)))',
            color: 'var(--fallback-bc,oklch(var(--bc)))'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/meals/${meal._id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            refetch();
                            toast.success("Meal deleted!");
                        }
                    })
            }
        })
    }

    return (
        <div className="group h-full">
            <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden h-full flex flex-col">
                {/* IMAGE SECTION */}
                <figure className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={meal.foodImage} alt={meal.foodName} />
                    <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur px-3 py-1 rounded-full text-primary font-black text-sm shadow-sm">
                        TK {meal.foodPrice}
                    </div>
                </figure>

                {/* BODY SECTION */}
                <div className="p-5 flex flex-col grow">
                    <div className="grow">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-lg font-black text-base-content leading-tight">{meal.foodName}</h2>
                            <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
                                <FaStar /> {meal.foodRating}
                            </div>
                        </div>

                        {/* INGREDIENTS */}
                        <div className="flex flex-wrap gap-1 mb-4">
                            {meal.ingredients?.slice(0, 3).map((ind, index) => (
                                <span key={index} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                    {ind}
                                </span>
                            ))}
                            {meal.ingredients?.length > 3 && <span className="text-[10px] text-base-content/50 font-bold">+{meal.ingredients.length - 3} more</span>}
                        </div>

                        {/* INFO LIST */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-xs text-base-content/60 italic">
                                <span className="w-5 text-primary"><FaClock /></span>
                                <span>{meal.estimatedDeliveryTime} mins delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-base-content/60 italic">
                                <span className="w-5 text-primary"><FaMapMarkerAlt /></span>
                                <span>{meal.deliveryArea}</span>
                            </div>
                            <p className="text-[11px] text-base-content/40 mt-2">Chef: <span className="font-bold text-base-content/70">{meal.chefName}</span></p>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-base-200">
                        <button onClick={() => modalRef.current.showModal()} className="btn btn-sm bg-primary/10 text-primary border-none hover:bg-primary hover:text-white rounded-xl font-bold">
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button onClick={handleDelete} className="btn btn-sm bg-error/10 text-error border-none hover:bg-error hover:text-white rounded-xl font-bold">
                            <FaTrashAlt className="mr-1" /> Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* UPDATE MODAL */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl p-8 max-w-2xl bg-base-100 border border-base-300">
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl"><FaEdit size={24}/></div>
                            <div>
                                <h3 className="text-xl font-black text-base-content">Update Meal Details</h3>
                                <p className="text-xs text-base-content/50 italic">Keep your customers updated with the latest info.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label-text mb-1 font-bold text-base-content/70 ml-1">Meal Name</label>
                                <input type="text" className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 ring-primary text-base-content" {...register("mealName", { required: true })} />
                            </div>
                            <div className="form-control">
                                <label className="label-text mb-1 font-bold text-base-content/70 ml-1">Price (TK)</label>
                                <input type="number" className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 ring-primary text-base-content" {...register("price", { required: true })} />
                            </div>
                            <div className="form-control">
                                <label className="label-text mb-1 font-bold text-base-content/70 ml-1">Delivery Time (Mins)</label>
                                <input type="text" className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 ring-primary text-base-content" {...register("deliveryTime", { required: true })} />
                            </div>
                            <div className="form-control">
                                <label className="label-text mb-1 font-bold text-base-content/70 ml-1">Rating</label>
                                <input type="text" className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 ring-primary text-base-content" {...register("rating", { required: true })} />
                            </div>
                            <div className="form-control md:col-span-2 flex flex-col">
                                <label className="label-text mb-1 font-bold text-base-content/70 ml-1">Ingredients</label>
                                <input type="text" className="input input-bordered rounded-xl bg-base-200 border-none focus:ring-2 ring-primary text-base-content" {...register("ingredients")} placeholder="Tomato, Cheese, Basil" />
                            </div>
                            <div className="form-control md:col-span-2 flex flex-col">
                                <label className="label-text mb-1 font-bold text-base-content/70 ml-1">Meal Details</label>
                                <textarea className="textarea textarea-bordered rounded-xl bg-base-200 border-none focus:ring-2 ring-primary h-24 text-base-content" {...register("details")}></textarea>
                            </div>
                        </div>

                        <div className="modal-action gap-3">
                            <button type="button" className="btn btn-ghost rounded-xl font-bold text-base-content/50" onClick={() => modalRef.current.close()}>Discard</button>
                            <button type="submit" className="btn btn-primary border-none rounded-xl px-8 font-black shadow-lg shadow-primary/20">Save Changes</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="cursor-default">close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyMealsCard;