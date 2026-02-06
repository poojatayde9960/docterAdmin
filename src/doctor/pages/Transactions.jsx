import React, { useState, useMemo } from 'react';
import { CiFilter } from 'react-icons/ci';
import { FaSearch, FaRupeeSign } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { useGetTransactionQuery } from '../../redux/apis/receptionApi';

const Transactions = () => {
    const { data, isLoading, isError } = useGetTransactionQuery()
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Format date from API format to display format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Get transactions from API data
    const transactions = useMemo(() => {
        if (!data?.Transaction) return [];

        return data.Transaction.map((transaction, index) => ({
            id: `TRNC - ${20261 + index}`,
            customer: transaction.patient?.patientName || 'N/A',
            date: formatDate(transaction.visitDate),
            contactNo: transaction.patient?.contact || 'N/A',
            subscription: 'Premium', // This data is not in the API response, using default
            amount: transaction.amount,
            method: 'UPI', // This data is not in the API response, using default
            status: 'Paid', // This data is not in the API response, using default
            uid: transaction.patient?.UID || 'N/A',
            visitTime: transaction.visitTime
        }));
    }, [data]);

    // Filter transactions based on search term
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction =>
            transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transactions, searchTerm]);

    return <>
        {/* <pre className='text-black'>{JSON.stringify(data, null, 2)}</pre> */}
        {/* Loading State */}
        {isLoading && (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading transactions...</p>
                </div>
            </div>
        )}

        {/* Error State */}
        {isError && (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">Failed to load transactions. Please try again later.</p>
                </div>
            </div>
        )}

        {/* Main Content */}
        {!isLoading && !isError && (
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
                            <div className="text-2xl font-bold text-gray-900">
                                ₹{data?.TotalRevenue?.toLocaleString('en-IN') || 0}
                            </div>
                            <div className="text-sm text-gray-500">Total Revenue</div>
                        </div>
                    </div>
                </div>

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
                                {filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((transaction, index) => (
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
                                                ₹{transaction.amount}
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
    </>
};

export default Transactions;
