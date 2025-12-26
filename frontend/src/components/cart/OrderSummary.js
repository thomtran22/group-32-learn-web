import React from "react";
import visaLogo from '../../assets/images/Visa_Inc._logo.svg.png';
import mastercardLogo from '../../assets/images/Mastercard-logo.svg.webp';

const OrderSummary = ({totalString, totalNumber, onCheckout, itemCount}) => {
    
    // Config mức Freeship
    const FREE_SHIP_THRESHOLD = 500000;
    const shippingFee = (totalNumber >= FREE_SHIP_THRESHOLD) ? 0 : 30000;
    const displayShipping = totalNumber === 0 ? 0 : shippingFee;
    const finalTotal = totalNumber + displayShipping; 
    
    // Tính % cho thanh progress
    const progressPercent = Math.min((totalNumber / FREE_SHIP_THRESHOLD) * 100, 100);
    const missingAmount = FREE_SHIP_THRESHOLD - totalNumber;

    const shippingFeeString = displayShipping === 0 ? "Miễn phí" : `${displayShipping.toLocaleString('vi-VN')} VND`;
    const finalTotalString = finalTotal.toLocaleString('vi-VN');

    return (
        <aside className="order-summary">
            {/* --- NEW: FREE SHIPPING PROGRESS BAR --- */}
            <div className="freeship-progress-box">
                <div className="progress-title">
                    {totalNumber >= FREE_SHIP_THRESHOLD ? (
                        <span className="success-text"><i className="fas fa-check-circle"></i> Bạn đã được <strong>Freeship</strong>!</span>
                    ) : (
                        <span>Mua thêm <strong>{missingAmount.toLocaleString('vi-VN')}đ</strong> để được Freeship</span>
                    )}
                </div>
                <div className="progress-bar-bg">
                    <div 
                        className="progress-bar-fill" 
                        style={{width: `${progressPercent}%`}}
                    >
                        {progressPercent > 10 && <i className="fas fa-shipping-fast truck-icon"></i>}
                    </div>
                </div>
            </div>
            {/* --------------------------------------- */}

            <h2>Tóm tắt đơn hàng</h2>
            
            <div className="summary-row">
                <span>Tạm tính ({itemCount} sản phẩm)</span>
                <span>{totalString} VND</span>
            </div>

            <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span className={`shipping-fee ${displayShipping === 0 ? 'free' : ''}`}>
                    {itemCount === 0 ? "0 VND" : shippingFeeString}
                </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
                <span>Tổng tiền</span>
                <span className="total-price">{finalTotalString} VND</span>
            </div>

            <button 
                className="btn-checkout" 
                onClick={onCheckout}
                disabled={itemCount === 0} 
            >
                THANH TOÁN NGAY
                <i className="fas fa-arrow-right" style={{marginLeft: '10px'}}></i>
            </button>

            <div className="coupon-section">
                <div className="coupon-input">
                    <i className="fas fa-ticket-alt coupon-icon"></i>
                    <input type="text" placeholder="Nhập mã giảm giá"/>
                    <button>Áp dụng</button>
                </div>
            </div>
            
            <div className="payment-methods">
                <p>Chấp nhận thanh toán</p>
                <div className="logos">
                    <img src={visaLogo} alt="Visa" />
                    <img src={mastercardLogo} alt="Mastercard" />
                </div>
                <p className="security-note"><i className="fas fa-shield-alt"></i> Bảo mật thanh toán 100%</p>
            </div>
        </aside>
    );
};

export default OrderSummary;