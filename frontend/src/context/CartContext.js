import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { apiAddToCart, apiViewCart, apiUpdateCart, apiRemoveItem } from "../services/cartApi";
import { useNavigate } from "react-router-dom"; 

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({children}) => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    // Ref này cực quan trọng cho việc Sync khi rời trang
    const cartItemsRef = useRef(cartItems);

    const isLoggedIn = !!localStorage.getItem('token');

    // ================== 1. LOAD GIỎ HÀNG ==================
    useEffect(() => {
        const loadCart = async () => {
            if (isLoggedIn) {
                try {
                    const data = await apiViewCart();
                    if (data.success && data.cart) {
                        const mappedItems = data.cart.items
                            // Lọc bỏ sản phẩm null (trường hợp sản phẩm gốc bị xóa khỏi DB)
                            .filter(item => item.productId) 
                            .map(item => ({
                                id: item.productId._id, 
                                itemId: item._id,       
                                name: item.productId.name,
                                price: item.productId.price,
                                image: item.productId.image,
                                color: item.color,
                                size: item.size,
                                quantity: item.quantity
                            }));
                        setCartItems(mappedItems);
                    }
                } catch (error) {
                    console.error("Lỗi tải giỏ hàng server:", error);
                }
            } else {
                // Khách: Lấy từ LocalStorage
                const savedCart = localStorage.getItem('cartItems');
                if (savedCart) setCartItems(JSON.parse(savedCart));
            }
        };

        loadCart();
    }, [isLoggedIn]);
    
    // ================== 2. CẬP NHẬT REF & LOCALSTORAGE ==================
    // (Đã gộp 2 useEffect thừa thành 1 cái duy nhất ở đây)
    useEffect(() => {
        // Luôn cập nhật Ref để hàm syncCartToServer đọc được state mới nhất
        cartItemsRef.current = cartItems;

        // Chỉ lưu LocalStorage nếu là khách
        if (!isLoggedIn) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn]);

    // ================== 3. HÀM ĐỒNG BỘ SERVER (CORE) ==================
    const syncCartToServer = async () => {
        if (!isLoggedIn) return;

        const currentItems = cartItemsRef.current; // Lấy từ Ref
        // Lưu ý: Vẫn gửi lên dù mảng rỗng (để trường hợp xóa hết giỏ hàng thì server cũng xóa theo)
        
        try {
            console.log("⏳ Đang đồng bộ giỏ hàng lên server...");
            
            const itemsPayload = currentItems.map(item => ({
                productId: item.id || item._id,
                quantity: item.quantity,
                color: item.color,
                size: item.size
            }));
            
            await apiUpdateCart(itemsPayload);
            console.log("✅ Đồng bộ thành công!");
        } catch (error) {
            console.error("❌ Lỗi đồng bộ:", error);
        }
    };

    // ================== 4. BẮT SỰ KIỆN RỜI TRANG ==================
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isLoggedIn) {
                syncCartToServer();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isLoggedIn]);

    // ================== 5. CÁC HÀM XỬ LÝ ==================

    const totalAmount = cartItems.reduce((total,item) => {
        return total + (item.price * item.quantity);
    }, 0);
    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');
    
    // REMOVE
    const handleRemoveItem = async (id) => {
        // Cập nhật UI trước
        setCartItems(prev => prev.filter(item => item.id !== id));

        // Nếu là User, gọi API update luôn để đồng bộ trạng thái xóa ngay lập tức
        // (Tránh trường hợp sync chậm làm item hiện lại)
        if (isLoggedIn) {
            try {
                // Lấy danh sách từ cartItems hiện tại (lúc chưa xóa) để lọc
                const newItems = cartItems
                    .filter(item => item.id !== id)
                    .map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        color: item.color,
                        size: item.size
                    }));
                
                await apiUpdateCart(newItems);
            } catch (error) {
                console.error("Lỗi xóa trên server:", error);
            }
        }
    };
    
    // ADD
    const addToCart = async (product) => {
        const newItem = { ...product, id: product.id || product._id };

        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === newItem.id && 
                        item.color === newItem.color && 
                        item.size === newItem.size
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item === existingItem
                    ? { ...item, quantity: item.quantity + newItem.quantity } : item
                );
            }
            return [...prevItems, newItem];
        });

        if(isLoggedIn) {
            try {   
                await apiAddToCart({
                    productId: newItem.id,
                    quantity: newItem.quantity,
                    color: newItem.color,
                    size: newItem.size
                });
                console.log(">> Đã thêm vào server thành công!");
            } catch (error) {
                console.error(">> Lỗi khi lưu xuống server:", error);
            }
        }
    };

    // UPDATE QUANTITY (Chỉ sửa State, Sync xử lý sau)
    const handleUpdateQuantity = (productId, newQuantity) => {
        if(newQuantity < 1) return;

        const updateCart = cartItems.map(item => {
            if(item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updateCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng đang trống!");
            return;
        }

        if (isLoggedIn) {
            await syncCartToServer(); // Đợi server lưu xong
        }
        navigate('/checkout');
    };

    const value = {
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        totalAmount, 
        totalAmountFormatted,
        addToCart,
        clearCart,
        handleCheckout,
        syncCartToServer,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};