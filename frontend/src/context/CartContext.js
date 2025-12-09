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
    const [selectedItems, setSelectedItems] = useState([]);
    
    const isUpdateActionRef = useRef(false);
    const isLoggedIn = !!localStorage.getItem('token');
    
    const selectedTotal = cartItems.reduce((total, item) => {
        return selectedItems.includes(item.itemId) 
            ? total + (item.price * item.quantity) 
            : total;
    }, 0);

    // --- CALCULATE TOTAL ---
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');
    const selectedTotalFormatted = selectedTotal.toLocaleString('vi-VN');

    const onCheckoutClick = () => {
        handleCheckout(selectedItems); 
    }

    const handleToggleSelect = (itemId) => {
        if(selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = cartItems.map(item => item.itemId);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    };

    const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    const handleDeleteSelected = () => {
        if (selectedItems.length === 0) return;
        if (window.confirm(`Bạn muốn xóa ${selectedItems.length} sản phẩm đã chọn?`)) {
            selectedItems.forEach(id => handleRemoveItem(id));
            setSelectedItems([]); 
        }
    };

    // ================== HELPER: HÀM XỬ LÝ URL ẢNH (FIX LẠI) ==================
    const getFullImageUrl = (productObj) => {
        let imgUrl = '';

        // 1. Ưu tiên lấy từ mảng images
        if (productObj.images && productObj.images.length > 0) {
            imgUrl = productObj.images[0];
        }

        // 2. Fallback
        if (!imgUrl) return "https://via.placeholder.com/150?text=No+Image";

        // 3. QUAN TRỌNG: VÌ ẢNH NẰM Ở PUBLIC FRONTEND (PORT 3000)
        // Nên ta giữ nguyên đường dẫn tương đối, KHÔNG thêm domain backend nữa.
        // Ví dụ: "/assets/images/abc.jpg" -> React tự hiểu là localhost:3000/assets...
        
        return imgUrl; 
    };

    // ================== 1. LOAD GIỎ HÀNG ==================
    useEffect(() => {
        const loadCart = async () => {
            if (isLoggedIn) {
                try {
                    const data = await apiViewCart();

                    if (data.success && data.cart) {
                        const mappedItems = data.cart.items.map(item => {
                            const productObj = item.productId || {};

                            let extractedColors = [];
                            let extractedSizes = [];

                            if (productObj.variants && productObj.variants.length > 0) {
                                extractedColors = [...new Set(productObj.variants.map(v => v.color))];
                                extractedSizes = [...new Set(productObj.variants.map(v => v.size))];
                            } else {
                                extractedColors = productObj.colors || [];
                                extractedSizes = productObj.sizes || [];
                            }
                            
                            return {
                                itemId: item._id,
                                productId: productObj._id || item.productId,
                                name: productObj.name,      
                                price: productObj.price,    
                                
                                // Gọi hàm xử lý ảnh mới (không nối domain)
                                image: getFullImageUrl(productObj),    

                                color: item.color,
                                size: item.size,
                                quantity: item.quantity,

                                availableColors: extractedColors, 
                                availableSizes: extractedSizes,
                                variants: productObj.variants || [] 
                            };
                        });
                        setCartItems(mappedItems);
                    }
                } catch (error) {
                    console.error("Lỗi tải giỏ hàng:", error);
                }
            } else {
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

    // ================== 3. LOGIC UPDATE SỐ LƯỢNG ==================
    useEffect(() => {
        if (!isLoggedIn || !isCartLoaded || !isUpdateActionRef.current) return;

        const timeout = setTimeout(async () => {
            try {
                const itemsPayload = cartItems.map(item => ({
                    productId: item.productId, 
                    quantity: item.quantity,
                    color: item.color,
                    size: item.size
                }));
                
                await apiUpdateCart(itemsPayload); 
                isUpdateActionRef.current = false; 
            } catch (error) {
                console.error("Lỗi cập nhật giỏ hàng:", error);
            }
        }, 800); 

        return () => clearTimeout(timeout);
    }, [cartItems, isLoggedIn, isCartLoaded]);

    // ================== CÁC HÀM THAO TÁC ==================
    
    // --- ADD ---
    const addToCart = async (product) => {
        isUpdateActionRef.current = false;

        setCartItems(prevItems => {
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

            let extractedColors = [];
            let extractedSizes = [];
            if (product.variants && product.variants.length > 0) {
                extractedColors = [...new Set(product.variants.map(v => v.color))];
                extractedSizes = [...new Set(product.variants.map(v => v.size))];
            } else {
                extractedColors = product.colors || [];
                extractedSizes = product.sizes || [];
            }

            const newItem = {
                itemId: Date.now().toString(),
                productId: product._id,
                name: product.name,
                price: product.price,
                
                // Gọi hàm xử lý ảnh
                image: getFullImageUrl(product), 

                color: product.color,
                size: product.size,
                quantity: product.quantity,
                
                availableColors: extractedColors,
                availableSizes: extractedSizes,
                variants: product.variants || [] 
            };
            return [...prevItems, newItem];
        });

        if(isLoggedIn) {
            try {   
                await apiAddToCart({
                    productId: product._id, 
                    quantity: product.quantity,
                    color: product.color,
                    size: product.size
                });
            } catch (error) {
                console.error("Lỗi add server:", error);
            }
        } else {
            setCartItems(newCart => {
                localStorage.setItem('cartItems', JSON.stringify(newCart));
                return newCart;
            });
        }
    };

    // --- REMOVE ---
    const handleRemoveItem = async (itemId) => {
        isUpdateActionRef.current = false; 
        const prevCart = [...cartItems]; 
        setCartItems(prev => prev.filter(item => item.itemId !== itemId));
        
        if (isLoggedIn) {
            try {
                await apiRemoveItem(itemId);
            } catch (error) {
                console.error("Lỗi xóa sản phẩm:", error);
                alert("Không thể xóa sản phẩm lúc này.");
                setCartItems(prevCart); 
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
                }).filter(item => item.itemId !== itemId); 
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
        isUpdateActionRef.current = false; 
        setCartItems([]); 
        if (isLoggedIn) {
            try { await apiClearCart(); } catch (error) {}
        } else {
            localStorage.removeItem('cartItems');
        }
    };

    const removePurchasedItems = (itemIds) => {
        setCartItems(prev => prev.filter(item => !itemIds.includes(item.itemId)));
        setSelectedItems(prev => prev.filter(id => !itemIds.includes(id)));
        if (!isLoggedIn) {
            const remainingItems = cartItems.filter(item => !itemIds.includes(item.itemId));
            localStorage.setItem('cartItems', JSON.stringify(remainingItems));
        }
    };

    // --- CHECKOUT ---
    const handleCheckout = (selectedIds = []) => {       
        if (!selectedIds || selectedIds.length === 0) {
            alert("Vui lòng chọn sản phẩm để thanh toán!");
            return;
        }

        const rawItems = cartItems.filter(item => selectedIds.includes(item.itemId));
        const itemsToCheckout = rawItems.map(item => ({
            itemId: item.itemId,      
            productId: item.productId, 
            name: item.name,          
            price: item.price,        
            image: item.image,        
            color: item.color,
            size: item.size,
            quantity: item.quantity
        }));

        navigate('/checkout', { state: { items: itemsToCheckout } });
    };

    const value = {
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        updateItemVariant,
        totalAmount, 
        totalAmountFormatted,
        selectedTotal,          
        selectedTotalFormatted,
        addToCart,
        clearCart,
        handleCheckout,
        selectedItems,       
        handleToggleSelect,
        handleSelectAll,
        handleDeleteSelected,
        onCheckoutClick,
        removePurchasedItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
};