import express from 'express';
const router = express.Router();

import {verifyToken} from '../middleware/authMiddleware.js';
import { addToCart, viewCart, updateCart, removeCartItem, clearCart } from '../controllers/cartController.js';
import { validate, addToCartRules, updateCartRules } from '../middleware/cartValidator.js';

// Tất cả các route giỏ hàng đều yêu cầu đăng nhập
router.use(verifyToken);

// Thêm sản phẩm vào giỏ hàng
router.post('/',addToCartRules(), validate, addToCart);

// Xem giỏ hàng
router.get('/', viewCart);

// Xoa mot san pham trong gio hang
router.delete('/:itemId', removeCartItem);

// Xóa toàn bộ sản phẩm trong giỏ hàng
// DELETE /api/cart
router.delete('/', clearCart);

// Cap nhat so luong san pham trong gio hang
// PUT /api/cart
router.put('/', updateCartRules(), validate, updateCart);

export default router;