import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { apiAddToCart, apiViewCart, apiUpdateCart, apiRemoveItem, apiClearCart } from "../services/cartApi";
import { useNavigate } from "react-router-dom";

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

    const isUpdateActionRef = useRef(false);
    const isLoggedIn = !!localStorage.getItem('token');

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

        // Hiện Popup xác nhận đẹp
        const result = await Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: `Bạn muốn xóa ${selectedItems.length} sản phẩm đã chọn khỏi giỏ hàng?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Vâng, xóa đi!',
            cancelButtonText: 'Thôi, giữ lại'
        });

        if (result.isConfirmed) {
            // Thực hiện xóa
            selectedItems.forEach(id => handleRemoveItem(id, true)); // Thêm tham số true để không hiện thông báo lẻ tẻ
            setSelectedItems([]);
            
            Swal.fire(
                'Đã xóa!',
                'Các sản phẩm đã được xóa khỏi giỏ hàng.',
                'success'
            );
        }
    };

    // Hàm xử lý url ảnh
    const getFullImageUrl = (productObj) => {
        let imgUrl = '';
        if (productObj.images && productObj.images.length > 0) {
            imgUrl = productObj.images[0];
        }
        if (!imgUrl) return "https://via.placeholder.com/150?text=No+Image";
        return imgUrl;
    };

    // Load giỏ hàng
    const loadCart = async () => {
        if (!isLoggedIn) return;
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
                // Không cần toast ở đây vì nó sẽ spam nếu user chưa login
                console.log("Token hết hạn. Đang đăng xuất...");
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            loadCart();
        } else {
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) setCartItems(JSON.parse(savedCart));
            setIsCartLoaded(true);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn && isCartLoaded) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn, isCartLoaded])

    // Update số lượng
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
                toast.error("Không thể cập nhật số lượng với server.");
            }
        }, 800);

        return () => clearTimeout(timeout);
    }, [cartItems, isLoggedIn, isCartLoaded]);

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

        toast.success(`Đã thêm "${product.name}" vào giỏ!`);

        if (isLoggedIn) {
            try {
                await apiAddToCart({
                    productId: product._id,
                    quantity: product.quantity,
                    color: product.color,
                    size: product.size
                });

                await loadCart();
            } catch (error) {
                console.error("Lỗi add server:", error);
                toast.error("Có lỗi khi đồng bộ giỏ hàng với server.");
            }
        } else {
            setCartItems(newCart => {
                localStorage.setItem('cartItems', JSON.stringify(newCart));
                return newCart;
            });
        }
    };

    // Remove
    const handleRemoveItem = async (itemId, isBulkDelete = false) => {
        isUpdateActionRef.current = false;
        const prevCart = [...cartItems];
        setCartItems(prev => prev.filter(item => item.itemId !== itemId));

        if (isLoggedIn) {
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
        } else {
            if(!isBulkDelete) {
                toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
            }
        }
    };

    // Update quantity
    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
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

    // Clear
    const clearCart = async () => {
        isUpdateActionRef.current = false;
        setCartItems([]);
        if (isLoggedIn) {
            try { await apiClearCart(); } catch (error) { }
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

    const handleCheckout = (selectedIds = []) => {
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
        </CartContext.Provider>
    )
};