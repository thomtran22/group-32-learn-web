// src/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

// @route GET /api/orders
// @desc Lấy danh sách tất cả đơn hàng của người dùng (dùng cho StatusProduct)
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .select("orderDate totalAmount currentStatus products") // Chỉ lấy các trường cần cho danh sách
      .populate("products.productId", "name images") // Join lấy tên và ảnh sản phẩm
      .sort({ orderDate: -1 }); // Sắp xếp theo ngày mới nhất

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/orders/:orderId
// @desc Lấy chi tiết đơn hàng (dùng cho ShippingInformation và OrderTimeline)
router.get("/:orderId", protect, async (req, res) => {
  try {
    // Đảm bảo chỉ người dùng sở hữu mới được xem
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    }).populate("products.productId", "name images colors sizes"); // Lấy chi tiết sản phẩm

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });
    }

    // Dữ liệu order đã bao gồm shippingDetails và statusHistory/trackingEvents
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
