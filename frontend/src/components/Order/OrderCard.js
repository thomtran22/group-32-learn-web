import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney, getStatusInfo } from '../../utils/orderHelpers';
import OrderItem from './OrderItem';

const OrderCard = ({ order }) => {
    const statusInfo = getStatusInfo(order.status);

    return (
        <div className="order-card">
            {/* Header */}
            <div className="order-card__header">
                <div className="shop-info">
                    <span>SHOP THỜI TRANG</span>
                    <Link to={`/orders/${order._id}`} className="btn-view-shop">
                        Xem shop
                    </Link>
                </div>
                <div className="status-group">
                    <span className="status-text" style={{ color: statusInfo.color }}>
                        {statusInfo.icon} {statusInfo.text}
                    </span>
                    <div className="separator"></div>
                    <span className="payment-method">
                        {order.paymentMethod === 'COD' ? 'COD' : 'ONLINE'}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="order-card__body" onClick={() => window.location.href = `/orders/${order._id}`}>
                {order.orderItems.map((item) => (
                    <OrderItem key={item._id} item={item} />
                ))}
            </div>

            {/* Footer */}
            <div className="order-card__footer">
                <div className="total-section">
                    <span style={{color: '#757575'}}>Thành tiền:</span>
                    <span className="total-price">{formatMoney(order.totalPrice)}</span>
                </div>

                <div className="action-buttons">
                    <span className="shipping-status">
                        {order.status === 'Shipping' ? 'Đơn hàng đang được vận chuyển' : ''}
                    </span>

                    {order.status === 'Delivered' ? (
                        <>
                            <button className="btn btn-primary">Đánh giá</button>
                            <button className="btn btn-secondary">Mua lại</button>
                        </>
                    ) : order.status === 'Pending' ? (
                        <button className="btn btn-danger">Hủy đơn hàng</button>
                    ) : (
                        <button className="btn btn-secondary" disabled>Đã nhận hàng</button>
                    )}

                    <Link to={`/orders/${order._id}`} className="btn btn-secondary">
                        Liên hệ Shop
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;