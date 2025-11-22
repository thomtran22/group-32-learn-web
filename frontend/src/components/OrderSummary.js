import React from "react";
import { Link } from 'react-router-dom';
import visaLogo from '../assets/images/Visa_Inc._logo.svg.png';
import mastercardLogo from '../assets/images/Mastercard-logo.svg.webp';
const OrderSummary = ({total}) => {
    return (
        <aside className="order-summary">
            <h2>Tóm tắt đơn hàng</h2>
            <div className="summary-row">
                <span>Subtotal</span>
                <span>{total} VND</span>
            </div>
            <div className="summary-row total">
                <span>Tổng</span>
                <span>{total} VND</span>
            </div>

            <Link to="/checkout">
                <button className="btn-checkout">THANH TOÁN</button>
            </Link>
            <div className="coupon-section">
                <p className="coupon-title">Mã giảm giá</p>
                <div className="coupon-input">
                    <input type="text" placeholder="Coupon code"/>
                    <button>Áp dụng</button>
                </div>
            </div>
            <p className="shipping-info">Freeship cho đơn hàng nguyên giá từ 500.000đ</p>
            <div className="payment-methods">
                <p>Chúng tôi chấp nhận</p>
                <img src={visaLogo} alt="Visa" height="20" />
                <img src={mastercardLogo} alt="Mastercard" height="20" />
            </div>
        </aside>
    );
};

export default OrderSummary;