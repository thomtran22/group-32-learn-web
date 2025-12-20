import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { apiVerifyVnpayReturn } from '../services/orderApi';
import { getVnpayMessage } from '../utils/vnpayResponeCode';

const PaymentResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [statusData, setStatusData] = useState({ 
        type: 'loading', 
        title: 'Đang xử lý...', 
        msg: 'Vui lòng đợi trong giây lát' 
    });

    useEffect(() => {
        const vnpResponseCode = searchParams.get('vnp_ResponseCode');

        if (!vnpResponseCode) {
            navigate('/');
            return;
        }

        const processPayment = async () => {
            try {
                // Lấy Thông báo mã lỗi (Client side checking)
                const clientCheck = getVnpayMessage(vnpResponseCode);

                // Nếu mã lỗi VNPay trả về không phải '00' (Thất bại/Hủy)
                if (vnpResponseCode !== '00') {
                    setStatusData({
                        type: 'error',
                        title: clientCheck.title, // Ví dụ: Giao dịch bị hủy
                        msg: clientCheck.msg
                    });
                    setLoading(false);
                    return;
                }

                // Nếu mã là '00', gọi Backend để xác thực chữ ký bảo mật (Server side checking)
                // Truyền nguyên chuỗi query params xuống server
                const data = await apiVerifyVnpayReturn(window.location.search);

                if (data.success) {
                    setStatusData({
                        type: 'success',
                        title: 'Thanh toán thành công!',
                        msg: 'Đơn hàng của bạn đã được xác nhận và đang chờ xử lý.'
                    });
                    // Tại đây có thể clear giỏ hàng local nếu cần
                } else {
                    setStatusData({
                        type: 'error',
                        title: 'Xác thực thất bại',
                        msg: data.message || 'Chữ ký bảo mật không hợp lệ. Vui lòng liên hệ CSKH.'
                    });
                }

            } catch (error) {
                console.error("Payment verify error:", error);
                setStatusData({
                    type: 'error',
                    title: 'Lỗi kết nối',
                    msg: 'Không thể kết nối đến máy chủ để xác thực giao dịch.'
                });
            } finally {
                setLoading(false);
            }
        };

        processPayment();
    }, [searchParams, navigate]);

    // Render Icon bằng SVG (Không cần thư viện)
    const renderIcon = (type) => {
        if (type === 'success') {
            return (
                <svg className="status-icon icon-success" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            );
        }
        // Error hoặc Warning dùng chung icon X
        return (
            <svg className="status-icon icon-error" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        );
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p style={{marginTop: '20px', color: '#666'}}>Đang xác thực giao dịch...</p>
            </div>
        );
    }

    return (
        <div className="payment-result-container">
            <div className="mb-4">
                {renderIcon(statusData.type)}
            </div>

            <h2 className="result-title">{statusData.title}</h2>
            <p className="result-message">{statusData.msg}</p>

            <div className="action-group">
                {statusData.type === 'success' ? (
                    // Trường hợp THÀNH CÔNG
                    <Link to="/profile" className="btn btn-primary">
                        Xem đơn hàng
                    </Link>
                ) : (
                    // Trường hợp THẤT BẠI
                    <>
                        <Link to="/cart" className="btn btn-outline">
                            Về giỏ hàng
                        </Link>
                        <button 
                            onClick={() => navigate('/checkout')} 
                            className="btn btn-primary"
                        >
                            Thử lại
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;