import React  from "react";

import {useCart} from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
    const { cartItems, handleRemoveItem, handleUpdateQuantity, totalAmountFormatted } = useCart();

    return (
        <>
          <div className="container">

              <div className="cart-layout">
                  {/* Cột bên trái: Chi tiết giỏ hàng */}
                  <section className="cart-details">
                      <div className="cart-table">
                          {/* Tiêu đề bảng */}
                          <div className="cart-header">
                              <div className="header-item product-col">Product</div>
                              <div className="header-item">Price</div>
                              <div className="header-item">Quantity</div>
                              <div className="header-item subtotal-col">Subtotal</div>
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
                  <OrderSummary total={totalAmountFormatted}/>
              </div>
          </div>
        </>
    );
};

export default Cart;