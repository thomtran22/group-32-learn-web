import express from 'express';
const router = express.Router();
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import {
    getDashboardStats,
    getRevenueStats,
    getAllOrders,
    updateOrderStatus,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllShippers,
    updateShipperStatus,
    getAllUsers,
    updateUserStatus,
    getSignature
} from '../controllers/adminController.js';

// Tất cả routes yêu cầu đăng nhập và là Admin
router.use(verifyToken, isAdmin);

// Dashboard & Statistics
router.get('/dashboard', getDashboardStats);
router.get('/revenue', getRevenueStats);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);

// Product Management
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);

// Shipper Management
router.get('/shippers', getAllShippers);

// User Management
router.get('/users', getAllUsers);

// Chỉ Admin mới được lấy chữ ký để up ảnh sản phẩm
router.get('/sign-cloudinary', getSignature);// /api/admin/sign-cloudinary

export default router;