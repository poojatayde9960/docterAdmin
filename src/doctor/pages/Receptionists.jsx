import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import { useAddReceptionMutation, useGetReceptionQuery } from '../../redux/apis/receptionApi';

const Receptionists = () => {
    const [addReception] = useAddReceptionMutation();
    const { data, isLoading, isError, refetch } = useGetReceptionQuery();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Form default values
    const modalDefaultValues = {
        name: '',
        email: '',
        password: '',
        contact: '',
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: modalDefaultValues,
    });

    const handleAddReceptionist = () => {
        reset(modalDefaultValues);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset(modalDefaultValues);
    };

    const onSubmit = async (formData) => {
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            contact: formData.contact,
        };

        try {
            const response = await addReception(payload).unwrap();
            console.log('API response:', response);

            // Reset form and close modal
            reset(modalDefaultValues);
            handleCloseModal();

            // Refetch data to update the table
            refetch();
        } catch (error) {
            console.error('Failed to add receptionist:', error);
            alert('Failed to add receptionist. Please try again.');
        }
    };

    const handleDelete = (id) => {
        // TODO: Implement delete functionality
        console.log('Delete receptionist:', id);
    };

    const handleEdit = (id) => {
        // TODO: Implement edit functionality
        console.log('Edit receptionist:', id);
    };

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Get receptionists data from API
    const receptionists = data?.Receptions || [];
    return <>

        {/* <pre className='text-black'>{JSON.stringify(data, null, 2)}</pre> */}

        <div>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">
                        Receptionists
                    </h1>
                    <div className="text-sm text-gray-500">
                        Healthcare → <span className="text-gray-700">Receptionist</span>
                    </div>
                </div>

                {/* Add Receptionist Button */}
                <button
                    onClick={handleAddReceptionist}
                    className="flex items-center gap-2 bg-[#2D9AD9] hover:bg-[#2589c4] text-white px-5 py-2.5 rounded-lg transition-colors"
                >
                    <FaPlus className="text-sm" /> Add Receptionist
                </button>

            </div>

            {/* Receptionists Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D9AD9] mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading receptionists...</p>
                        </div>
                    </div>
                ) : isError ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <p className="text-red-500 font-semibold mb-2">Error loading receptionists</p>
                            <button
                                onClick={() => refetch()}
                                className="text-[#2D9AD9] hover:underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                ) : receptionists.length === 0 ? (
                    <div className="flex items-center justify-center py-16">
                        <p className="text-gray-500">No receptionists found. Add your first receptionist!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-[#2D9AD9] text-white">
                                    <th className="text-left py-4 px-6 font-medium text-sm">
                                        Receptionist ID
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium text-sm">
                                        Name
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium text-sm">
                                        Created Date
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium text-sm">
                                        Contact No
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium text-sm">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {receptionists.map((receptionist, index) => (
                                    <tr
                                        key={receptionist._id}
                                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                            }`}
                                    >
                                        <td className="py-9 px-6 text-sm text-gray-800">
                                            {receptionist._id}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                                            {receptionist.name}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-800">
                                            {formatDate(receptionist.createdAt)}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-800">
                                            {receptionist.contact}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(receptionist._id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-base" />
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleEdit(receptionist._id)}
                                                    className="text-[#2D9AD9] hover:text-[#2589c4] transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-base" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Receptionist Modal */}

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#2D9AD9] to-[#2589c4] text-white px-8 py-6 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-2xl font-bold">Add New Receptionist</h2>
                            <button onClick={handleCloseModal}>
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="w-full bg-white px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                    className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contact *
                                </label>
                                <input
                                    type="tel"
                                    {...register('contact', {
                                        required: 'Contact is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Contact must be 10 digits',
                                        },
                                    })}
                                    className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none text-gray-800"
                                />
                                {errors.contact && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="md:col-span-2 flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-[#2D9AD9] to-[#2589c4] text-white rounded-lg hover:shadow-lg font-medium"
                                >
                                    Add Receptionist
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}




        </div>
    </>
};

export default Receptionists;
