import express from "express";
const router = express.Router();
import {
  createOrder,
  createPaymentUrl,
  vnpayReturn,
  viewOrders,
  getOrderById,
  getOrderAvail,
  acceptOrder,
  getShippingInfo,
  cancelOrder,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// POST /api/orders
// Nếu bắt buộc đăng nhập mới được mua thì thêm verifyToken, nếu không thì bỏ
router.post("/", verifyToken, createOrder);

router.get("/available", verifyToken, getOrderAvail);

// VNPay redirect về bằng GET (hoặc Frontend gọi xuống bằng GET)
router.get("/vnpay-return", vnpayReturn);

router.post("/create-payment-url", createPaymentUrl);

router.get("/", verifyToken, viewOrders);

router.get("/:id", verifyToken, getOrderById);

router.put("/:orderId/accept", verifyToken, acceptOrder);

router.get("/:orderId/shipping-info", verifyToken, getShippingInfo);

router.put("/:orderId/cancel", verifyToken, cancelOrder);

export default router;
