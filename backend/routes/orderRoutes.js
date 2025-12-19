import express from 'express';
const router = express.Router();
import { createOrder, createPaymentUrl , vnpayReturn, viewOrders, getOrderById} from '../controllers/orderController.js';
import {verifyToken} from '../middleware/authMiddleware.js'; 

// POST /api/orders
// Nếu bắt buộc đăng nhập mới được mua thì thêm verifyToken, nếu không thì bỏ
router.post('/', verifyToken, createOrder);

// VNPay redirect về bằng GET (hoặc Frontend gọi xuống bằng GET)
router.get('/vnpay-return', vnpayReturn);

router.post('/create-payment-url', createPaymentUrl);

router.get('/', verifyToken, viewOrders);

router.get('/:id', verifyToken, getOrderById);

export default router;