import React, { createContext, useState, useContext, useEffect, useRef} from "react";
import { apiAddToCart, apiViewCart, apiUpdateCart, apiRemoveItem, apiClearCart} from "../services/cartApi";
import { useNavigate } from "react-router-dom"; 

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({children}) => {
    const navigate = useNavigate();

    // --- STATE ---
    const [cartItems, setCartItems] = useState([]);
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    const isUpdateActionRef = useRef(false);

    const isLoggedIn = !!localStorage.getItem('token');

    // ================== 1. LOAD GIỎ HÀNG ==================
    useEffect(() => {
        const loadCart = async () => {
            if (isLoggedIn) {
                try {
                    const data = await apiViewCart();

                    if (data.success && data.cart) {
                        const mappedItems = data.cart.items.map(item => {
                            const productObj = item.productId || {};
                            return {
                                itemId: item._id,
                                productId: productObj._id || item.productId,
                                name: productObj.name,      
                                price: productObj.price,    
                                image: productObj.image,    

                                color: item.color,
                                size: item.size,
                                quantity: item.quantity,
                                // Fallback mảng rỗng nếu không có dữ liệu
                                availableColors: productObj.colors || [], 
                                availableSizes: productObj.sizes || []
                            };
                        });
                        setCartItems(mappedItems);
                    }
                } catch (error) {
                    console.error("Lỗi tải giỏ hàng:", error);
                }
            } else {
                // Khách vãng lai: Lấy từ LocalStorage
                const savedCart = localStorage.getItem('cartItems');
                if (savedCart) setCartItems(JSON.parse(savedCart));
            }
            setIsCartLoaded(true);
        };

        loadCart();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn && isCartLoaded) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn, isCartLoaded])

    // ================== 3. LOGIC UPDATE SỐ LƯỢNG / PHÂN LOẠI (DEBOUNCE) ==================
    // Chỉ chạy khi cờ isUpdateActionRef.current = TRUE
    useEffect(() => {
        if (!isLoggedIn || !isCartLoaded || !isUpdateActionRef.current) return;

        const timeout = setTimeout(async () => {
            try {
                // Chuẩn bị payload chỉ gồm các trường cần thiết
                const itemsPayload = cartItems.map(item => ({
                    productId: item.productId, 
                    quantity: item.quantity,
                    color: item.color,
                    size: item.size
                }));
                
                console.log("Đang cập nhật thay đổi lên server...");
                await apiUpdateCart(itemsPayload); // Gọi API PUT
                
                // Sau khi xong, tắt cờ update (dù thực ra để true cũng ko sao vì deps thay đổi mới chạy)
                isUpdateActionRef.current = false; 
            } catch (error) {
                console.error("Lỗi cập nhật giỏ hàng:", error);
            }
        }, 800); // Đợi 0.8s sau khi người dùng ngừng bấm

        return () => clearTimeout(timeout);
    }, [cartItems, isLoggedIn, isCartLoaded]);
    // ================== CÁC HÀM THAO TÁC ==================
    
    // --- ADD ---
    const addToCart = async (product) => {
        isUpdateActionRef.current = false;

        setCartItems(prevItems => {
            // Kiểm tra trùng: So sánh productId trong giỏ với _id của sản phẩm thêm vào
            const existingItem = prevItems.find(
                item => item.productId === product._id && 
                        item.color === product.color && 
                        item.size === product.size
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item === existingItem ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            }

            return [...prevItems, {
                ...product,
                itemId: Date.now().toString(), // id tmp
                productId: product._id,
                // Giả sử product đầu vào có sẵn options, nếu không thì để mảng rỗng
                availableColors: product.colors || [],
                availableSizes: product.sizes || []
            }];
        });

        if(isLoggedIn) {
            try {   
                await apiAddToCart({
                    productId: product._id, // Gửi _id của sản phẩm
                    quantity: product.quantity,
                    color: product.color,
                    size: product.size
                });
            } catch (error) {
                console.error("Lỗi add server:", error);
                //Rollback state (xóa item vừa thêm đi)
            }
        } else {
            setTimeout(() => {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }, 0);
        }
    };

    // --- REMOVE ---
    const handleRemoveItem = async (itemId) => {
        isUpdateActionRef.current = false; 
        
        const prevCart = [...cartItems]; // Backup để rollback
        setCartItems(prev => prev.filter(item => item.itemId !== itemId));
        
        if (isLoggedIn) {
            try {
                await apiRemoveItem(itemId);
                console.log("Đã xóa sản phẩm trên server");
            } catch (error) {
                console.error("Lỗi xóa sản phẩm:", error);
                alert("Không thể xóa sản phẩm lúc này.");
                setCartItems(prevCart); // Hoàn tác lại giao diện
            }
        }
    };

    // --- UPDATE QUANTITY ---
    const handleUpdateQuantity = (itemId, newQuantity) => {
        if(newQuantity < 1) return;

        isUpdateActionRef.current = true;

        setCartItems(prev => prev.map(item => 
            item.itemId === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const updateItemVariant = (itemId, newVariant) => {
        isUpdateActionRef.current = true;

        setCartItems(prevItems => {
            const currentItem = prevItems.find(item => item.itemId === itemId);
            if (!currentItem) return prevItems;

            const duplicateItem = prevItems.find(item => 
                item.productId === currentItem.productId &&
                item.color === newVariant.color &&
                item.size === newVariant.size &&
                item.itemId !== itemId
            );

            if (duplicateItem) {
                const mergedQuantity = duplicateItem.quantity + currentItem.quantity;

                return prevItems.map(item => {
                    if (item.itemId === duplicateItem.itemId) {
                        return { ...item, quantity: mergedQuantity };
                    }
                    return item;
                }).filter(item => item.itemId !== itemId); // Xóa dòng cũ
            } else {
                return prevItems.map(item => 
                    item.itemId === itemId 
                    ? { ...item, color: newVariant.color, size: newVariant.size } 
                    : item
                );
            }
        });
    };

    // --- CLEAR ---
    const clearCart = async () => {
        // Chặn Auto-Sync (để không kích hoạt API Update nhầm)
        isUpdateActionRef.current = false; 

        // 2. Xóa UI ngay lập tức
        setCartItems([]); 

        // 3. Xử lý logic lưu trữ
        if (isLoggedIn) {
            try {
                // Gọi API DELETE (đã định nghĩa ở bước trước)
                await apiClearCart(); 
            } catch (error) {
                console.error("Lỗi xóa giỏ hàng server:", error);
            }
        } else {
            // Khách: Xóa LocalStorage
            localStorage.removeItem('cartItems');
        }
    };

    // --- CHECKOUT ---
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng đang trống!");
            return;
        }
        navigate('/checkout');
    };

    // --- CALCULATE TOTAL ---
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');

    const value = {
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        updateItemVariant,
        totalAmount, 
        totalAmountFormatted,
        addToCart,
        clearCart,
        handleCheckout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};