import React  from "react";

import {useCart} from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
    const { cartItems, handleRemoveItem, handleUpdateQuantity,totalAmount, totalAmountFormatted } = useCart();

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
                        <div className="cart-table">
                            {/* Tiêu đề bảng */}
                            <div className="cart-header">
                                <div className="header-item product-col">SẢN PHẨM</div>
                                <div className="header-item">GIÁ</div>
                                <div className="header-item">SỐ LƯỢNG</div>
                                <div className="header-item subtotal-col">ĐƠN GIÁ</div>
                            </div>

                            {cartItems.map(product => (
                                <CartItem 
                                    key={product.id}
                                    item={product} 
                                    onRemove = {handleRemoveItem}
                                    onUpdateQuantity = {handleUpdateQuantity}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Cột bên phải: Tóm tắt đơn hàng */}
                    <OrderSummary 
                        totalString={totalAmountFormatted}
                        totalNumber={totalAmount}
                    />
                </div>
            </div>
        </>
    );
};

export default Cart;