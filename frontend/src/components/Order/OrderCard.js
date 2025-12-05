import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatMoney, getStatusInfo } from '../../utils/orderHelpers';
import OrderItem from './OrderItem';

const OrderCard = ({ order, onCancelOrder, onConfirmReceived }) => {
    const navigate = useNavigate();
    const statusInfo = getStatusInfo(order.status);

    // Xử lý chuyển trang chi tiết mà không reload
    const handleCardClick = (e) => {
        // Ngăn chặn sự kiện click nếu user click vào các nút button bên trong
        if (e.target.closest('button') || e.target.closest('a')) return;
        navigate(`/orders/${order._id}`);
    };

    // Logic hiển thị nút bấm dựa trên trạng thái phức tạp
    const renderOrderActions = () => {
        // 1. Đã giao hàng thành công
        if (order.status === 'Delivered') {
            return (
                <>
                    <button className="btn btn-primary">Đánh giá</button>
                    <button className="btn btn-secondary">Mua lại</button>
                </>
            );
        }

        // 2. Đơn bị hủy
        if (order.status === 'Cancelled') {
            return <button className="btn btn-secondary">Mua lại</button>;
        }

        // 3. Đang giao hàng (Cho phép khách xác nhận đã nhận hàng sớm)
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

        // 4. Chờ xác nhận / Chờ thanh toán (Pending)
        if (order.status === 'Pending') {
            return (
                <>
                    {/* Nếu là VNPay mà chưa trả tiền thì hiện nút thanh toán lại */}
                    {order.paymentMethod === 'VNPAY' && !order.isPaid && (
                        <button 
                            className="btn btn-primary"
                            onClick={() => window.location.href = `/api/payment/create_payment_url/${order._id}`} 
                            // Lưu ý: Chỗ này gọi API lấy link rồi redirect, hoặc link trực tiếp
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

        // 5. Đang xử lý (Processing) - Thường là không cho hủy hoặc nút hủy bị disable
        if (order.status === 'Processing') {
             return <button className="btn btn-secondary" disabled>Đang chuẩn bị hàng</button>;
        }

        return null;
    };

    return (
        <div className="order-card" onClick={handleCardClick}>
            {/* Header */}
            <div className="order-card__header">
                <div className="shop-info">
                    <span className="shop-name">SHOP THỜI TRANG</span>
                    {/* Nút xem shop nên link tới trang Shop chứ không phải trang đơn hàng */}
                    {/* <Link to="/shop/1" className="btn-view-shop">Xem shop</Link> */}
                </div>
                <div className="status-group">
                    <span className="payment-method-badge">
                        {order.paymentMethod}
                    </span>
                    <div className="separator">|</div>
                    <span className="status-text" style={{ color: statusInfo.color }}>
                        {statusInfo.text.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="order-card__body">
                {order.orderItems.map((item) => (
                    <OrderItem key={item._id} item={item} />
                ))}
            </div>

            {/* Footer */}
            <div className="order-card__footer">
                <div className="total-section">
                    <span className="label">Thành tiền:</span>
                    <span className="total-price">{formatMoney(order.totalPrice)}</span>
                </div>

                <div className="action-buttons">
                    {/* Dòng trạng thái text (nằm bên trái) */}
                    <span className="shipping-status-text">
                        {order.status === 'Shipping' ? 'Đơn hàng đang trên đường giao đến bạn' : ''}
                    </span>
                    
                    {/* Gom các nút bấm vào một nhóm (để nằm bên phải) */}
                    <div className="buttons-wrapper">
                        {renderOrderActions()}

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