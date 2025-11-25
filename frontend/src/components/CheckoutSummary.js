import React from 'react';

// Nhận thêm props: paymentMethod, setPaymentMethod, totalNumber
const CheckoutSummary = ({ items, totalFormatted, totalNumber, onSubmit, paymentMethod, setPaymentMethod }) => {
  
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
          <span style={{color: '#d32f2f', fontWeight: 'bold'}}>{totalFormatted}</span>
        </div>
      </div>

      {/* --- PHẦN CHỌN PHƯƠNG THỨC THANH TOÁN (MỚI) --- */}
      <div className="payment-methods-container" style={{marginTop: '20px'}}>
        <h3 style={{fontSize: '16px', marginBottom: '15px'}}>Phương thức thanh toán</h3>
        
        {/* 1. Option COD */}
        <div 
            className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('COD')}
        >
            <input type="radio" checked={paymentMethod === 'COD'} readOnly />
            <label>Thanh toán khi nhận hàng (COD)</label>
        </div>

        {/* 2. Option Banking (Hiện QR) */}
        <div 
            className={`payment-option ${paymentMethod === 'BANKING' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('BANKING')}
        >
            <input type="radio" checked={paymentMethod === 'BANKING'} readOnly />
            <label>Chuyển khoản ngân hàng</label>
            
            {/* Chỉ hiện QR khi chọn Banking */}
            {paymentMethod === 'BANKING' && (
                <div className="qr-code-box">
                    <p>Quét mã để thanh toán:</p>
                    {/* Tạo QR động theo số tiền totalNumber */}
                    <img 
                        src={`https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${totalNumber}&addInfo=DH MUA HANG`} 
                        alt="QR Code" 
                    />
                    <div className="bank-info">
                        <small>Ngân hàng: MB Bank</small><br/>
                        <small>STK: 0987654321</small>
                    </div>
                </div>
            )}
        </div>

        {/* 3. Option VNPay */}
        <div 
            className={`payment-option ${paymentMethod === 'VNPAY' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('VNPAY')}
        >
            <input type="radio" checked={paymentMethod === 'VNPAY'} readOnly />
            <label style={{display: 'flex', alignItems: 'center'}}>
                Thanh toán qua VNPAY 
                <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087_1566974273.svg" alt="VNPay" style={{height: '15px', marginLeft: '5px'}}/>
            </label>
        </div>
      </div>
      {/* --- HẾT PHẦN THANH TOÁN --- */}

      <button type="submit" className="btn-place-order" onClick={onSubmit}>
          {paymentMethod === 'VNPAY' ? 'TIẾP TỤC QUA VNPAY' : 'ĐẶT HÀNG'}
      </button>
    </aside>
  );
};

export default CheckoutSummary;