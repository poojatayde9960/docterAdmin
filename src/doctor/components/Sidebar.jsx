import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserMd, FaFileInvoiceDollar, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { MdDashboard, MdPeople } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa6";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    // Menu structure based on the screenshot
    const mainMenu = [
        { name: "Dashboard", path: "/", icon: <MdDashboard /> },
    ];

    const healthcareMenu = [
        { name: "Patients", path: "/myPatient", icon: <MdPeople /> },
        { name: "Doctors", path: "/alldoctors", icon: <FaUserMd /> },
        { name: "Invoice", path: "/invoice", icon: <FaFileInvoiceDollar /> },
        { name: "Receptionist", path: "/receptionist", icon: <FaUserNurse /> },
        { name: "Transactions", path: "/transactions", icon: <FaDollarSign /> },
        { name: "Plans", path: "/plans", icon: <FaClipboardList /> },
    ];

    return (
        <>
            <div className={`fixed text-sm md:relative shadow-lg inset-y-0 left-0 bg-white text-black h-screen p-4 transform transition-transform duration-300 z-40
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 w-60 flex flex-col`}>

                {/* Close Button (Mobile) */}
                <button onClick={toggleSidebar} className="text-2xl mb-5 md:hidden self-end">
                    ✖
                </button>

                {/* Logo */}
                <div className="mb-6">
                    <img src="./tech_surya_logo-removebg-preview 6.png" alt="Logo" className='h-16' />
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-6">
                    {/* MAIN Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">MAIN</h3>
                        <div className="space-y-1">
                            {mainMenu.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={handleNavClick}
                                    className={`block rounded-lg transition-colors duration-200 
                                        ${location.pathname === item.path ? "bg-[#2D9AD9] text-white" : "text-[#2D9AD9] hover:bg-blue-50"}`}
                                >
                                    <div className="flex items-center gap-3 p-3 px-4">
                                        {React.cloneElement(item.icon, {
                                            className: `text-lg ${location.pathname === item.path ? "text-white" : "text-[#2D9AD9]"}`
                                        })}
                                        <span className={`text-sm font-medium ${location.pathname === item.path ? "text-white" : "text-[#2D9AD9]"}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* HEALTHCARE Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">HEALTHCARE</h3>
                        <div className="space-y-1">
                            {healthcareMenu.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={handleNavClick}
                                    className={`block rounded-lg transition-colors duration-200 
                                        ${location.pathname === item.path ? "bg-[#2D9AD9] text-white" : "text-[#2D9AD9] hover:bg-blue-50"}`}
                                >
                                    <div className="flex items-center gap-3 p-3 px-4">
                                        {React.cloneElement(item.icon, {
                                            className: `text-lg ${location.pathname === item.path ? "text-white" : "text-[#2D9AD9]"}`
                                        })}
                                        <span className={`text-sm font-medium ${location.pathname === item.path ? "text-white" : "text-[#2D9AD9]"}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Need Help Section */}
                <div className="mt-auto mb-4 bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Need Help?</h3>
                    <p className="text-xs text-gray-500 mb-3">Contact support Team</p>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md">
                        Get Support
                    </button>
                </div>
            </div>

            {/* Overlay (Click to Close on Mobile) */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-10 md:hidden z-30" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
