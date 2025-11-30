const express = require('express');
const router = express.Router();
const { createOrder, createPaymentUrl , vnpayReturn, viewOrders} = require('../controllers/OrderController');
const verifyToken = require('../middleware/authMiddleware'); 

// POST /api/orders
// Nếu bắt buộc đăng nhập mới được mua thì thêm protect, nếu không thì bỏ
router.post('/', verifyToken, createOrder);

// Thêm dòng này: Method là GET vì VNPay redirect về bằng GET (hoặc Frontend gọi xuống bằng GET)
router.get('/vnpay-return', vnpayReturn);

router.post('/create-payment-url', createPaymentUrl);

router.get('/orders', verifyToken, viewOrders);
module.exports = router;