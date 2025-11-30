import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = () => {
    return (
        <div className="empty-state">
            <img 
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781d.png" 
                alt="No orders" 
            />
            <p className="empty-text">Chưa có đơn hàng nào</p>
            <Link to="/" className="btn btn-primary">Mua sắm ngay</Link>
        </div>
    );
};

export default EmptyState;