import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = () => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h.01M8 8h.01"></path>
                    <path d="M12 16c-2 0-3-1-3-1"></path>
                </svg>
            </div>
            <h2 className="empty-state-title">Chưa có đơn hàng nào</h2>
            <p className="empty-state-subtitle">Hãy mua sắm những sản phẩm tuyệt vời ngay bây giờ</p>
            <Link to="/" className="empty-state-btn">
                <span>🛍️</span> Bắt đầu mua sắm
            </Link>
            <div className="empty-state-footer">
                <p className="empty-state-hint">💡 Gợi ý: Sử dụng tính năng tìm kiếm để khám phá sản phẩm yêu thích</p>
            </div>
        </div>
    );
};

export default EmptyState;