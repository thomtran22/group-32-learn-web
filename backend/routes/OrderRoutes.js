const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select("-__v")
      .populate("orderItems.productId", "name price images");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi Server khi tải danh sách đơn hàng.",
      error: error.message,
    });
  }
});

router.get("/:orderId", protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
      return res.status(400).json({ message: "ID đơn hàng không hợp lệ." });
    }

    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    })
      .select("-__v")
      .populate("orderItems.productId", "name price images colors sizes");

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi Server khi tải chi tiết đơn hàng.",
      error: error.message,
    });
  }
});

module.exports = router;
