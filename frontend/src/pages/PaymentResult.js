// src/pages/PaymentResult.js
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getVnpayMessage } from '../utils/vnpayResponeCode'; // Import file vừa tạo

const PaymentResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [statusData, setStatusData] = useState({ icon: 'loading', title: 'Đang xử lý...', msg: '' });
    const [isVerified, setIsVerified] = useState(false); // Đã check với backend chưa

    useEffect(() => {
        const vnpResponseCode = searchParams.get('vnp_ResponseCode');
        const vnpTxnRef = searchParams.get('vnp_TxnRef');

        if (!vnpResponseCode) {
            navigate('/'); // Không có mã thì đá về trang chủ
            return;
        }

        // 1. Lấy thông báo dựa trên mã lỗi VNPay trả về
        const result = getVnpayMessage(vnpResponseCode);
        
        // Cập nhật giao diện ngay lập tức để người dùng biết nguyên nhân
        setStatusData(result);

        // 2. Vẫn cần gọi Backend để check chữ ký (SecureHash) bảo mật
        const verifyOnBackend = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/orders/vnpay-return${window.location.search}`);
                
                if (!data.success) {
                    // Nếu Backend bảo chữ ký sai -> Ghi đè lại thông báo lỗi bảo mật
                    setStatusData({
                        icon: 'error',
                        title: 'Lỗi bảo mật',
                        msg: 'Chữ ký không hợp lệ (Checksum failed). Giao dịch không được ghi nhận.'
                    });
                }
                setIsVerified(true);
            } catch (error) {
                setStatusData({
                    icon: 'error',
                    title: 'Lỗi kết nối',
                    msg: 'Không thể kết nối đến máy chủ để xác thực đơn hàng.'
                });
            }
        };

        verifyOnBackend();

    }, [searchParams, navigate]);

    // Render icon động
    const renderIcon = (type) => {
        if (type === 'loading') return <div className="spinner-border text-primary"></div>;
        if (type === 'success') return <i className="fas fa-check-circle text-success" style={{fontSize: '80px'}}></i>;
        if (type === 'warning') return <i className="fas fa-exclamation-triangle text-warning" style={{fontSize: '80px'}}></i>;
        return <i className="fas fa-times-circle text-danger" style={{fontSize: '80px'}}></i>; // error
    };

    return (
        <div className="container text-center py-5">
            <div className="mb-4">
                {renderIcon(statusData.icon)}
            </div>

            <h2 className="mb-3">{statusData.title}</h2>
            <p className="text-muted mb-4" style={{fontSize: '1.1rem'}}>{statusData.msg}</p>

            {/* Chỉ hiện nút bấm khi đã xử lý xong logic */}
            {statusData.icon !== 'loading' && (
                <div className="d-flex justify-content-center gap-3">
                    {statusData.icon === 'success' ? (
                        // Trường hợp THÀNH CÔNG
                        <Link to="/my-orders" className="btn btn-primary px-4">
                            Xem đơn hàng
                        </Link>
                    ) : (
                        // Trường hợp THẤT BẠI / HỦY
                        <>
                            <Link to="/cart" className="btn btn-outline-secondary">
                                Về giỏ hàng
                            </Link>
                            <button 
                                onClick={() => navigate('/checkout')} 
                                className="btn btn-warning px-4"
                            >
                                Thanh toán lại
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentResult;