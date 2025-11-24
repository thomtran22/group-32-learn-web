import React, {createContext, useState, useContext} from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Áo sơ mi nam SKDTK601',
            image: require('../assets/images/image-34.png'),
            color: 'Xanh Indigo',
            size: 'L',
            price: 379000,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Áo polo nam POHTK404',
            image: require('../assets/images/image-34.png'),
            color: 'Đen',
            size: 'XL',
            price: 479000,
            quantity: 1,
        }
    ]);

    const totalAmount = cartItems.reduce((sum,item) => sum + item.price * item.quantity, 0);

    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');
    
    const handleRemoveItem = (itemId) => {
        const updateCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updateCart);
    };
    
    const handleUpdateQuantity = (itemId, newQuantity) => {
        if(newQuantity < 1) return;

        const updateCart = cartItems.map(item => {
            if(item.id === itemId) {
                return {
                    ...item,
                    quantity: newQuantity
                };
            }

            return item;
        });

        setCartItems(updateCart);
    };

    const value = {
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        totalAmount, // Chia sẻ cả số
        totalAmountFormatted // Và chuỗi đã format
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};