// --- FILE: Admin.js ---
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import OrderManagement from '../components/admin/OrderManagement';
import ProductManagement from '../components/admin/ProductManagement';
import UserManagement from '../components/admin/UserManagement';
import ShipperManagement from '../components/admin/ShipperManagement';

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            {/* 1. Mobile Overlay: Lớp phủ đen mờ khi mở menu trên mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* 2. Sidebar Container */}
            {/* - Mobile: fixed, z-30, ẩn/hiện bằng translate-x */}
            {/* - Desktop (md): relative, luôn hiện (translate-x-0) */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 transition-transform duration-300 ease-in-out transform 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <Sidebar onLinkClick={() => setSidebarOpen(false)} />
            </div>

            {/* 3. Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header: Nút hamburger chỉ hiện trên mobile */}
                <header className="bg-white shadow-sm p-4 md:hidden flex justify-between items-center z-10">
                    <h2 className="font-bold text-gray-800">Admin Panel</h2>
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 focus:outline-none">
                        <FaBars size={24} />
                    </button>
                </header>

                {/* Content Area: Scroll nội dung riêng biệt */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="orders" element={<OrderManagement />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="shippers" element={<ShipperManagement />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;