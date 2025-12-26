import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { apiAddToCart, apiViewCart, apiUpdateCart, apiRemoveItem, apiClearCart } from "../services/cartApi";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/login/LoginModal"; // 1. Import LoginModal trực tiếp
import axios from "axios"; // Import axios để check role nếu cần (hoặc chỉ cần check token tồn tại)

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const navigate = useNavigate();

    // state
    const [cartItems, setCartItems] = useState([]);
    const [isCartLoaded, setIsCartLoaded] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    
    // 2. State quản lý Modal Login ngay tại Context
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const isUpdateActionRef = useRef(false);
    
    // Check token để biết trạng thái đăng nhập
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const selectedTotal = cartItems.reduce((total, item) => {
        return selectedItems.includes(item.itemId)
            ? total + (item.price * item.quantity)
            : total;
    }, 0);

    // caculate total
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');
    const selectedTotalFormatted = selectedTotal.toLocaleString('vi-VN');

    const onCheckoutClick = () => {
        handleCheckout(selectedItems);
    }

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
        // Sau khi đăng nhập thành công và đóng modal, load lại giỏ hàng của user đó
        loadCart(); 
    };

    const handleToggleSelect = (itemId) => {
        if (selectedItems.includes(itemId)) {
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

    const handleDeleteSelected = async () => {
        if (selectedItems.length === 0) {
            toast.info("Vui lòng chọn sản phẩm cần xóa");
            return;
        }

        const result = await Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: `Bạn muốn xóa ${selectedItems.length} sản phẩm đã chọn khỏi giỏ hàng?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa!',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            selectedItems.forEach(id => handleRemoveItem(id, true));
            setSelectedItems([]);
            
            Swal.fire(
                'Đã xóa!',
                'Các sản phẩm đã được xóa khỏi giỏ hàng.',
                'success'
            );
        }
    };

    const getFullImageUrl = (productObj) => {
        let imgUrl = '';
        if (productObj.images && productObj.images.length > 0) {
            imgUrl = productObj.images[0];
        }
        if (!imgUrl) return "https://via.placeholder.com/150?text=No+Image";
        return imgUrl;
    };

    // --- LOAD CART (Chỉ load từ API, không load localStorage) ---
    const loadCart = async () => {
        // Nếu không có token, xóa cartItems về rỗng (bảo mật và logic)
        if (!localStorage.getItem('token')) {
            setCartItems([]);
            setIsCartLoaded(true);
            return;
        }

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
                        image: getFullImageUrl(productObj),
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity,
                        availableColors: extractedColors,
                        availableSizes: extractedSizes,
                        variants: productObj.variants || []
                    };
                });
                isUpdateActionRef.current = false;
                setCartItems(mappedItems);
                setIsCartLoaded(true);
            }
        } catch (error) {
            console.error("Lỗi tải giỏ hàng:", error);
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                // Token hết hạn -> Clear token, Clear cart
                localStorage.removeItem('token');
                setCartItems([]);
                // Không tự động bật modal ở đây để tránh phiền khi vừa vào trang
            }
        }
    };

    // Load lại cart khi trạng thái login thay đổi
    useEffect(() => {
        loadCart();
    }, [isLoggedIn]);

    // Update số lượng (Sync server)
    useEffect(() => {
        // Chỉ chạy khi đã login
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

    // --- ADD TO CART (Logic mới: Bắt buộc Login) ---
    const addToCart = async (product) => {
        const currentToken = localStorage.getItem('token');

        // Kiểm tra Token: Nếu chưa đăng nhập -> Mở Modal
        if (!currentToken) {
            setIsModalOpen(true);
            return;
        }

        // 2. Nếu đã đăng nhập -> Thực hiện Add to Cart
        isUpdateActionRef.current = false;

        // Optimistic Update (Cập nhật UI trước cho mượt)
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

            const newItem = {
                itemId: Date.now().toString(), // Temp ID
                productId: product._id,
                name: product.name,
                price: product.price,
                image: getFullImageUrl(product),
                color: product.color,
                size: product.size,
                quantity: product.quantity,
                availableColors: [],
                availableSizes: [],
                variants: []
            };
            return [...prevItems, newItem];
        });

        toast.success(`Đã thêm "${product.name}" vào giỏ!`);

        try {
            await apiAddToCart({
                productId: product._id,
                quantity: product.quantity,
                color: product.color,
                size: product.size
            });

            // Đồng bộ lại ID thật từ server
            await loadCart();
        } catch (error) {
            console.error("Lỗi add server:", error);
            toast.error("Lỗi khi thêm vào giỏ hàng (Check quyền hoặc Server)");
            // Nếu lỗi 403 (Admin không được mua) hoặc 401
            if (error.response?.status === 403) {
                 // Rollback UI nếu cần
                 await loadCart();
            }
        }
    };

    // Remove
    const handleRemoveItem = async (itemId, isBulkDelete = false) => {
        if (!isLoggedIn) return; // Không login thì không có gì để xóa

        isUpdateActionRef.current = false;
        const prevCart = [...cartItems];
        setCartItems(prev => prev.filter(item => item.itemId !== itemId));

        try {
            await apiRemoveItem(itemId);
            if(!isBulkDelete) {
                toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
            }
        } catch (error) {
            console.error("Lỗi xóa sản phẩm:", error);
            toast.error("Không thể xóa sản phẩm lúc này.");
            setCartItems(prevCart);
        }
    };

    // Update quantity (UI)
    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (!isLoggedIn) return;
        if (newQuantity < 1) return;
        isUpdateActionRef.current = true;
        setCartItems(prev => prev.map(item =>
            item.itemId === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Update variant
    const updateItemVariant = (itemId, newVariant) => {
        if (!isLoggedIn) return;
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

    // Clear
    const clearCart = async () => {
        if (!isLoggedIn) return;
        isUpdateActionRef.current = false;
        setCartItems([]);
        try { await apiClearCart(); } catch (error) { }
    };

    const removePurchasedItems = (itemIds) => {
        setCartItems(prev => prev.filter(item => !itemIds.includes(item.itemId)));
        setSelectedItems(prev => prev.filter(id => !itemIds.includes(id)));
    };

    const handleCheckout = (selectedIds = []) => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) {
            setIsModalOpen(true);
            return;
        }

        if (!selectedIds || selectedIds.length === 0) {
            toast.warn("Vui lòng chọn sản phẩm để thanh toán!", {
                position: "top-center"
            });
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
        cartCount,
        handleRemoveItem,
        handleUpdateQuantity,
        updateItemVariant,
        totalAmount,
        totalAmountFormatted,
        selectedTotal,
        selectedTotalFormatted,
        addToCart,
        loadCart,
        clearCart,
        handleCheckout,
        selectedItems,
        handleToggleSelect,
        handleSelectAll,
        handleDeleteSelected,
        onCheckoutClick,
        removePurchasedItems,
        isAllSelected
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            {isModalOpen && <LoginModal closeModal={closeModal} />}
        </CartContext.Provider>
    )
};