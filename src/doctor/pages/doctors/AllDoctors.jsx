import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetDoctorsQuery } from "../../../redux/apis/patientsApi";
import { useAddDoctorMutation } from "../../../redux/apis/receptionApi";

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function AllDoctors() {
    const { data, isLoading, error } = useGetDoctorsQuery();
    const [addDoctor, { isLoading: isAddingDoctor }] = useAddDoctorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        gender: 'male',
        dateOfBirth: '',
        location: '',
        education: '',
        specialization: '',
        experience: '',
        description: '',
        image: null,
        isExternal: false,
        availabilitySchedule: DAYS_OF_WEEK.map(day => ({
            day,
            morning: [],
            evening: []
        }))
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const addTimeSlot = (dayIndex, period) => {
        const newSchedule = [...formData.availabilitySchedule];
        newSchedule[dayIndex][period].push({ start: '', end: '' });
        setFormData(prev => ({ ...prev, availabilitySchedule: newSchedule }));
    };

    const removeTimeSlot = (dayIndex, period, slotIndex) => {
        const newSchedule = [...formData.availabilitySchedule];
        newSchedule[dayIndex][period].splice(slotIndex, 1);
        setFormData(prev => ({ ...prev, availabilitySchedule: newSchedule }));
    };

    const updateTimeSlot = (dayIndex, period, slotIndex, field, value) => {
        const newSchedule = [...formData.availabilitySchedule];
        newSchedule[dayIndex][period][slotIndex][field] = value;
        setFormData(prev => ({ ...prev, availabilitySchedule: newSchedule }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('📝 Form submission started...');
        console.log('Form Data:', formData);

        try {
            const formDataToSend = new FormData();

            // Add basic fields
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('contact', formData.contact);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('dateOfBirth', formData.dateOfBirth);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('education', formData.education);
            formDataToSend.append('specialization', formData.specialization);
            formDataToSend.append('experience', String(formData.experience)); // Convert to string
            formDataToSend.append('description', formData.description);
            formDataToSend.append('isExternal', String(formData.isExternal)); // Convert boolean to string "true" or "false"

            if (formData.image) {
                formDataToSend.append('image', formData.image);
                console.log('📸 Image included:', formData.image.name);
            } else {
                formDataToSend.append('image', 'null');
                console.log('📸 No image provided');
            }

            // Add availability schedule - send ALL days (backend expects all 7 days)
            formData.availabilitySchedule.forEach((daySchedule, dayIndex) => {
                // Always send the day field (even if no slots)
                formDataToSend.append(`availabilitySchedule[${dayIndex}][day]`, daySchedule.day);

                // Add morning slots only if they exist
                let morningSlotIndex = 0;
                daySchedule.morning.forEach((slot) => {
                    if (slot.start && slot.end) {
                        formDataToSend.append(`availabilitySchedule[${dayIndex}][morning][${morningSlotIndex}][start]`, slot.start);
                        formDataToSend.append(`availabilitySchedule[${dayIndex}][morning][${morningSlotIndex}][end]`, slot.end);
                        morningSlotIndex++;
                    }
                });

                // Add evening slots only if they exist
                let eveningSlotIndex = 0;
                daySchedule.evening.forEach((slot) => {
                    if (slot.start && slot.end) {
                        formDataToSend.append(`availabilitySchedule[${dayIndex}][evening][${eveningSlotIndex}][start]`, slot.start);
                        formDataToSend.append(`availabilitySchedule[${dayIndex}][evening][${eveningSlotIndex}][end]`, slot.end);
                        eveningSlotIndex++;
                    }
                });
            });

            // Log all FormData entries for debugging
            console.log('📤 FormData being sent:');
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            console.log('🚀 Calling API...');
            const result = await addDoctor(formDataToSend).unwrap();

            console.log('✅ API Response:', result);
            alert('Doctor added successfully!');
            setIsModalOpen(false);

            // Reset form
            setFormData({
                name: '',
                email: '',
                contact: '',
                password: '',
                gender: 'male',
                dateOfBirth: '',
                location: '',
                education: '',
                specialization: '',
                experience: '',
                description: '',
                image: null,
                isExternal: false,
                availabilitySchedule: DAYS_OF_WEEK.map(day => ({
                    day,
                    morning: [],
                    evening: []
                }))
            });
        } catch (err) {
            console.error('❌ Failed to add doctor:', err);
            console.error('Error details:', {
                status: err?.status,
                data: err?.data,
                message: err?.data?.message || err?.message
            });
            alert(err?.data?.message || err?.message || 'Failed to add doctor. Please check console for details.');
        }
    };
    if (isLoading) return <p className="text-center mt-10"><div className="w-full bg-white rounded-xl shadow p-4 space-y-3 animate-pulse">

        {/* ID */}
        <div className="bg-slate-300 w-10 h-5 rounded-sm"></div>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-slate-300"></div>
            <div className="h-4 w-32 bg-slate-300 rounded"></div>
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 rounded-xl border p-2 border-blue-100">
            <div className="space-y-2 text-center">
                <div className="h-3 bg-slate-300 rounded mx-auto w-16"></div>
                <div className="h-4 bg-slate-200 rounded mx-auto w-12"></div>
            </div>
            <div className="space-y-2 text-center">
                <div className="h-3 bg-slate-300 rounded mx-auto w-20"></div>
                <div className="h-4 bg-slate-200 rounded mx-auto w-10"></div>
            </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-300 rounded"></div>
            <div className="h-3 w-40 bg-slate-200 rounded"></div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-300 rounded"></div>
            <div className="h-3 w-32 bg-slate-200 rounded"></div>
        </div>

    </div></p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error loading doctors</p>;

    // Data check
    const doctors = data?.Doctors || [];

    return <>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">
                    Doctors
                </h1>
                <div className="text-sm text-gray-500">
                    Healthcare → <span className="text-gray-700"> Doctors</span>
                </div>
            </div>

            {/* Add Doctor Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[#2D9AD9] hover:bg-[#2589c4] text-white px-5 py-2.5 rounded-lg transition-colors"
            >
                <FaPlus className="text-sm" /> Add Doctor
            </button>


        </div>


        <div className="p-4 w-full bg-[#F6FAFF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {doctors.map((doctor, index) => (
                <Link key={doctor._id} to={`/doctordetails/${doctor._id}`}>
                    <div className="w-full bg-white rounded-xl shadow p-4 space-y-2">
                        {/* Doctor ID */}
                        <div className="bg-[#CC25B0] w-10 rounded-sm text-center">
                            <p className="text-white text-sm">#{index + 1}</p>
                        </div>

                        {/* Avatar and Name */}
                        <div className="flex flex-col items-center text-center">
                            {/* Dynamic Doctor Image */}
                            {doctor.image ? (
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-br from-[#0BA7E8] to-[#29C58F] shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0BA7E8] to-[#29C58F] flex items-center justify-center text-white text-3xl font-semibold">
                                    {doctor.name?.slice(0, 1)}
                                </div>
                            )}
                            <h2 className="mt-4 text-xl font-semibold text-[#0E3C5F]">{doctor.name}</h2>
                            <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                        </div>

                        {/* Experience & Appointments */}
                        <div className="grid grid-cols-2 rounded-xl border p-2 border-blue-100 overflow-hidden">
                            <div className="p-2 text-center border-r-2 border-blue-100">
                                <p className="text-black text-sm">Experience</p>
                                <p className="text-gray-400 font-semibold mt-1">{doctor.experience}+ yrs</p>
                            </div>

                            <div className="p-2 text-center">
                                <p className="text-black text-sm">Appointments</p>
                                <p className="text-gray-400 font-semibold text-lg mt-1">
                                    {doctor.availabilitySchedule?.length || 0}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <div className="text-blue-600">
                                <FaEnvelope />
                            </div>
                            <p>{doctor.email}</p>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center gap-2">
                            <div className="text-blue-600">
                                <FaPhoneAlt />
                            </div>
                            <p>{doctor.contact}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {/* Add Doctor Modal */}
        {isModalOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
            >
                {/* <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden"></div> */}
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="sticky top-0 w-full bg-gradient-to-r from-[#2D9AD9] to-[#2686c0] text-white px-8 py-6 flex items-center justify-between rounded-t-2xl z-10">
                        {/* <div className="sticky top-0 bg-gradient-to-r from-[#2D9AD9] to-[#2686c0] text-white px-8 py-6 flex items-center justify-between rounded-t-2xl z-10"> */}
                        <div>
                            <h2 className="text-2xl font-bold">Add New Doctor</h2>
                            <p className="text-blue-100 text-sm mt-1">Fill in the details to add a new doctor</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                            type="button"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>

                    {/* Modal Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Basic Information Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="doctor@example.com"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Contact <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="9584348330"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Strong password"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Date of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="City, State"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Details Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Professional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Education <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="MBBS, MD"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Specialization <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Cardiologist, Orthopedic"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Experience (years) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        placeholder="5"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Profile Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        placeholder="Brief description about the doctor"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] focus:ring-4 focus:ring-[#2D9AD9] focus:ring-opacity-10 outline-none resize-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isExternal"
                                            checked={formData.isExternal}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-[#2D9AD9] border-2 border-gray-300 rounded focus:ring-[#2D9AD9]"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">External Doctor</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Availability Schedule Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Weekly Availability Schedule</h3>
                            <div className="space-y-4">
                                {formData.availabilitySchedule.map((daySchedule, dayIndex) => (
                                    <div key={daySchedule.day} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 capitalize mb-3">{daySchedule.day}</h4>

                                        {/* Morning Slots */}
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-700">Morning</label>
                                                <button
                                                    type="button"
                                                    onClick={() => addTimeSlot(dayIndex, 'morning')}
                                                    className="text-[#2D9AD9] hover:text-[#2686c0] text-sm font-medium flex items-center gap-1"
                                                >
                                                    <FaPlus className="text-xs" /> Add Slot
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {daySchedule.morning.map((slot, slotIndex) => (
                                                    <div key={slotIndex} className="flex gap-2 items-center">
                                                        <input
                                                            type="time"
                                                            value={slot.start}
                                                            onChange={(e) => updateTimeSlot(dayIndex, 'morning', slotIndex, 'start', e.target.value)}
                                                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] outline-none text-sm"
                                                        />
                                                        <span className="text-gray-500">to</span>
                                                        <input
                                                            type="time"
                                                            value={slot.end}
                                                            onChange={(e) => updateTimeSlot(dayIndex, 'morning', slotIndex, 'end', e.target.value)}
                                                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] outline-none text-sm"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTimeSlot(dayIndex, 'morning', slotIndex)}
                                                            className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        >
                                                            <FaTrash className="text-sm" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {daySchedule.morning.length === 0 && (
                                                    <p className="text-sm text-gray-400 italic">No morning slots</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Evening Slots */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-700">Evening</label>
                                                <button
                                                    type="button"
                                                    onClick={() => addTimeSlot(dayIndex, 'evening')}
                                                    className="text-[#2D9AD9] hover:text-[#2686c0] text-sm font-medium flex items-center gap-1"
                                                >
                                                    <FaPlus className="text-xs" /> Add Slot
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {daySchedule.evening.map((slot, slotIndex) => (
                                                    <div key={slotIndex} className="flex gap-2 items-center">
                                                        <input
                                                            type="time"
                                                            value={slot.start}
                                                            onChange={(e) => updateTimeSlot(dayIndex, 'evening', slotIndex, 'start', e.target.value)}
                                                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] outline-none text-sm"
                                                        />
                                                        <span className="text-gray-500">to</span>
                                                        <input
                                                            type="time"
                                                            value={slot.end}
                                                            onChange={(e) => updateTimeSlot(dayIndex, 'evening', slotIndex, 'end', e.target.value)}
                                                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#2D9AD9] outline-none text-sm"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTimeSlot(dayIndex, 'evening', slotIndex)}
                                                            className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        >
                                                            <FaTrash className="text-sm" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {daySchedule.evening.length === 0 && (
                                                    <p className="text-sm text-gray-400 italic">No evening slots</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isAddingDoctor}
                                className="px-8 py-3 bg-gradient-to-r from-[#2D9AD9] to-[#2686c0] text-white rounded-lg hover:shadow-lg hover:shadow-[#2D9AD9]/30 font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAddingDoctor ? 'Adding...' : 'Add Doctor'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
}
