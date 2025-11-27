const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const addToCart = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ // 401 Unauthorized
            success: false, 
            message: "Bạn cần đăng nhập để thực hiện chức năng này",
            requireLogin: true 
        });
    }
    
    const userId = req.user.id;

    const { productId, quantity, color, size } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: "Sản phẩm không tồn tại" 
            });
        }

        const { price, name, image } = product;

        let cart = await Cart.findOne({ userId });

        if(cart) {
            //Kiểm tra sản phẩm có trùng (ID + Màu + Size) không
            const itemIndex = cart.items.findIndex(p => 
                p.productId.toString() === productId && 
                p.color === color && 
                p.size === size
            );

            if(itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, name, price, image, quantity, color, size });
            }
        } else {
            cart = new Cart({
                userId,
                items: [{ productId, name, price, image, quantity, color, size }]
            });
        }

        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Đã thêm vào giỏ",
            cart
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ 
            success: false,
            message: "Lỗi Server"
        });
    }
};

// GET /api/cart/:userId
const viewCart = async (req, res) => {
    const { userId } = req.user.id;

    try {
        const cart = await Cart.findOne({userId}).populate('items.productId', 'name price image');

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
    } catch (e) {
        console.error('❌ View cart error:', error);

        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message
        });
    }
};

// ==================== 3. CẬP NHẬT TOÀN BỘ GIỎ HÀNG ====================
// PUT /api/cart/:userId
// Body: { items: [...], totalAmount: 500000 }
// Dùng để SYNC localStorage -> Backend khi checkout hoặc beforeunload
const updateCart = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body; 


    try {
        let cart = await Cart.findOne({userId});

        if (!cart) cart = new Cart({ userId, items: [] });

        cart.items = items;
        cart.totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Đồng bộ giỏ hàng thành công",
            cart
        });
    } catch (e) {
        console.error('❌ Update cart error:', error);
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

// ==================== 4. XÓA 1 SẢN PHẨM CỤ THỂ ====================
// DELETE /api/cart/:userId/items/:itemId
// itemId format: productId_color_size (VD: 507f1f77bcf86cd799439011_Red_L)
const removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;
};
const clearCart = async (req, res) => {
    const userId = req.user.id;

    try {
        await Cart.findOneAndDelete({ userId });
        res.status(200).json({ 
            success: true,
            message: "Đã xóa giỏ hàng"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 

module.exports = { 
    addToCart,
    viewCart,
    updateCart,
    removeCartItem,
    clearCart
};