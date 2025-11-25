import React from "react";
import { Link } from 'react-router-dom';

const CartItem = ({item, onRemove, onUpdateQuantity}) => {
    const priceFormatted = item.price.toLocaleString('vi-VN');
    const subtotalFormatted = (item.price * item.quantity).toLocaleString('vi-VN');

    return (
        <div className="cart-item">
            <div className="product-col">
                <img src={item.image} alt={item.name} />
                <div className="product-info">
                    <a href="#" className="product-name">{item.name}</a>
                    <p>Màu sắc: {item.color}</p>
                    <p>Cỡ: {item.size}</p>
                    <a
                        href="#"
                        className="remove-item"
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove(item.id);
                        }}
                    >Xoá</a>
                </div>
            </div>
            <div className="price-col">{priceFormatted} VND</div>
            <div className="quantity-col">
                <div className="quantity-selector">
                    <button 
                        className="btn-quantity minus"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <input type="number" value={item.quantity} min="1" readOnly/>
                    <button 
                        className="btn-quantity plus"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                </div>
            </div>
            <div className="subtotal-col">{subtotalFormatted} VND</div>
        </div>
    );
};

export default CartItem;