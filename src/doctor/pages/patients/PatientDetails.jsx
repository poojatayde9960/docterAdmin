import React from "react";
import { FaPhone, FaEnvelope, FaUserMd, FaVenusMars, FaTint, FaWeight, FaHeartbeat, FaUser, FaPhoneAlt, FaRulerVertical } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { GiBodyHeight, GiWeight, GiBlood } from "react-icons/gi";
import { MdCake, MdDescription, MdHealthAndSafety, MdMonitorHeart } from "react-icons/md";
import { useGetPatientByIDQuery } from "../../../redux/apis/patientsApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PatientDetails() {
    const { patientId } = useParams();

    const {
        data: patientRes,
        isLoading,
        error
    } = useGetPatientByIDQuery(patientId);

    const patient = patientRes?.Patient;
    const visits = patientRes?.Visits || [];
    const latestVisit = visits.length > 0 ? visits[visits.length - 1] : null;

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D9AD9] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading patient details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error loading patient details</p>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Patient not found</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#F6FAFF] p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

            {/* LEFT SIDE */}
            <div className="bg-white rounded-2xl space-y-4 h-fit">

                <div className="bg-[#0BA7E8] text-white rounded-t-xl p-6 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-white mx-auto flex items-center justify-center text-4xl">
                        <FaUser />
                    </div>
                    <p className="mt-4 text-xl font-semibold">{patient.patientName}</p>
                    <p className="opacity-90">Patient ID · {patient.UID}</p>
                </div>

                {/* Basic Info */}
                <div className="grid text-black grid-cols-2 gap-4 text-sm p-2">

                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            {/* Icon */}
                            <FaVenusMars className="text-blue-500 mt-1" />

                            {/* Label + Value */}
                            <div className="flex text-black flex-col">
                                <span className="font-semibold">Gender</span>
                                <span className="text-gray-900 capitalize">{patient.gender}</span>
                            </div>
                        </div>
                    </div>


                    {/* Age */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <MdCake className="text-yellow-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Age</span>
                                <span className="text-gray-900">{patient.age} years</span>
                            </div>
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiBlood className="text-red-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Blood Group</span>
                                <span className="text-gray-900">{patient.bloodGroup}</span>
                            </div>
                        </div>
                    </div>

                    {/* Height */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiBodyHeight className="text-green-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Height</span>
                                <span className="text-gray-900">
                                    {latestVisit?.height ? `${latestVisit.height} cm` : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiWeight className="text-purple-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Weight</span>
                                <span className="text-gray-900">
                                    {latestVisit?.weight ? `${latestVisit.weight} kg` : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* BP */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <MdMonitorHeart className="text-pink-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">BP</span>
                                <span className="text-gray-900">
                                    {latestVisit?.bloodPressure || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="space-y-3 text-black text-sm p-2">

                    {/* Phone */}
                    <div className="border p-3 rounded-xl bg-[#E8F6FE]">
                        <div className="flex items-start gap-2">
                            <FaPhoneAlt className="mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Phone</span>
                                <span>{patient.contact}</span>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="border p-3 rounded-xl bg-[#E8F6FE]">
                        <div className="flex items-start gap-2">
                            <FaEnvelope className="mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Email</span>
                                <span className="break-all">{patient.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Doctor */}
                    <div className="border p-3 rounded-xl bg-[#E8F6FE]">
                        <div className="flex items-start gap-2">
                            <FaUserMd className="mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Assigned Doctor</span>
                                <span>Dr. {patient.assignedDoctor?.name || 'Not Assigned'}</span>
                                {patient.assignedDoctor?.specialization && (
                                    <span className="text-xs text-gray-600 mt-0.5">
                                        {patient.assignedDoctor.specialization}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Overview */}
                <div className="space-y-3 text-black text-sm p-2">
                    <div className="border p-4 rounded-xl space-y-3">
                        {/* Header with icon */}
                        <div className="flex items-center gap-2">
                            <MdHealthAndSafety className="mt-1 text-blue-500" />
                            <span className="font-semibold">Health Overview</span>
                        </div>

                        {/* Values */}
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <span>Total Visits</span>
                                <span className="font-semibold">{visits.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Visit</span>
                                <span className="font-semibold">
                                    {latestVisit ? formatDate(latestVisit.visitDate) : 'No visits'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Latest Condition</span>
                                <span className="font-semibold">
                                    {latestVisit?.disease || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


            {/* RIGHT SIDE */}
            <div className="space-y-6">

                {/* Visit Info Cards */}
                <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-100 p-4 rounded-xl">
                        <p className="text-orange-600 font-semibold">Recent Visit</p>
                        <p className="text-sm text-gray-800">
                            {latestVisit ? formatDate(latestVisit.visitDate) : 'No visits yet'}
                        </p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-xl">
                        <p className="text-green-600 font-semibold">Total Amount Paid</p>
                        <p className="text-xl font-semibold text-gray-800">
                            ₹{visits.reduce((sum, visit) => sum + (visit.amount || 0) + (visit.doctorFees || 0), 0)}
                        </p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-xl">
                        <p className="text-pink-600 font-semibold">Last Condition</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {latestVisit?.disease || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Latest Visit Medications */}
                {latestVisit && latestVisit.medicines && latestVisit.medicines.length > 0 && (
                    <div className="bg-white text-black rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Latest Visit Medications</h3>
                        <p className="text-xs text-gray-500 mb-4">From visit on {formatDate(latestVisit.visitDate)}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {latestVisit.medicines.map((medicine, index) => (
                                <div key={index} className="border border-blue-300 p-4 rounded-xl bg-[#E8F6FE]">
                                    <p className="font-semibold">• {medicine.name || medicine}</p>
                                    {medicine.dosage && (
                                        <div className="grid grid-cols-3 mt-3 text-center text-sm">
                                            <div>Morning<br />{medicine.dosage.morning || 0}</div>
                                            <div>Afternoon<br />{medicine.dosage.afternoon || 0}</div>
                                            <div>Night<br />{medicine.dosage.night || 0}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Patient Medical History */}
                <div className="bg-white rounded-2xl shadow p-6 space-y-4">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Patient Medical History ({visits.length} Visits)
                        </h1>
                    </div>

                    {visits.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No visit history available
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {visits.map((visit, index) => (
                                <div key={visit._id} className="rounded-2xl bg-gray-50 p-6 border">

                                    {/* Date & Tag */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {formatDate(visit.visitDate)}
                                        </h2>
                                        {index === visits.length - 1 && (
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                                Latest
                                            </span>
                                        )}
                                    </div>

                                    {/* Visit Title */}
                                    <p className="text-blue-700 font-medium mb-4">
                                        {visit.disease} {visit.subDisease && `– ${visit.subDisease}`}
                                    </p>

                                    {/* Vital Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                        <div className="border rounded-lg p-3 shadow-sm flex items-center gap-3 bg-white">
                                            <FaWeight className="text-blue-500 text-lg" />
                                            <div>
                                                <p className="text-xs text-gray-500">Weight</p>
                                                <p className="font-semibold text-gray-700">{visit.weight} Kg</p>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-3 shadow-sm flex items-center gap-3 bg-white">
                                            <FaHeartbeat className="text-red-500 text-lg" />
                                            <div>
                                                <p className="text-xs text-gray-500">Blood Pressure</p>
                                                <p className="font-semibold text-gray-700">{visit.bloodPressure}</p>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-3 shadow-sm flex items-center gap-3 bg-white">
                                            <FaRulerVertical className="text-purple-500 text-lg" />
                                            <div>
                                                <p className="text-xs text-gray-500">Height</p>
                                                <p className="font-semibold text-gray-700">{visit.height} cm</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reports */}
                                    {visit.reports && visit.reports.length > 0 && (
                                        <div className="mb-5">
                                            <h3 className="flex items-center gap-2 text-gray-800 font-medium mb-2">
                                                <FiFileText className="text-blue-500" /> Reports & Tests
                                            </h3>
                                            <div className="flex gap-3 flex-wrap">
                                                {visit.reports.map((report, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                                                    >
                                                        {report.reportName}
                                                    </span>
                                                ))}

                                            </div>
                                        </div>
                                    )}

                                    {/* Medicines */}
                                    {visit.medicines && visit.medicines.length > 0 && (
                                        <div className="mb-5">
                                            <h3 className="text-gray-800 font-medium mb-2">Prescribed Medicines</h3>
                                            <ul className="list-disc ml-5 text-sm text-gray-800 space-y-2">
                                                {visit.medicines.map((medicine, idx) => (
                                                    <li key={idx}>
                                                        <p className="font-semibold">{medicine.name || medicine}</p>
                                                        {medicine.dosage && (
                                                            <p className="text-gray-500 text-xs mt-0.5">
                                                                Morning: {medicine.dosage.morning || 0},
                                                                Afternoon: {medicine.dosage.afternoon || 0},
                                                                Night: {medicine.dosage.night || 0}
                                                            </p>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Payment Info */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600">Consultation Fee</p>
                                            <p className="font-semibold text-gray-800">₹{visit.doctorFees || 0}</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600">Total Amount</p>
                                            <p className="font-semibold text-gray-800">₹{visit.amount || 0}</p>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {visit.SpacialNote && (
                                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md text-sm">
                                            <strong>Notes:</strong> {visit.SpacialNote}
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    )}

                </div>


            </div>

        </div>
    );
}




