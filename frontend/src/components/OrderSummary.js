import React from "react";
import { Link } from 'react-router-dom';
import visaLogo from '../assets/images/Visa_Inc._logo.svg.png';
import mastercardLogo from '../assets/images/Mastercard-logo.svg.webp';
const OrderSummary = ({totalString, totalNumber}) => {

    const shippingFee = totalNumber >= 500000 ? 0 : 30000;

    const finalTotal = totalNumber + shippingFee;

    const shippingFeeString = shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString('vi-VN')} VND`;
    const finalTotalString = finalTotal.toLocaleString('vi-VN');

    const isFreeShip = shippingFee === 0;
    return (
        <aside className="order-summary">
            <h2>Tóm tắt đơn hàng</h2>
            
            <div className="summary-row">
                <span>Tạm tính</span>
                <span>{totalString} VND</span>
            </div>

            <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span className={`shipping-fee ${isFreeShip ? 'free' : ''}`}>
                    {shippingFeeString}
                </span>
            </div>

            {/* Đường kẻ phân cách */}
            <div className="summary-divider"></div>

            <div className="summary-row total-row">
                <span>Tổng</span>
                <span className="total-price">{finalTotalString}  VND</span>
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
            
            <div className={`shipping-alert ${isFreeShip ? 'success' : 'warning'}`}>
                {isFreeShip ? (
                    <p>
                        <i className="fas fa-check-circle"></i> Đơn hàng của bạn được <strong>Freeship</strong>!
                    </p>
                ) : (
                    <p>
                        Mua thêm <strong>{(500000 - totalNumber).toLocaleString('vi-VN')}đ</strong> để được Freeship.
                    </p>
                )}
            </div>

            <div className="payment-methods">
                <p>Chúng tôi chấp nhận</p>
                <img src={visaLogo} alt="Visa" height="20" />
                <img src={mastercardLogo} alt="Mastercard" height="20" />
            </div>
        </aside>
    );
};

export default OrderSummary;