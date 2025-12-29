import React, { useState, useRef, useEffect } from "react";
import { useCart } from '../../context/CartContext'; // Import context để lấy hàm update
import Swal from 'sweetalert2';

const CartItem = ({ item, onRemove, onUpdateQuantity, isSelected, onToggleSelect }) => {
    const { updateItemVariant, cartItems } = useCart();

    // State quản lý Popup
    const [showPopup, setShowPopup] = useState(false);

    // State tạm khi người dùng đang chọn trong popup (chưa bấm Xác nhận)
    const [tempColor, setTempColor] = useState(item.color);
    const [tempSize, setTempSize] = useState(item.size);

    const popupRef = useRef(null);

    // Lấy variants từ item (được CartContext truyền vào)
    const variants = item.variants || [];

    // Reset lại state tạm mỗi khi mở popup hoặc khi item thay đổi bên ngoài
    useEffect(() => {
        if (showPopup) {
            setTempColor(item.color);
            setTempSize(item.size);
        }
    }, [showPopup, item.color, item.size]);

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

    // Hàm kiểm tra trạng thái của một Option (Màu hoặc Size)
    const getOptionStatus = (type, value) => {
        const targetColor = type === 'color' ? value : tempColor;
        const targetSize = type === 'size' ? value : tempSize;

        // 1. Nếu là chính nó hiện tại -> Không disable
        if (targetColor === item.color && targetSize === item.size) {
            return { disabled: false, reason: "" };
        }

        // 2. CHECK TỒN KHO (Logic mới theo DB Variants)
        // Nếu sản phẩm có variants, ta phải check xem combo này có tồn tại và còn hàng không
        if (variants.length > 0) {
            const variantExist = variants.find(v =>
                v.color === targetColor &&
                v.size === targetSize &&
                v.quantity > 0
            );

            if (!variantExist) {
                return { disabled: true, reason: "Hết hàng hoặc không tồn tại" };
            }
        }

        //Check trùng trong giỏ hàng
        const isDuplicate = cartItems.some(cartItem =>
            cartItem.productId === item.productId && // Cùng loại sản phẩm
            cartItem.itemId !== item.itemId &&       // Khác dòng hiện tại
            cartItem.color === targetColor &&        // Trùng màu dự kiến
            cartItem.size === targetSize             // Trùng size dự kiến
        );

        if (isDuplicate) {
            return { disabled: true, reason: "Sản phẩm này đã có trong giỏ hàng" };
        }

        return { disabled: false, reason: "" };
    };

    const handleDeleteClick = (e) => {
        e.preventDefault(); // Chặn hành động mặc định của thẻ (nếu có)
        
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: `Bạn muốn xóa sản phẩm "${item.name}" khỏi giỏ hàng?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Màu đỏ
            cancelButtonColor: '#3085d6', // Màu xanh
            confirmButtonText: 'Đúng, xóa nó!',
            cancelButtonText: 'Không, giữ lại'
        }).then((result) => {
            if (result.isConfirmed) {
                onRemove(item.itemId); // Gọi hàm xóa từ Context truyền xuống
            }
        });
    };

    // Format tiền
    const priceFormatted = (item.price || 0).toLocaleString('vi-VN');
    const subtotalFormatted = ((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN');
    // Nếu không có danh sách màu/size (do chưa populate hoặc lỗi), dùng mảng rỗng
    const colors = item.availableColors && item.availableColors.length > 0 ? item.availableColors : [item.color];
    const sizes = item.availableSizes && item.availableSizes.length > 0 ? item.availableSizes : [item.size];

    return (
        <div className="cart-item">
            <div className="checkbox-col">
                <input
                    type="checkbox"
                    checked={isSelected || false}
                    onChange={() => onToggleSelect(item.itemId)}
                    className="item-checkbox"
                />
            </div>

            <div className="product-col">
                <img src={item.image} alt={item.name} />
                <div className="product-info">
                    <a href="#" className="product-name">{item.name}</a>

                    {/* Phân loại hàng*/}
                    <div className="variant-selector" ref={popupRef}>

                        {/* Nút bấm mở popup */}
                        <div className="variant-btn" onClick={() => setShowPopup(!showPopup)}>
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
                                        {colors.map((c, index) => {
                                            const { disabled, reason } = getOptionStatus('color', c);
                                            return (
                                                <button className={`option-btn ${tempColor === c ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                                                    key={index}
                                                    onClick={() => !disabled && setTempColor(c)}
                                                    disabled={disabled}
                                                    title={reason}
                                                >
                                                    {c}
                                                    {tempColor === c && <div className="tick-icon">✓</div>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Chọn Size */}
                                <div className="popup-section">
                                    <span className="popup-label">Size:</span>
                                    <div className="popup-options">
                                        {sizes.map((s, index) => {
                                            const { disabled, reason } = getOptionStatus('size', s);
                                            return (
                                                <button className={`option-btn ${tempSize === s ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                                                    key={index}
                                                    onClick={() => !disabled && setTempSize(s)}
                                                    disabled={disabled}
                                                    title={reason}
                                                >
                                                    {s}
                                                    {tempSize === s && <div className="tick-icon">✓</div>}
                                                </button>
                                            );
                                        })}
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

                    <button
                        className="remove-item-btn"
                        onClick={handleDeleteClick}
                    >
                        <i className="fas fa-trash-alt"></i> 
                        <span>Xóa</span>
                    </button>
                </div>
            </div>

            <div className="price-col">{priceFormatted} VND</div>

            <div className="quantity-col">
                <div className="quantity-selector">
                    <button
                        className="btn-quantity minus"
                        onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)}
                    >-</button>
                    <input type="number" value={item.quantity} min="1" readOnly />
                    <button
                        className="btn-quantity plus"
                        onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)}
                    >+</button>
                </div>
            </div>

            <div className="subtotal-col">{subtotalFormatted} VND</div>
        </div>
    );
};

export default CartItem;