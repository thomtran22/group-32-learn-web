import React from 'react';

import VnPayLogo from "../assets/images/vnpay.png"

const CheckoutSummary = ({ items ,totalAmount, totalAmountFormatted, onSubmit, paymentMethod, setPaymentMethod }) => {
  
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
        
        {/* 1. Thanh toán khi nhận hàng (COD) */}
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

        {/* 2. Chuyển khoản ngân hàng (QR Code) */}
        <div className={`payment-option ${paymentMethod === 'BANKING' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('BANKING')}>
          
          <input type="radio" name="payment" checked={paymentMethod === 'BANKING'} onChange={() => {}} />
          <label>
            <i className="fas fa-qrcode"></i>
            Chuyển khoản ngân hàng (QR Code)
          </label>
          
          {/* Hiện QR Code khi chọn Banking */}
          {paymentMethod === 'BANKING' && (
            <div className="qr-code-box">
              <p className="qr-title">
                <i className="fas fa-mobile-alt"></i> 
                Quét mã QR để thanh toán
              </p>
              <div className="qr-image-wrapper">
                <img 
                  src={`https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${totalAmount}&addInfo=Thanh toan don hang&accountName=CONG TY ABC`}
                  alt="QR Code Thanh Toán" 
                  className="qr-image"
                />
              </div>
              <div className="bank-info">
                <div className="bank-row">
                  <span className="bank-label">Ngân hàng:</span>
                  <span className="bank-value">MB Bank (Quân đội)</span>
                </div>
                <div className="bank-row">
                  <span className="bank-label">Số tài khoản:</span>
                  <span className="bank-value">0987654321</span>
                </div>
                <div className="bank-row">
                  <span className="bank-label">Chủ tài khoản:</span>
                  <span className="bank-value">CONG TY ABC</span>
                </div>
                <div className="bank-row">
                  <span className="bank-label">Số tiền:</span>
                  <span className="bank-value total-amount">{totalAmountFormatted} VND</span>
                </div>
                <div className="bank-note">
                  <i className="fas fa-info-circle"></i>
                  Nội dung: <strong>Thanh toan don hang</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Thanh toán qua VNPay */}
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