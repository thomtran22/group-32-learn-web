import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginModal from './login/LoginModal';

const ProtectedRoute = ({ children, allowedRoles = [], isPublic = false }) => {
    
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const token = localStorage.getItem('token');
    const location = useLocation();

    useEffect(() => {
        const verifyAccess = async () => {
            // KHÔNG CÓ TOKEN
            if (!token) {
                setIsAuthenticated(false);
                if (!isPublic) {
                    // Nếu là trang kín -> Hiện form đăng nhập
                    setShowLoginPrompt(true); 
                }
                // Nếu là trang public -> Không làm gì cả (loading = false để render trang)
                setLoading(false);
                return;
            }

            // CÓ TOKEN -> CHECK SERVER
            try {
                const response = await axios.get('https://group-32-learn-web-8hmv.onrender.com/api/user/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setIsAuthenticated(true);
                setUserRole(response.data.role);
                setLoading(false);
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                
                if (!isPublic) {
                    setShowLoginPrompt(true);
                }
                setLoading(false);
            }
        };

        verifyAccess();
    }, [token, location.pathname, isPublic]);

    // ĐANG TẢI
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold text-gray-600">
                    Đang xử lý...
                </div>
            </div>
        );
    }

    // XỬ LÝ NGƯỜI DÙNG CÓ TOKEN 
    if (isAuthenticated) {
        // Nếu là Admin: Chỉ redirect nếu ĐANG KHÔNG Ở trong folder /admin
        if (userRole === 'admin' && !location.pathname.startsWith('/admin')) {
            return <Navigate to="/admin" replace />;
        }
        
        // Nếu là Shipper: Chỉ redirect nếu ĐANG KHÔNG Ở trong folder /shipper
        if (userRole === 'shipper' && !location.pathname.startsWith('/shipper')) {
            return <Navigate to="/shipper" replace />;
        }
    }

    // XỬ LÝ TRANG PUBLIC 
    if (isPublic) {
        // Nếu là Public + Không login (hoặc login là customer) -> Cho xem
        return children;
    }

    // XỬ LÝ TRANG KÍN (CART, PROFILE...)
    // Đến đây chắc chắn isPublic = false

    // Nếu chưa đăng nhập -> Hiện Modal Login
    if (!isAuthenticated) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <p className="text-lg text-gray-700">Vui lòng đăng nhập để tiếp tục.</p>
                </div>
                {showLoginPrompt && (
                    <LoginModal 
                         closeModal={() => window.location.href = '/'} 
                    />
                )}
            </>
        );
    }

    // Nếu đã đăng nhập -> Check Role cụ thể (Ví dụ trang chỉ dành cho Customer)
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    // Hợp lệ tất cả -> Render
    return children;
};

export default ProtectedRoute;