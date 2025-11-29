import React, { useState }  from "react";

import {useCart} from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
    const { 
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        selectedTotal,
        selectedTotalFormatted,
        selectedItems,
        onCheckoutClick,
        handleDeleteSelected,
        handleToggleSelect,

        handleCheckout
    } = useCart();
    
    {/*Nếu giỏ hàng trống*/}
    if(cartItems.length === 0) {
        return (
            <div className="container">
                <div className="empty-cart">
                    <i className="fas fa-shopping-cart" style={{fontSize: '80px', color: '#ccc'}}></i>
                    <h2>Giỏ hàng trống</h2>
                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <a href="/" className="btn-continue-shopping">
                        <i className="fas fa-arrow-left"></i> Tiếp tục mua sắm
                    </a>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="container">

                <div className="cart-layout">
                    {/* Cột bên trái: Chi tiết giỏ hàng */}
                    <section className="cart-details">
                        <div className="bulk-actions">
                            {selectedItems.length > 0 && (
                                <button 
                                    onClick={handleDeleteSelected}
                                    className="btn-delete-selected"
                                >
                                    <i className="fas fa-trash-alt"></i> {/* Thêm icon thùng rác cho đẹp */}
                                    <span>Xóa ({selectedItems.length}) sản phẩm đã chọn</span>
                                </button>
                            )}
                        </div>

                        <div className="cart-table">
                            {/* Tiêu đề bảng */}
                            <div className="cart-header">
                                <div className="header-item product-col">SẢN PHẨM</div>
                                <div className="header-item">GIÁ</div>
                                <div className="header-item">SỐ LƯỢNG</div>
                                <div className="header-item subtotal-col">ĐƠN GIÁ</div>
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
            </div>
        </>
    );
};

export default Cart;