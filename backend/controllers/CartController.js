const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

// POST /api/cart
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
                cart.items.push({ productId, quantity, color, size });
            }
        } else {
            cart = new Cart({
                userId,
                items: [{ productId, quantity, color, size }]
            });
        }

        await cart.save();

        const cartPopulated = await Cart.findOne({ userId }).populate('items.productId');

        let calculatedTotal = 0;
        if(cartPopulated && cartPopulated.items) {
             calculatedTotal = cartPopulated.items.reduce((acc, item) => {
                // item.productId lúc này là Object sản phẩm đầy đủ (nhờ populate)
                const price = item.productId ? item.productId.price : 0;
                return acc + (price * item.quantity);
            }, 0);
        }

        cart.totalAmount = calculatedTotal;
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

// GET /api/cart
const viewCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price image colors sizes');

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
// Body: { items: [...], totalAmount: 500000 }
const updateCart = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body; 

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        // Lấy thông tin sản phẩm để bổ sung name/price/image
        const productIds = items.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = products.reduce((acc, product) => {
            acc[product._id.toString()] = product;
            return acc;
        }, {});

        const sanitizedItems = [];

        for (const item of items) {
            const product = productMap[item.productId];
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Sản phẩm với ID ${item.productId} không tồn tại`
                });
            }

            sanitizedItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                color: item.color || '',
                size: item.size || '',
                quantity: item.quantity
            });
        }

        cart.items = sanitizedItems;
        cart.totalAmount = sanitizedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Đồng bộ giỏ hàng thành công",
            cart
        });
    } catch (error) {
        console.error('❌ Update cart error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE /api/cart/items/:itemId
const removeCartItem = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params; // itemId này là _id của subdocument trong mảng items

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Giỏ hàng không tồn tại" });
        }

        // Sử dụng $pull của MongoDB để xóa phần tử ra khỏi mảng dựa trên _id
        await Cart.updateOne(
            { userId }, 
            { $pull: { items: { _id: itemId } } } 
        );

        // Lấy lại giỏ hàng mới để trả về cho Client cập nhật UI ngay lập tức (nếu cần)
        const updatedCart = await Cart.findOne({ userId }).populate('items.productId');

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