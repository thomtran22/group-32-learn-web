const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

// POST /api/cart
const addToCart = async (req, res) => {
    if (!req.user?.id) {
        return res.status(401).json({
            success: false,
            message: "Bạn cần đăng nhập để thực hiện chức năng này",
            requireLogin: true
        });
    }

    const userId = req.user.id;
    const { productId, quantity, color, size } = req.body;

    try {
        // Query 1: lấy product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        const variant = product.variants.find(v => v.color === color && v.size === size);
        if (!variant) {
            return res.status(400).json({
                success: false,
                message: `Phiên bản màu ${color}, size ${size} không tồn tại`
            });
        }

        // Query 2: lấy giỏ hàng, dùng *1 lần duy nhất*
        let cart = await Cart.findOne({ userId });

        let existingQty = 0;

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity, color, size }]
            });
        } else {
            const itemIdx = cart.items.findIndex(
                i =>
                    i.productId.toString() === productId &&
                    i.color === color &&
                    i.size === size
            );

            if (itemIdx > -1) {
                existingQty = cart.items[itemIdx].quantity;
            }

            if (existingQty + quantity > variant.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Kho chỉ còn ${variant.quantity} sản phẩm (Bạn đã có ${existingQty})`
                });
            }

            if (itemIdx > -1) {
                cart.items[itemIdx].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, color, size });
            }
        }

        await cart.save();
        await cart.populate("items.productId", "name price images variants");

        cart.totalAmount = cart.items.reduce(
            (sum, i) => sum + i.productId.price * i.quantity,
            0
        );

        await cart.save();

        return res.json({
            success: true,
            message: "Đã thêm vào giỏ",
            cart
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};


// GET /api/cart
const viewCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price images variants');

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                cart: { 
                    items: [],
                    totalAmount: 0 
                }
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        console.error('❌ View cart error:', error);

        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message
        });
    }
};

// PUT /api/cart/
const updateCart = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body; 

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        const productIds = items.map(item => item.productId);
        // --- SỬA: Lấy thêm variants để check tồn kho nếu cần (tạm thời chỉ lấy info cơ bản) ---
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = products.reduce((acc, product) => {
            acc[product._id.toString()] = product;
            return acc;
        }, {});

        const sanitizedItems = [];

        for (const item of items) {
            const product = productMap[item.productId];
            if (!product) continue; // Bỏ qua nếu sản phẩm bị xóa khỏi DB

            // Logic kiểm tra tồn kho khi update số lượng (Option)
            // const variant = product.variants.find(v => v.color === item.color && v.size === item.size);
            // if (variant && variant.quantity < item.quantity) {
            //     item.quantity = variant.quantity; // Tự động giảm về max tồn kho
            // }

            sanitizedItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
                color: item.color || '',
                size: item.size || '',
                quantity: item.quantity
            });
        }

        cart.items = sanitizedItems;
        cart.totalAmount = sanitizedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save();

        const populatedCart = await Cart.findOne({ userId }).populate('items.productId', 'name price images variants');
        return res.status(200).json({
            success: true,
            message: "Đồng bộ giỏ hàng thành công",
            cart: populatedCart
        });
    } catch (error) {
        console.error('❌ Update cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE /api/cart/:itemId
const removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params; 

    try {
        await Cart.updateOne(
            { userId }, 
            { $pull: { items: { _id: itemId } } } 
        );

        const updatedCart = await Cart.findOne({ userId }).populate('items.productId', 'name price images variants');

        // Tính lại tổng tiền sau khi xóa
        if(updatedCart) {
            updatedCart.totalAmount = updatedCart.items.reduce((acc, item) => {
                 return acc + ((item.productId ? item.productId.price : 0) * item.quantity);
            }, 0);
            await updatedCart.save();
        }

        res.status(200).json({ 
            success: true,
            message: "Đã xóa sản phẩm",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Lỗi xóa item:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi Server khi xóa sản phẩm"
        });
    }
};

const clearCart = async (req, res) => {
    const userId = req.user.id;
    try {
        await Cart.findOneAndDelete({ userId });
        res.status(200).json({ success: true, message: "Đã xóa giỏ hàng" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 

module.exports = { 
    addToCart,
    viewCart,
    updateCart,
    removeCartItem,
    clearCart
};