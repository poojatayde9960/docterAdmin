import React, { useState } from 'react';
import { FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { useForm, useFieldArray } from 'react-hook-form';
import { useAddPlanMutation, useGetPlansQuery } from '../../redux/apis/receptionApi';

const Plans = () => {

    const [AddPlan] = useAddPlanMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: plansData, isLoading, isError } = useGetPlansQuery()
    // Form default values
    const modalDefaultValues = {
        name: '',
        description: '',
        duration: 0,
        durationType: 'month',
        price: 0,
        planFeaturs: ['']
    };

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: modalDefaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "planFeaturs"
    });

    const handleAddPlan = () => {
        reset(modalDefaultValues);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset(modalDefaultValues);
    };

    const onSubmit = async (formData) => {
        try {
            const res = await AddPlan(formData).unwrap();
            console.log("API Response 👉", res);

            alert("Plan added successfully!");
            handleCloseModal();
        } catch (error) {
            console.error("Add plan error 👉", error);
            alert(error?.data?.message || "Something went wrong");
        }
    };
    // Get dynamic plans from API
    const plans = plansData?.Plans || [];

    // Helper function to format duration
    const formatDuration = (duration, durationType) => {
        if (duration === 0) return 'unlimited';
        return `Per ${duration} ${durationType}${duration > 1 ? 's' : ''}`;
    };

    // Helper function to format price
    const formatPrice = (price) => {
        return price === 0 ? 'Rs 0.00' : `Rs ${price}`;
    };

    return <>
        <div className="min-h-screen ">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 mb-1">Subscription Plans</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Healthcare</span>
                            <span>→</span>
                            <span>Plans</span>
                        </div>
                    </div>
                    <button
                        onClick={handleAddPlan}
                        className="flex items-center gap-2 bg-[#2D9AD9] hover:bg-[#2686c0] text-white px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm text-sm font-medium"
                    >
                        <FaPlus className="text-xs" />
                        <span>Add Plan</span>
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D9AD9] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading plans...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-red-600 text-lg mb-2">Failed to load plans</p>
                        <p className="text-gray-600">Please try again later</p>
                    </div>
                </div>
            )}

            {/* Plans Grid */}
            {!isLoading && !isError && plans.length === 0 && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg mb-4">No plans available</p>
                        <p className="text-gray-500">Click "Add Plan" to create your first plan</p>
                    </div>
                </div>
            )}

            {!isLoading && !isError && plans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="bg-white rounded-xl border border-[#00000024] transition-shadow duration-200 p-8 flex flex-col"
                        >
                            {/* Plan Header */}
                            <div className="text-center mb-6 ">
                                <h2 className="text-3xl DM Sans font-medium text-gray-900 mb-3">
                                    {plan.name}
                                </h2>
                                <p className="text-xs  DM Sans  text-[#000000] leading-relaxed min-h-[48px]">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="relative DM Sans -mx-10 mb-6">
                                <div className="bg-[#EAF8FF] w-full px-5 py-4 flex justify-center items-center rounded-lg">
                                    <div className="inline-flex items-baseline justify-center gap-1">
                                        <span className="text-3xl DM Sans font-medium text-gray-900">
                                            {formatPrice(plan.price)}
                                        </span>
                                        <span className="text-xs DM Sans text-[#000000] ">
                                            {formatDuration(plan.duration, plan.durationType)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-8 flex-grow ">
                                <ul className="space-y-2.5">
                                    {plan.planFeaturs?.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-xs text-gray-500"
                                        >
                                            <span className="text-gray-400 mt-0.5 DM Sans">•</span>
                                            <span className="DM Sans">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-auto">
                                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-full transition-colors duration-200 shadow-sm text-sm">
                                    Delete
                                </button>
                                <button className="flex-1 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-medium py-2.5 px-6 rounded-full transition-colors duration-200 shadow-sm text-sm">
                                    Edit Plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Plan Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#2D9AD9] to-[#2686c0] text-white px-8 py-6 flex items-center justify-between rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold">Add New Plan</h2>
                                <p className="text-blue-100 text-sm mt-1">Create a new subscription plan</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                                type="button"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                            {/* Plan Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Plan Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', { required: 'Plan name is required' })}
                                    placeholder="e.g., Free Trial, Basic Plan, Premium Plan"
                                    className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    placeholder="Describe the plan benefits and target audience"
                                    rows="3"
                                    className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800 resize-none"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Duration and Duration Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Duration <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register('duration', {
                                            required: 'Duration is required',
                                            min: { value: 0, message: 'Duration must be 0 or greater' }
                                        })}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                    />
                                    {errors.duration && (
                                        <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Duration Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('durationType', { required: 'Duration type is required' })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                    >
                                        <option value="day">Day</option>
                                        {/* <option value="week">Week</option> */}
                                        <option value="month">Month</option>
                                        <option value="year">Year</option>
                                    </select>
                                    {errors.durationType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.durationType.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price (₹) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0, message: 'Price must be 0 or greater' }
                                    })}
                                    placeholder="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                                )}
                            </div>

                            {/* Plan Features */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Plan Features <span className="text-red-500">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => append('')}
                                        className="text-[#2D9AD9] hover:text-[#2686c0] text-sm font-medium flex items-center gap-1"
                                    >
                                        <FaPlus className="text-xs" />
                                        Add Feature
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2">
                                            <input
                                                {...register(`planFeaturs.${index}`, {
                                                    required: 'Feature cannot be empty'
                                                })}
                                                placeholder={`Feature ${index + 1}`}
                                                className="flex-1 px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                            />
                                            {fields.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.planFeaturs && (
                                    <p className="text-red-500 text-sm mt-1">Please add at least one feature</p>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-[#2D9AD9] to-[#2686c0] text-white rounded-lg hover:shadow-lg hover:shadow-[#2D9AD9]/30 font-medium transition-all duration-200 transform hover:scale-105"
                                >
                                    Add Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    </>
};

export default Plans;
