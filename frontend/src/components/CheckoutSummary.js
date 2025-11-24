// src/components/CheckoutSummary.jsx
import React from 'react';

// Nhận props 'items' và 'total'
const CheckoutSummary = ({ items, total, onSubmit }) => {
  return (
    <aside className="your-order">
      <h2 className="section-title">ĐƠN HÀNG CỦA BẠN</h2>
      <div className="order-summary">
        <div className="summary-header">
          <span>SẢN PHẨM</span>
          <span>TỔNG TIỀN HÀNG</span>
        </div>
        
        {/* DÙNG .map() ĐỂ HIỂN THỊ DANH SÁCH SẢN PHẨM */}
        {items.map(item => (
          <div className="summary-item" key={item.id}>
            <div>
              <p className="product-name">{item.name} × {item.quantity}</p>
              <p className="product-meta">Màu sắc: {item.color}, Cỡ: {item.size}</p>
            </div>
            <span className="product-price">
              {(item.price * item.quantity).toLocaleString('vi-VN')} VND
            </span>
          </div>
        ))}

        {/* HIỂN THỊ TỔNG TIỀN */}
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{total} VND</span>
        </div>
        <div className="summary-row total">
          <span>Tổng</span>
          <span>{total} VND</span>
        </div>
      </div>
      <div className="payment-method">
        <p>Trả tiền mặt khi nhận hàng</p>
        <span>Trả tiền mặt khi giao hàng</span>
      </div>
      <button type="submit" className="btn-place-order" onClick={onSubmit}>ĐẶT HÀNG</button>
    </aside>
  );
};

export default CheckoutSummary;