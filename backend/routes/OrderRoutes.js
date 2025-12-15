const express = require("express");
const router = express.Router();
const {
  createOrder,
  createPaymentUrl,
  vnpayReturn,
  viewOrders,
  getOrderById,
  getAvailableOrders,
  acceptOrder,
  getShipperStats,
} = require("../controllers/OrderController");
const { verifyToken } = require("../middleware/authMiddleware");

// POST /api/orders
// Nếu bắt buộc đăng nhập mới được mua thì thêm verifyToken, nếu không thì bỏ
router.post("/", verifyToken, createOrder);

// VNPay redirect về bằng GET (hoặc Frontend gọi xuống bằng GET)
router.get("/vnpay-return", vnpayReturn);

router.post("/create-payment-url", createPaymentUrl);

router.get("/", verifyToken, viewOrders);

// Route lấy danh sách đơn chưa ai nhận
router.get("/available", verifyToken, getAvailableOrders);

// Route Shipper xác nhận nhận đơn
router.put("/:orderId/accept", verifyToken, acceptOrder);

// Route lấy thống kê cho Shipper
router.get("/stats", verifyToken, getShipperStats);

router.get("/:id", verifyToken, getOrderById);

module.exports = router;
