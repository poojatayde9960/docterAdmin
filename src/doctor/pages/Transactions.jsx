import React, { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { FaSearch, FaRupeeSign } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';

const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Sample transaction data
    const transactions = [
        {
            id: "TRNC - 200",
            customer: "john doe",
            date: "20/09/2025",
            contactNo: "8585 555 555",
            subscription: "Premium",
            amount: "₹800",
            method: "UPI",
            status: "Paid"
        },
        {
            id: "TRNC - 200",
            customer: "john doe",
            date: "20/09/2025",
            contactNo: "8585 555 555",
            subscription: "Premium",
            amount: "₹800",
            method: "UPI",
            status: "Paid"
        },
        {
            id: "TRNC - 200",
            customer: "john doe",
            date: "20/09/2025",
            contactNo: "8585 555 555",
            subscription: "Premium",
            amount: "₹800",
            method: "UPI",
            status: "Paid"
        },
        {
            id: "TRNC - 200",
            customer: "john doe",
            date: "20/09/2025",
            contactNo: "8585 555 555",
            subscription: "Premium",
            amount: "₹800",
            method: "UPI",
            status: "Paid"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Transactions</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Healthcare</span>
                    <span>→</span>
                    <span>Transactions</span>
                </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 w-[25%]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FaRupeeSign className="text-green-600 text-xl" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">₹7,800</div>
                        <div className="text-sm text-gray-500">Total Revenue</div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between  border shadow-[0_4px_6px_0_rgba(0,0,0,0.1)]
  bg-white  p-4 gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search By Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                    />
                </div>

                {/* Status Filter Dropdown */}
                <div className="relative w-full md:w-44">
                    {/* Left filter icon */}
                    <CiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none w-full bg-[#2D9AD836] text-black border  rounded-md px-10 py-2 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 cursor-pointer"
                    >
                        <option>All Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Failed</option>
                    </select>

                    {/* Right arrow */}
                    <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#2D9AD9] text-white">
                                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Customer</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Contact No</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Subscription</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Amount</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Method</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 text-sm text-[#2D9AD9] font-medium">
                                        {transaction.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {transaction.customer}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {transaction.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {transaction.contactNo}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {transaction.subscription}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {transaction.amount}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {transaction.method}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
