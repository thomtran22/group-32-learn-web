import React from 'react';
import { formatMoney } from '../../utils/orderHelpers';

const OrderItem = ({ item }) => {
    // Kiểm tra item có tồn tại không
    if (!item) {
        return null;
    }

    // Lấy giá trị với fallback để tránh lỗi undefined
    const itemName = item.name || 'Sản phẩm không tên';
    const itemImage = item.image || "https://via.placeholder.com/150";
    const itemColor = item.color || 'N/A';
    const itemSize = item.size || 'N/A';
    const itemQuantity = item.quantity || 0;
    const itemPrice = item.price || 0;
    
    // Tính giá cũ (nếu có originalPrice thì dùng, không thì tính từ giá hiện tại)
    const originalPrice = item.originalPrice || (itemPrice * 1.2);

    return (
        <div className="order-item">
            <div className="item-image-wrapper">
                <img 
                    src={itemImage} 
                    alt={itemName} 
                />
            </div>
            
            <div className="item-details">
                <h6 className="item-name">{itemName}</h6>
                <div className="item-variant">
                    Phân loại hàng: {itemColor}, {itemSize}
                </div>
                <div className="item-qty">x{itemQuantity}</div>
            </div>

            <div className="item-pricing">
                {originalPrice > itemPrice && (
                    <span className="price-old">{formatMoney(originalPrice)}</span>
                )}
                <span className="price-current">{formatMoney(itemPrice)}</span>
            </div>
        </div>
    );
};

export default OrderItem;