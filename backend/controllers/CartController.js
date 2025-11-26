const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const addToCart = async (req, res) => {
    const { userId, productId, quantity, color, size } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        const price = product.price;
        const name = product.name;
        const image = product.image;

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

            cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json({
                success: true,
                message: "Thêm sản phẩm vào giỏ hàng thành công".
                cart
            });
        } else {
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, price, image, quantity, color, size }],
                totalAmount: price * quantity
            });

            return res.status(201).json({
                success: true,
                message: 'Giỏ hàng được tạo thành công',
                cart: newCart
            });
        }
    } catch (error) {
        console.log('❌ Add to cart error:', error);
        res.status(500).json({ 
            success: false,
            message: "Lỗi server khi thêm giỏ hàng",
            error: error.message
        });
    }
};

module.exports = { addToCart };