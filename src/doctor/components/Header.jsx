import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useLogoutMutation } from "../../redux/apis/authApi";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar }) => {
    const [logout, { isLoading }] = useLogoutMutation();
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Get doctor info from Redux
    const admin = useSelector((state) => state.auth.admin);
    const doctor = admin?.doctor;
    const doctorName = doctor?.name || "";
    const doctorRole = "Admin";

    // Logout handler
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Path to Title Mapping
    const titles = {
        "/": "Admin Dashboard",
        "/appointments": "Appointments",
        "/myPatient": "My Patients",
        "/alldoctors": "All Doctors",
        "/schedule": "Schedule",
        "/prescriptions": "Prescriptions",
        "/receptionist": "Receptionists",
        "/transactions": "Transactions",
        "/plans": "Plans",
        "/invoice": "Invoice & Prescription",
    };

    return (
        <header className="bg-white shadow-sm p-4 flex items-center justify-between border-b border-gray-200">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Sidebar Toggle Button (Mobile) */}
                <button onClick={toggleSidebar} className="text-gray-900 text-2xl md:hidden">
                    <FaBars />
                </button>

                {/* Dynamic Page Title */}
                <h1 className="text-lg font-semibold text-gray-800">
                    {titles[location.pathname] || "Admin Panel"}
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                {/* Search Input */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2  bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Profile Section */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-3 cursor-pointer bg-[#D9D9D961] text-black rounded-md px-4 py-2">
                        {/* Profile Icon */}
                        <div className="w-8 h-8 bg-[#2D9AD8] rounded-full flex items-center justify-center">
                            <FaUser className="text-[#FFFFFF] text-sm" />
                        </div>

                        {/* Doctor Info */}
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium leading-tight">{doctorName}</p>
                            <p className="text-xs opacity-90">{doctorRole}</p>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 mt-2">
                        <li>
                            <button
                                className="text-red-600 w-full text-left"
                                onClick={handleLogout}
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
