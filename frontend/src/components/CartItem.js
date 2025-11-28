import React, { useState, useRef, useEffect } from "react";
import { useCart } from '../context/CartContext'; // Import context để lấy hàm update

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    const { updateItemVariant } = useCart();
    
    // State quản lý Popup
    const [showPopup, setShowPopup] = useState(false);
    
    // State tạm khi người dùng đang chọn trong popup (chưa bấm Xác nhận)
    const [tempColor, setTempColor] = useState(item.color);
    const [tempSize, setTempSize] = useState(item.size);
    
    const popupRef = useRef(null);

    // Format tiền
    const priceFormatted = item.price.toLocaleString('vi-VN');
    const subtotalFormatted = (item.price * item.quantity).toLocaleString('vi-VN');

    // Xử lý click ngoài để đóng popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Hàm xác nhận đổi
    const handleConfirmVariant = () => {
        updateItemVariant(item.itemId, { color: tempColor, size: tempSize });
        setShowPopup(false);
    };

    // Nếu không có danh sách màu/size (do chưa populate hoặc lỗi), dùng mảng rỗng
    const colors = item.availableColors && item.availableColors.length > 0 ? item.availableColors : [item.color];
    const sizes = item.availableSizes && item.availableSizes.length > 0 ? item.availableSizes : [item.size];

    return (
        <div className="cart-item">
            <div className="product-col">
                <img src={item.image} alt={item.name} />
                <div className="product-info">
                    <a href="#" className="product-name">{item.name}</a>
                    
                    {/* === KHU VỰC PHÂN LOẠI HÀNG === */}
                    <div className="variant-selector" ref={popupRef}>
                        
                        {/* Nút bấm mở popup */}
                        <div className="variant-btn" 
                            onClick={() => {
                                setShowPopup(!showPopup);
                                setTempColor(item.color); // Reset về giá trị hiện tại khi mở
                                setTempSize(item.size);
                            }}
                        >
                            <span>Phân loại: {item.color}, {item.size}</span>
                            <i className="fas fa-caret-down"></i>
                        </div>

                        {/* POPUP SHOPEE STYLE */}
                        {showPopup && (
                            <div className="variant-popup">
                                {/* Chọn Màu */}
                                <div className="popup-section">
                                    <span className="popup-label">Màu sắc:</span>
                                    <div className="popup-options">
                                        {colors.map(c => (
                                            <button className={`option-btn ${tempColor === c ? 'active' : ''}`}
                                                key={c}
                                                onClick={() => setTempColor(c)}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Chọn Size */}
                                <div className="popup-section">
                                    <span className="popup-label">Size:</span>
                                    <div className="popup-options">
                                        {sizes.map(s => (
                                            <button className={`option-btn ${tempSize === s ? 'active' : ''}`}
                                                key={s}
                                                onClick={() => setTempSize(s)}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="popup-actions">
                                    <button 
                                        className="btn-back"
                                        onClick={() => setShowPopup(false)}
                                    >
                                        Trở lại
                                    </button>
                                    <button 
                                        className="btn-confirm"
                                        onClick={handleConfirmVariant}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* === HẾT KHU VỰC PHÂN LOẠI === */}

                    <button 
                        className="remove-item-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                                onRemove(item.itemId); // Sử dụng itemId để xóa chính xác dòng này
                            }
                        }}
                    >
                        Xóa
                    </button>
                </div>
            </div>

            <div className="price-col">{priceFormatted} VND</div>
            
            <div className="quantity-col">
                <div className="quantity-selector">
                    <button 
                        className="btn-quantity minus"
                        onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)} // Dùng itemId
                    >-</button>
                    <input type="number" value={item.quantity} min="1" readOnly/>
                    <button 
                        className="btn-quantity plus"
                        onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)} // Dùng itemId
                    >+</button>
                </div>
            </div>
            
            <div className="subtotal-col">{subtotalFormatted} VND</div>
        </div>
    );
};

export default CartItem;