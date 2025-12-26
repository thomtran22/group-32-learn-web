import React, { useState, useEffect }  from "react";
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { motion } from "framer-motion"; // Thêm thư viện animation
import { Link } from "react-router-dom"; // Dùng Link thay thẻ a để chuyển trang mượt hơn

const Cart = () => {
    const { 
        cartItems,
        loadCart,
        handleRemoveItem,
        handleUpdateQuantity,
        selectedTotal,
        selectedTotalFormatted,
        selectedItems,
        onCheckoutClick,
        handleDeleteSelected,
        handleToggleSelect
    } = useCart();
    
    // Thêm state loading để tránh giật khi vừa vào trang
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Tự động cuộn lên đầu trang khi component được mở (Focus đẹp)
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Load dữ liệu
        if (typeof loadCart === 'function') {
            loadCart().finally(() => {
                // Delay nhẹ để hiệu ứng mượt hơn
                setTimeout(() => setIsLoading(false), 300);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    // Cấu hình Animation: Trượt nhẹ từ dưới lên và hiện dần
    const pageAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Màn hình Loading đơn giản (giữ nguyên style container của bạn)
    if (isLoading) {
        return (
            <div className="container" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Đang tải giỏ hàng...</p>
            </div>
        );
    }

    {/*Nếu giỏ hàng trống*/}
    if(cartItems.length === 0) {
        return (
            <motion.div 
                className="container"
                initial="hidden" animate="visible" variants={pageAnimation}
            >
                <div className="empty-cart">
                    <i className="fas fa-shopping-cart" style={{fontSize: '80px', color: '#ccc'}}></i>
                    <h2>Giỏ hàng trống</h2>
                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    {/* Đổi thẻ a thành Link để không reload lại trang */}
                    <Link to="/" className="btn-continue-shopping">
                        <i className="fas fa-arrow-left"></i> Tiếp tục mua sắm
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        // Thay thẻ div bao ngoài bằng motion.div để có hiệu ứng
        <motion.div 
            className="container"
            initial="hidden" 
            animate="visible" 
            variants={pageAnimation}
        >
            <div className="cart-layout">
                {/* Cột bên trái: Chi tiết giỏ hàng */}
                <section className="cart-details">
                    <div className="bulk-actions">
                        {selectedItems.length > 0 && (
                            <button 
                                onClick={handleDeleteSelected}
                                className="btn-delete-selected"
                            >
                                <i className="fas fa-trash-alt"></i>
                                <span>Xóa ({selectedItems.length}) sản phẩm đã chọn</span>
                            </button>
                        )}
                    </div>

                    <div className="cart-table">
                        {/* Tiêu đề bảng */}
                        <div className="cart-header">
                            <div className="checkbox-col"></div>
                            <div className="product-col">SẢN PHẨM</div>
                            <div className="price-col">ĐƠN GIÁ</div>
                            <div className="quantity-col">SỐ LƯỢNG</div>
                            <div className="subtotal-col">SỐ TIỀN</div> 
                        </div>

                        {cartItems.map(item => (
                            <CartItem 
                                key={item.itemId}
                                item={item} 
                                onRemove = {handleRemoveItem}
                                onUpdateQuantity = {handleUpdateQuantity}
                                isSelected={selectedItems.includes(item.itemId)}
                                onToggleSelect={handleToggleSelect}
                            />
                        ))}
                    </div>
                </section>

                {/* Cột bên phải: Tóm tắt đơn hàng */}
                <OrderSummary 
                    totalString={selectedTotalFormatted}
                    totalNumber={selectedTotal}
                    onCheckout={onCheckoutClick} 
                    itemCount={selectedItems.length}  
                />
            </div>
        </motion.div>
    );
};

export default Cart;