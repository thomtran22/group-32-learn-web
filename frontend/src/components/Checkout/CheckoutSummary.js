import React from 'react';

import VnPayLogo from "../../assets/images/vnpay.png"

const CheckoutSummary = ({ items=[] ,totalAmount, totalAmountFormatted, onSubmit, paymentMethod, setPaymentMethod }) => {
  
  if (!items || items.length === 0) {
      return <div>Không có sản phẩm nào để thanh toán</div>;
  }
  
  return (
    <aside className="your-order">
      <h2 className="section-title">ĐƠN HÀNG CỦA BẠN</h2>
      <div className="order-summary">
        <div className="summary-header">
          <span>SẢN PHẨM</span>
          <span>TỔNG TIỀN HÀNG</span>
        </div>
        
        {items.map(item => (
          <div className="summary-item" key={item.id}>
            <div>
              <p className="product-name">{item.name} × {item.quantity}</p>
              <p className="product-meta">Màu: {item.color}, Size: {item.size}</p>
            </div>
            <span className="product-price">
              {(item.price * item.quantity).toLocaleString('vi-VN')} VND
            </span>
          </div>
        ))}

        <div className="summary-row total">
          <span>Tổng cộng</span>
          <span className="total-amount">{totalAmountFormatted} VND</span>
        </div>
      </div>

      {/* PHẦN CHỌN PHƯƠNG THỨC THANH TOÁN */}
      <div className="payment-methods-container">
        <h3 className="payment-title">Phương thức thanh toán</h3>
        
        {/* Thanh toán khi nhận hàng (COD) */}
        <div 
          className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('COD')}
        >
          <input 
            type="radio" 
            name="payment" 
            checked={paymentMethod === 'COD'} 
            onChange={() => {}} 
          />
          <label>
            <i className="fas fa-money-bill-wave"></i>
            Thanh toán khi nhận hàng (COD)
          </label>
        </div>

        {/* Thanh toán qua VNPay */}
        <div 
          className={`payment-option ${paymentMethod === 'VNPAY' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('VNPAY')}
        >
          <input 
            type="radio" 
            name="payment" 
            checked={paymentMethod === 'VNPAY'} 
            onChange={() => {}} 
          />
          <label className="vnpay-label">
            Thanh toán qua VNPay
            <img 
              src={VnPayLogo} 
              alt="VNPay" 
              className="vnpay-logo"
            />
          </label>
          {paymentMethod === 'VNPAY' && (
            <div className="vnpay-note">
              <i className="fas fa-info-circle"></i>
              Bạn sẽ được chuyển sang cổng thanh toán VNPay
            </div>
          )}
        </div>
      </div>

      <button type="submit" className="btn-place-order" onClick={onSubmit}>
        {paymentMethod === 'VNPAY' ? (
          <>
            <i className="fas fa-arrow-right"></i> TIẾP TỤC QUA VNPAY
          </>
        ) : (
          <>
            <i className="fas fa-check"></i> ĐẶT HÀNG
          </>
        )}
      </button>
    </aside>
  );
};

export default CheckoutSummary;