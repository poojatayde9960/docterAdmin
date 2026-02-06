import {
    FaPhoneAlt
} from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function PrescriptionModal({
    open,
    onClose,
    isLoading,
    visitDetails,
    formatDate
}) {
    const invoiceRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle: "Invoice",
    });

    // ✅ Move this AFTER hooks
    if (!open) return null;

    const handleDownload = async () => {
        const element = invoiceRef.current;
        if (!element) return;

        try {
            // High quality PNG export
            const dataUrl = await toPng(element, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: "#ffffff",
            });

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();

            const img = new Image();
            img.src = dataUrl;

            img.onload = () => {
                const pdfHeight = (img.height * pdfWidth) / img.width;

                pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save("invoice.pdf");
            };

        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("PDF generation failed");
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white max-w-[600px] w-full rounded-2xl max-h-[98vh] overflow-y-auto p-2 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {isLoading ? (
                    <p className="text-center py-10">Loading visit details...</p>
                ) : visitDetails?.Visit ? (
                    <>
                        <div ref={invoiceRef} className="border-b-4 rounded-3xl overflow-hidden relative bg-white">
                            {/* TOP BACKGROUND DECORATIONS */}
                            <div className="relative p-6">
                                {/* <img src="/Group 152.png" className="absolute top-0 left-0 w-96 opacity-80" /> */}

                                <div className="flex justify-between items-start relative z-10">

                                    <div className="">
                                        <img
                                            src="/tech_surya_logo-removebg-preview 6.png"
                                            alt="logo"
                                            className="w-40 mb-2 "
                                        />
                                        <h1 className="text-[26px] font-semibold text-gray-800">Invoice</h1>

                                        <div className="grid grid-cols-2 gap-y-1 text-xs">
                                            <p className="text-gray-600 ">Number</p>
                                            <p className="font-medium">
                                                {visitDetails.Visit.patient.UID}
                                            </p>

                                            <p className="text-gray-600">Date</p>
                                            <p className="font-medium">
                                                {formatDate(visitDetails.Visit.visitDate)}
                                            </p>

                                        </div>
                                    </div>

                                    <div className="text-left -mt-2 relative text-sm">
                                        {/* <img
                      src="/Group 153.svg"
                      className="absolute -right-10 -top-28 w-96 h-72 "
                    /> */}
                                        <p className="font-semibold text-green-600 mt-8">Bill To,</p>
                                        <p className="font-semibold text-gray-900">
                                            {visitDetails.Visit.patient.patientName}
                                        </p>
                                        <p>
                                            {visitDetails.Visit.patient.address}
                                            <br />
                                            {visitDetails.Visit.patient.contact}
                                        </p>
                                        <p className="font-semibold mt-1">
                                            {visitDetails.Visit.patient.contact}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* MEDICINES TABLE */}
                            <div className="bg-[#D9EBFB]/40 rounded-2xl mx-4 border border-[#A8CDEA]">
                                <table className="border-collapse text-sm w-full">
                                    <thead className="bg-[#2D9AD929] text-[#2D9AD9] font-medium text-xs">
                                        <tr className="text-center">
                                            <th className="px-6 py-3 border-r border-[#A8CDEA] text-left">
                                                Medicine
                                            </th>
                                            <th className="px-4 py-3 border-r border-[#A8CDEA] w-8">
                                                Qty
                                            </th>
                                            <th className="px-4 py-3 border-r border-[#A8CDEA] w-48 text-left">
                                                Time
                                            </th>
                                            <th className="px-6 py-3 text-right">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#A8CDEA] text-xs">
                                        {visitDetails.Visit.medicines.map((med, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-3 border-r border-[#A8CDEA]">
                                                    {med.name}
                                                </td>
                                                <td className="px-4 py-3 border-r border-[#A8CDEA] text-center">
                                                    {med.quantity}
                                                </td>
                                                <td className="px-4 py-3 border-r border-[#A8CDEA] whitespace-nowrap">
                                                    Morning: {med.morning} | Afternoon: {med.afternoon} | Night: {med.night}
                                                </td>
                                                <td className="px-6 py-3 text-right font-medium">
                                                    ₹{med.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* TOTALS */}
                            <div className="px-0 py-4 mx-8 text-xs">

                                <div className="flex justify-between mt-1">
                                    <p>Doctor Fees</p>
                                    <p>
                                        ₹{visitDetails.Visit.doctorFees}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p>SUBTOTAL</p>
                                    <p>
                                        ₹{visitDetails.Visit.medicines.reduce((a, b) => a + b.price, 0)}
                                    </p>
                                </div>

                                <div className="flex justify-between mt-1">
                                    <p>REPORT TOTAL</p>
                                    <p>
                                        ₹{visitDetails.Visit.reports.reduce((a, b) => a + b.price, 0)}
                                    </p>
                                </div>
                                        
                                <div className="flex border-t justify-between font-bold text-base mt-4 mb-3">
                                    <p>TOTAL</p>
                                    <p>
                                        ₹{Number(visitDetails?.Visit?.amount || 0) +
                                          Number(visitDetails?.Visit?.doctorFees || 0)}
                                    </p>
                                </div>

                            </div>
                          
                            {/* PAYMENT */}
                            <div className="px-10 mt-4 text-sm">
                                <p className="font-semibold text-green-600">Payment Method</p>
                                <p className="text-gray-600 mt-1">
                                    {visitDetails.Visit.paymentMethod}
                                </p>
                            </div>
                               
                            {/* CONTACT */}
                            <div className="px-8 mb-4 relative">
                                <div className="relative z-10 ml-24 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-500"><FaPhoneAlt /></span>
                                        <p className="text-xs font-medium">+91 8485 222 333</p>
                                        <span className="text-blue-500 ml-3">✉️</span>
                                        <p className="text-xs font-medium">john@gmail.com</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-500"><GrLocation /></span>
                                        <p className="text-xs">
                                            golden city center , chhatrapati sambhajinagar
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-3 gap-4 px-10 mt-8 mb-6">
                            <button
                                onClick={handlePrint}
                                className="bg-[#0A7DFF] text-white py-3 rounded-lg shadow flex items-center justify-center gap-2"
                            >
                                <MdOutlineLocalPrintshop /> Print
                            </button>

                            <button
                                onClick={handleDownload}
                                className="bg-[#FF6A00] text-white py-3 rounded-lg shadow flex items-center justify-center gap-2"
                            >
                                <IoCloudDownloadOutline /> Download
                            </button>

                            <button className="bg-[#00BB38] text-white py-3 rounded-lg shadow flex items-center justify-center gap-2">
                                <CiShare2 /> Share
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center py-10">No visit details found</p>
                )}
            </div>
        </div>
    );
}
