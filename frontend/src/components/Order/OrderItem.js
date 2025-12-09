import React from 'react';
import { formatMoney } from '../../utils/orderHelpers';

const OrderItem = ({ item }) => {
    return (
        <div className="order-item">
            <img 
                src={item.image || "https://via.placeholder.com/80"} 
                alt={item.name} 
                className="item-image"
            />
            
            <div className="item-details">
                <h6 className="item-name">{item.name}</h6>
                <div className="item-variant">
                    Phân loại hàng: {item.color}, {item.size}
                </div>
                <div className="item-qty">x{item.quantity}</div>
            </div>

            <div className="item-pricing">
                <span className="price-old">{formatMoney(item.price * 1.2)}</span>
                <span className="price-current">{formatMoney(item.price)}</span>
            </div>
        </div>
    );
};

export default OrderItem;