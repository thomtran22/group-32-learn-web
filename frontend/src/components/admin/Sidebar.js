import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt, FaShoppingCart, FaBoxes,
    FaTruck, FaUsers, FaSignOutAlt
} from 'react-icons/fa';
import { toast } from "react-toastify";

const Sidebar = ({ onLinkClick }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Đã đăng xuất thành công!');
        navigate('/');
    };

    const handleNavClick = () => {
        // Đóng sidebar trên mobile khi click link
        if (onLinkClick) onLinkClick();
    };

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-6 py-4 transition-colors duration-200 ${isActive
            ? 'bg-slate-700 border-l-4 border-blue-500 text-white'
            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
        }`;

    return (
        <div className="w-64 bg-slate-900 h-full fixed left-0 top-0 flex flex-col shadow-lg z-50">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                <p className="text-sm text-gray-400 mt-1">Quản trị hệ thống</p>
            </div>

            <nav className="flex-1 mt-4 space-y-1 overflow-y-auto">
                <NavLink to="/admin" end className={navItemClass} onClick={handleNavClick}>
                    <FaTachometerAlt /> Dashboard
                </NavLink>
                <NavLink to="/admin/orders" className={navItemClass} onClick={handleNavClick}>
                    <FaShoppingCart /> Đơn hàng
                </NavLink>
                <NavLink to="/admin/products" className={navItemClass} onClick={handleNavClick}>
                    <FaBoxes /> Sản phẩm
                </NavLink>
                <NavLink to="/admin/shippers" className={navItemClass} onClick={handleNavClick}>
                    <FaTruck /> Shipper
                </NavLink>
                <NavLink to="/admin/users" className={navItemClass} onClick={handleNavClick}>
                    <FaUsers /> Người dùng
                </NavLink>
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
                >
                    <FaSignOutAlt /> Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default Sidebar;