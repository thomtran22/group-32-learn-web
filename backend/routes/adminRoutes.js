import express from 'express';
const router = express.Router();
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import {
    getDashboardStats,
    getRevenueStats,
    getAllOrders,
    updateOrderStatus,
    getInventoryStatus,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllShippers,
    updateShipperStatus,
    getAllUsers,
    updateUserStatus
} from '../controllers/adminController.js';

// Tất cả routes yêu cầu đăng nhập và là Admin
router.use(verifyToken, isAdmin);

// Dashboard & Statistics
router.get('/dashboard', getDashboardStats);
router.get('/revenue', getRevenueStats);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);

// Inventory Management
router.get('/inventory', getInventoryStatus);

// Product Management
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);

// Shipper Management
router.get('/shippers', getAllShippers);
router.put('/shippers/:shipperId/status', updateShipperStatus);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:userId/status', updateUserStatus);

export default router;