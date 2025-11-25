import React, {createContext, useState, useContext, useEffect} from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : []; // Kiểm tra trong LocalStorage nếu có thì truyền vào
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    const totalAmount = cartItems.reduce((total,item) => {
        return total + (item.price * item.quantity);
    }, 0);

    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');
    
    const handleRemoveItem = (itemId) => {
        const updateCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updateCart);
    };
    
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === product.id && 
                        item.color === product.color && 
                        item.size === product.size
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && 
                    item.color === product.color && 
                    item.size === product.size
                    ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            }
            return [...prevItems, product];
        });
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

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        totalAmount, // Chia sẻ cả số
        totalAmountFormatted, // Và chuỗi đã format
        addToCart,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};