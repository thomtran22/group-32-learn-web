const express = require('express');
const router = express.Router();
const { createOrder, createPaymentUrl , vnpayReturn, viewOrders, getOrderById} = require('../controllers/OrderController');
const {verifyToken} = require('../middleware/authMiddleware'); 

// POST /api/orders
// Nếu bắt buộc đăng nhập mới được mua thì thêm verifyToken, nếu không thì bỏ
router.post('/', verifyToken, createOrder);

// VNPay redirect về bằng GET (hoặc Frontend gọi xuống bằng GET)
router.get('/vnpay-return', vnpayReturn);

router.post('/create-payment-url', createPaymentUrl);

router.get('/', verifyToken, viewOrders);

router.get('/:id', verifyToken, getOrderById);

module.exports = router;