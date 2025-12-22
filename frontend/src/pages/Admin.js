import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import OrderManagement from '../components/admin/OrderManagement';
import ProductManagement from '../components/admin/ProductManagement';
import Inventory from '../components/admin/Inventory';
import UserManagement from '../components/admin/UserManagement';
import ShipperManagement from '../components/admin/ShipperManagement';

const Admin = () => {
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar cố định */}
            <Sidebar />

            {/* Khu vực nội dung chính */}
            <div className="flex-1 ml-64 overflow-y-auto p-8">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="shippers" element={<ShipperManagement />} />
                    {/* Redirect các route lạ về dashboard */}
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;