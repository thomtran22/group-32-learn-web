// --- CheckoutSummary.js ---
import React from 'react';
import VnPayLogo from "../../assets/images/vnpay.png";

const CheckoutSummary = ({ items=[], totalAmount, totalAmountFormatted, onSubmit, paymentMethod, setPaymentMethod, isLoading }) => {
  
  if (!items || items.length === 0) {
      return <div>Không có sản phẩm nào để thanh toán</div>;
  }
  
  return (
    <aside className="your-order">
      <h2 className="section-title">Đơn hàng của bạn</h2> {/* Viết thường cho nhẹ nhàng */}
      
      <div className="order-scroll-container"> {/* Thêm container để scroll nếu danh sách dài */}
        <div className="order-summary">
          {items.map(item => (
            <div className="summary-item" key={item.itemId || item.id}>
              {/* THÊM ẢNH SẢN PHẨM */}
              <div className="product-image-container">
                  <img 
                    src={item.image || "https://placehold.co/60x60?text=No+Img"} 
                    alt={item.name} 
                    className="product-thumb"
                  />
                  <span className="product-qty-badge">{item.quantity}</span>
              </div>

              <div className="product-info">
                <p className="product-name">{item.name}</p>
                <p className="product-meta">{item.color} / {item.size}</p>
              </div>
              
              <span className="product-price">
                {(item.price * item.quantity).toLocaleString('vi-VN')}₫
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="order-calculation">
        <div className="summary-row">
           <span>Tạm tính</span>
           <span>{totalAmountFormatted}₫</span>
        </div>
        <div className="summary-row">
           <span>Phí vận chuyển</span>
           <span>Miễn phí</span>
        </div>
        <div className="summary-row total">
          <span>Tổng cộng</span>
          <span className="total-amount">{totalAmountFormatted}₫</span>
        </div>
      </div>

      {/* PAYMENT METHODS - Giữ nguyên logic, chỉnh CSS */}
      <div className="payment-methods-container">
        <h3 className="payment-title">Thanh toán</h3>
        
        <div 
          className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('COD')}
        >
          <div className="radio-circle"></div> {/* Custom Radio */}
          <label>Thanh toán khi nhận hàng (COD)</label>
          <i className="fas fa-money-bill-wave icon-payment"></i>
        </div>

        <div 
          className={`payment-option ${paymentMethod === 'VNPAY' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('VNPAY')}
        >
           <div className="radio-circle"></div>
          <label className="vnpay-label">
            Thanh toán qua VNPay
            <img src={VnPayLogo} alt="VNPay" className="vnpay-logo"/>
          </label>
        </div>
        
        {paymentMethod === 'VNPAY' && (
            <div className="vnpay-note">
              <i className="fas fa-info-circle"></i>
              Bạn sẽ được chuyển sang cổng thanh toán VNPay để hoàn tất.
            </div>
          )}
      </div>

      <button type="submit" className="btn-place-order" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? (
           <span><i className="fas fa-spinner fa-spin"></i> Đang xử lý...</span>
        ) : paymentMethod === 'VNPAY' ? (
          "Thanh toán VNPay"
        ) : (
          "Đặt hàng ngay"
        )}
      </button>
    </aside>
  );
};

export default CheckoutSummary;