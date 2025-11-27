const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

const { addToCart, viewCart, updateCart, removeCartItem, clearCart } = require('../controllers/CartController');

const { validate, addToCartRules, updateCartRules } = require('../middleware/cartValidator');

// Tất cả các route giỏ hàng đều yêu cầu đăng nhập
router.use(verifyToken);

// Thêm sản phẩm vào giỏ hàng
router.post('/',addToCartRules(),validate, addToCart);

// Xem giỏ hàng
router.get('/', viewCart);

// Xoa mot san pham trong gio hang
router.delete('/:userId/items/:itemId', removeCartItem);

// Xóa toàn bộ sản phẩm trong giỏ hàng
// DELETE /api/cart
router.delete('/', clearCart);

// Cap nhat so luong san pham trong gio hang
// PUT /api/cart
router.put('/', updateCartRules(), validate, updateCart);

module.exports = router;