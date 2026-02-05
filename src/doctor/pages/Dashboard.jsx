import React from 'react';
import { FaCalendarCheck, FaUserMd, FaUsers, FaDollarSign } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { useGetDashQuery } from '../../redux/apis/patientsApi';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const admin = useSelector((state) => state.auth.admin);
    const { data: dashData, isLoading, error } = useGetDashQuery();

    // Define stats with dynamic data from API
    const stats = [
        {
            title: "Receptionist",
            count: dashData?.ReceptionCount || 0,
            change: "+1 From Yesterday",
            icon: <FaCalendarCheck className="text-2xl" />,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Doctors",
            count: dashData?.DoctorCount || 0,
            change: "+1 From Yesterday",
            icon: <FaUserMd className="text-2xl" />,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },
        {
            title: "Patients",
            count: dashData?.PatientsCount || 0,
            change: "+12 From yesterday",
            icon: <FaUsers className="text-2xl" />,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            title: "Transactions",
            count: `₹${dashData?.TotalRevenue?.toLocaleString('en-IN') || 0}`,
            change: "+3k From yesterday",
            icon: <FaDollarSign className="text-2xl" />,
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-red-500">
                    <p className="text-xl font-semibold mb-2">Error loading dashboard</p>
                    <p className="text-sm">{error?.data?.message || 'Something went wrong'}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">
                        {/* Top Section - Icon and Trend */}
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.iconBg} ${stat.iconColor} p-3 rounded-lg`}>
                                {stat.icon}
                            </div>
                            <MdTrendingUp className="text-green-500 text-xl" />
                        </div>

                        {/* Count */}
                        <h2 className="text-3xl font-bold text-gray-800 mb-1">
                            {stat.count}
                        </h2>

                        {/* Title */}
                        <p className="text-sm font-medium text-gray-600 mb-1">
                            {stat.title}
                        </p>

                        {/* Change Indicator */}
                        <p className="text-xs text-green-600 font-medium">
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subscription Plan Distribution - Pie Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">
                        Subscription Plan Distribution
                    </h3>

                    <div className="relative flex justify-center items-center h-[300px]">
                        <svg width="260" height="260" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="#E5E7EB" />
                            {/* BASIC – 60% */}
                            <path
                                d="
      M100 100
      L100 10
      A90 90 0 0 1 173 137
      Z
    "
                                fill="#2D9AD9"
                            />

                            {/* STANDARD – 25% */}
                            <path
                                d="
      M100 100
      L173 137
      A90 90 0 0 1 100 190
      Z
    "
                                fill="#10B981"
                            />

                            {/* PREMIUM – 15% */}
                            <path
                                d="
      M100 100
      L100 190
      A90 90 0 0 1 100 10
      Z
    "
                                fill="#6D28D9"
                            />
                        </svg>

                        {/* Labels */}
                        <span className="absolute top-[50px] right-[60px] text-sm font-medium text-[#2D9AD9]">
                            Basic 60%
                        </span>
                        <span className="absolute bottom-[70px] right-[60px] text-sm font-medium text-[#10B981]">
                            Standard 25%
                        </span>
                        <span className="absolute bottom-[70px] left-[60px] text-sm font-medium text-[#6D28D9]">
                            Premium 15%
                        </span>
                    </div>
                </div>


                {/* Monthly Revenue - Line Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Monthly Revenue
                        </h3>
                    </div>

                    {/* Chart */}
                    <div className="relative h-[300px]">
                        <svg viewBox="0 0 600 300" className="w-full h-full">
                            {/* Horizontal dashed grid lines */}
                            {[60, 120, 180, 240].map((y, i) => (
                                <line
                                    key={i}
                                    x1="40"
                                    y1={y}
                                    x2="600"
                                    y2={y}
                                    stroke="#E5E7EB"
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* Vertical dashed grid lines */}
                            {[100, 200, 300, 400, 500].map((x, i) => (
                                <line
                                    key={i}
                                    x1={x}
                                    y1="20"
                                    x2={x}
                                    y2="260"
                                    stroke="#E5E7EB"
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* Smooth revenue curve (same feel as screenshot) */}
                            <path
                                d="
                  M 40 250
                  C 80 200, 120 200, 160 210
                  S 240 190, 280 180
                  S 340 140, 380 150
                  S 440 190, 480 180
                  S 540 80, 580 60
                "
                                stroke="#10B981"
                                strokeWidth="2.5"
                                fill="none"
                            />

                            {/* Y-axis labels */}
                            <text x="5" y="65" fontSize="12" fill="#9CA3AF">70</text>
                            <text x="5" y="125" fontSize="12" fill="#9CA3AF">60</text>
                            <text x="5" y="185" fontSize="12" fill="#9CA3AF">50</text>
                            <text x="5" y="245" fontSize="12" fill="#9CA3AF">40</text>

                            {/* X-axis labels */}
                            <text x="80" y="290" fontSize="12" fill="#9CA3AF">Jan</text>
                            <text x="180" y="290" fontSize="12" fill="#9CA3AF">Feb</text>
                            <text x="280" y="290" fontSize="12" fill="#9CA3AF">Mar</text>
                            <text x="380" y="290" fontSize="12" fill="#9CA3AF">Apr</text>
                            <text x="480" y="290" fontSize="12" fill="#9CA3AF">May</text>
                            <text x="560" y="290" fontSize="12" fill="#9CA3AF">Jun</text>
                        </svg>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;