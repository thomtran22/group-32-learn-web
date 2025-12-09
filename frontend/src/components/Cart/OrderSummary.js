import React from "react";

import visaLogo from '../../assets/images/Visa_Inc._logo.svg.png';
import mastercardLogo from '../../assets/images/Mastercard-logo.svg.webp';

const OrderSummary = ({totalString, totalNumber, onCheckout, itemCount}) => {

    // Nếu tổng >= 500k thì 0đ, ngược lại 30k
    const shippingFee = (totalNumber >= 500000) ? 0 : 30000;
    
    // Nếu chưa chọn gì (totalNumber = 0) thì phí hiển thị là 0 cho hợp lý
    const displayShipping = totalNumber === 0 ? 0 : shippingFee;
    
    const finalTotal = totalNumber + displayShipping; 

    const shippingFeeString = displayShipping === 0 ? "Miễn phí" : `${displayShipping.toLocaleString('vi-VN')} VND`;
    const finalTotalString = finalTotal.toLocaleString('vi-VN');

    // Xác định trạng thái Freeship để dùng cho class và icon
    // (Chỉ coi là Freeship "thành công" nếu có mua hàng VÀ phí ship = 0)
    const isFreeShip = totalNumber > 0 && displayShipping === 0;

    return (
        <aside className="order-summary">
            <h2>Tóm tắt đơn hàng</h2>
            
            <div className="summary-row">
                <span>Đã chọn</span>
                <span>{itemCount} sản phẩm</span>
            </div>

            <div className="summary-row">
                <span>Tạm tính</span>
                <span>{totalString} VND</span>
            </div>

            <div className="summary-row">
                <span>Phí vận chuyển</span>
                {/* Nếu chưa chọn món nào thì không hiện chữ "Miễn phí" màu xanh để tránh hiểu lầm, chỉ hiện 0đ hoặc Miễn phí màu thường */}
                <span className={`shipping-fee ${isFreeShip ? 'free' : ''}`}>
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
                style={{ opacity: itemCount === 0 ? 0.6 : 1, cursor: itemCount === 0 ? 'not-allowed' : 'pointer' }}
            >
                MUA HÀNG ({itemCount})
            </button>

            <div className="coupon-section">
                <p className="coupon-title">Mã giảm giá</p>
                <div className="coupon-input">
                    <input type="text" placeholder="Coupon code"/>
                    <button>Áp dụng</button>
                </div>
            </div>
            
            {/* Chỉ hiện thông báo Shipping Alert khi ĐÃ CÓ sản phẩm được chọn */}
            {totalNumber > 0 && (
                <div className={`shipping-alert ${isFreeShip ? 'success' : 'warning'}`}>
                    {isFreeShip ? (
                        <p>
                            <i className="fas fa-check-circle"></i> Đơn hàng được <strong>Freeship</strong>!
                        </p>
                    ) : (
                        <p>
                            Mua thêm <strong>{(500000 - totalNumber).toLocaleString('vi-VN')}đ</strong> để được Freeship.
                        </p>
                    )}
                </div>
            )}

            <div className="payment-methods">
                <p>Chúng tôi chấp nhận</p>
                <img src={visaLogo} alt="Visa" height="20" />
                <img src={mastercardLogo} alt="Mastercard" height="20" />
            </div>
        </aside>
    );
};

export default OrderSummary;