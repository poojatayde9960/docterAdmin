import React from 'react';
import { FaUser, FaUserMd, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { useGetInvoiceQuery } from '../../redux/apis/patientsApi';
import { IoTimeOutline, IoTimeSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetInvoiceQuery();

    if (isLoading) return <p className="text-center py-8">Loading invoices...</p>;
    if (isError) return <p className="text-center py-8 text-red-500">Error loading invoices</p>;

    // Access the Invoice array from the API response (capitalized)
    const invoices = data?.Invoice || [];

    return <>

        {/* <pre className='text-black'>{JSON.stringify(data, null, 2)}</pre> */}

        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Invoice & Prescription
                </h1>
                <div className="text-sm text-gray-500">
                    Healthcare → <span className="text-gray-700">Invoice</span>
                </div>
            </div>

            {/* Invoice Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {invoices.map((invoice, index) => (
                    <div key={invoice._id || index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                        {/* Patient Info */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaUser className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {invoice.patientName || `Patient ${invoice.patient?.slice(-4) || 'N/A'}`}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {invoice.patientAge || '-'} Yr . {invoice.patientGender || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex items-center gap-2 mb-3">
                            <FaUserMd className="text-green-500 text-lg" />
                            <span className="text-sm text-gray-800">
                                {invoice.doctorName || `Dr. ${invoice.assignedDoctor?.slice(-4) || 'N/A'}`}
                            </span>
                        </div>

                        {/* Last Visit */}
                        <div className="flex items-center gap-2 mb-3">
                            <FaCalendarAlt className="text-orange-500 text-base" />
                            <span className="text-sm text-gray-800">
                                Last Visit : {invoice.visitDate ? new Date(invoice.visitDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }).replace(/\//g, '-') : "-"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <IoTimeSharp className="text-[#CC25B0] text-md" />
                            <span className="text-sm text-gray-800">
                                Visit time: {invoice.visitTime || "-"}
                            </span>
                        </div>


                        {/* Next Visit (Optional) */}
                        {invoice.nextVisit && (
                            <div className="flex items-center gap-2 mb-4">
                                <FaCalendarAlt className="text-pink-500 text-base" />
                                <span className="text-sm text-gray-800">
                                    Next Visit: {new Date(invoice.nextVisit).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        )}
                        {/* nsdjhbfsdbfs */}


                        <button
                            onClick={() => navigate("/invoiceReceipt")}
                            className="w-full bg-[#2D9AD9] hover:bg-[#2589c4] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4"
                        >
                            <FaEye className="text-sm" />
                            <span className="text-sm font-medium">View Invoice</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* No Data Message */}
            {invoices.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No invoices found</p>
                </div>
            )}
        </div>
    </>
};

export default Invoice;
