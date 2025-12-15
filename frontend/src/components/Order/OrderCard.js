// file: src/components/Order/OrderCard.js (hoặc đường dẫn tương ứng của bạn)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatMoney, getStatusInfo } from '../../utils/orderHelpers';
import OrderItem from './OrderItem';

// Thêm prop onOrderClick
const OrderCard = ({ order, onCancelOrder, onConfirmReceived, onOrderClick }) => {
    const navigate = useNavigate();
    const statusInfo = getStatusInfo(order.status);

    const handleCardClick = (e) => {
        // Ngăn chặn sự kiện nếu click vào nút hoặc link
        if (e.target.closest('button') || e.target.closest('a')) return;

        // LOGIC MỚI: Nếu có hàm onOrderClick được truyền vào (từ Profile), thì dùng nó
        if (onOrderClick) {
            onOrderClick(order._id);
        } else {
            // Nếu không, giữ logic cũ là chuyển trang
            navigate(`/orders/${order._id}`);
        }
    };

    const renderOrderActions = () => {
        // ... (Giữ nguyên logic renderOrderActions như cũ)
        // Copy lại đoạn logic renderOrderActions từ file cũ của bạn vào đây
        if (order.status === 'Delivered') {
            return (
                <>
                    <button className="btn btn-primary">Đánh giá</button>
                    <button className="btn btn-secondary">Mua lại</button>
                </>
            );
        }
        if (order.status === 'Cancelled') {
            return <button className="btn btn-secondary">Mua lại</button>;
        }
        if (order.status === 'Shipping') {
            return (
                <button 
                    className="btn btn-primary"
                    onClick={() => onConfirmReceived(order._id)}
                >
                    Đã nhận được hàng
                </button>
            );
        }
        if (order.status === 'Pending') {
            return (
                <>
                    {order.paymentMethod === 'VNPAY' && !order.isPaid && (
                        <button 
                            className="btn btn-primary"
                            onClick={() => window.location.href = `/api/payment/create_payment_url/${order._id}`} 
                        >
                            Thanh toán ngay
                        </button>
                    )}
                    <button 
                        className="btn btn-danger"
                        onClick={() => onCancelOrder(order._id)}
                    >
                        Hủy đơn hàng
                    </button>
                </>
            );
        }
        if (order.status === 'Processing') {
             return <button className="btn btn-secondary" disabled>Đang chuẩn bị hàng</button>;
        }
        return null;
    };

    return (
        <div className="order-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="order-card__header">
                <div className="shop-info">
                    <span className="shop-name">SHOP THỜI TRANG</span>
                </div>
                <div className="status-group">
                    <span className="payment-method-badge">{order.paymentMethod}</span>
                    <div className="separator">|</div>
                    <span className="status-text" style={{ color: statusInfo.color }}>
                        {statusInfo.text.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="order-card__body">
                {order.orderItems.map((item) => (
                    <OrderItem key={item._id} item={item} />
                ))}
            </div>

            <div className="order-card__footer">
                <div className="total-section">
                    <span className="label">Thành tiền:</span>
                    <span className="total-price">{formatMoney(order.totalPrice)}</span>
                </div>

                <div className="action-buttons">
                    <span className="shipping-status-text">
                        {order.status === 'Shipping' ? 'Đơn hàng đang trên đường giao đến bạn' : ''}
                    </span>
                    <div className="buttons-wrapper">
                        {renderOrderActions()}
                        {/* Nút Liên hệ */}
                        <Link to={`/contact/${order._id}`} className="btn btn-outline">
                            Liên hệ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;