const express = require('express');
const router = express.Router();

const { getProductById, getBestSellers, getProducts } = require('../controllers/ProductController');

// QUAN TRỌNG: Đặt các route cụ thể trước route có parameter
// GET /api/product/best-sellers - Lấy sản phẩm bán chạy (không cần auth)
router.get('/best-sellers', getBestSellers);

// GET /api/product/:id - Lấy chi tiết sản phẩm (không cần auth)
router.get('/:id', getProductById);

module.exports = router;

