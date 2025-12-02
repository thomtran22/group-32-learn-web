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

    // Kiểm tra xem có đang chọn tất cả không để checkbox header hiển thị đúng
    const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    const handleDeleteSelected = () => {
        if (selectedItems.length === 0) return;

        if (window.confirm(`Bạn muốn xóa ${selectedItems.length} sản phẩm đã chọn?`)) {
            selectedItems.forEach(id => handleRemoveItem(id));
            setSelectedItems([]); // Reset lại mảng đã chọn sau khi xóa
        }
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
                                // Lọc ra các màu duy nhất
                                extractedColors = [...new Set(productObj.variants.map(v => v.color))];
                                // Lọc ra các size duy nhất
                                extractedSizes = [...new Set(productObj.variants.map(v => v.size))];
                            } else {
                                // Fallback nếu dữ liệu cũ
                                extractedColors = productObj.colors || [];
                                extractedSizes = productObj.sizes || [];
                            }
                            return {
                                itemId: item._id,
                                productId: productObj._id || item.productId,
                                name: productObj.name,      
                                price: productObj.price,    
                                image: productObj.image,    

                                color: item.color,
                                size: item.size,
                                quantity: item.quantity,

                                availableColors: extractedColors, 
                                availableSizes: extractedSizes,
                            
                                // Lưu thêm variants để dùng check tồn kho sau này (nếu cần)
                                variants: productObj.variants || [] 
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
                image: product.image,
                color: product.color,
                size: product.size,
                quantity: product.quantity,
                
                availableColors: extractedColors,
                availableSizes: extractedSizes,
                variants: product.variants || [] // Lưu cả variants
            };
            return [...prevItems, newItem];
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
            setCartItems(newCart => {
                localStorage.setItem('cartItems', JSON.stringify(newCart));
                return newCart;
            });
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

    const removePurchasedItems = (itemIds) => {
        // Cập nhật State CartItems (Để giao diện mất ngay món đó)
        setCartItems(prev => prev.filter(item => !itemIds.includes(item.itemId)));
        
        // Cập nhật State SelectedItems (Bỏ tick những món đã xóa)
        setSelectedItems(prev => prev.filter(id => !itemIds.includes(id)));

        // KHÔNG CẦN GỌI API apiRemoveItem
        //apiCreateOrder ở backend đã làm việc này rồi.
        
        // Cập nhật LocalStorage nếu là khách vãng lai (Optional, vì khách vãng lai ko có userId để backend xóa)
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

        // Lọc ra các object sản phẩm đầy đủ dựa trên ID
        const rawItems = cartItems.filter(item => selectedIds.includes(item.itemId));

        const itemsToCheckout = rawItems.map(item => ({
            itemId: item.itemId,      // Để xóa khỏi giỏ sau khi mua
            productId: item.productId, // Để gửi API tạo đơn
            name: item.name,          // Để hiển thị UI Checkout
            price: item.price,        // Để hiển thị UI Checkout
            image: item.image,        // Để hiển thị UI Checkout
            color: item.color,
            size: item.size,
            quantity: item.quantity
        }));

        // Cách 1: Truyền qua state của navigate (An toàn, sạch sẽ)
        navigate('/checkout', { state: { items: itemsToCheckout } });
    };

    const value = {
        cartItems,
        handleRemoveItem,
        handleUpdateQuantity,
        updateItemVariant,
        totalAmount, 
        totalAmountFormatted,
        selectedTotal,          // Tổng tiền các món đang tick
        selectedTotalFormatted,
        addToCart,
        clearCart,
        handleCheckout,

        selectedItems,       // <--- Quan trọng nhất, thiếu cái này nên lỗi .length
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