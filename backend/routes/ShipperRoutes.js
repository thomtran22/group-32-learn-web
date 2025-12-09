const express = require("express");
const mongoose = require("mongoose");
const { protect } = require("../middleware/authMiddleware.js");
const Order = require("../models/Order.js");
const ShipperInfo = require("../models/ShipperInfor.js");
const ShipperPerformance = require("../models/ShipperPerformance.js");
const User = require("../models/User");

const router = express.Router();

// @route GET /api/shipper/orders/new
// @desc Lấy các đơn hàng đang chờ Shipper lấy (AWAITING_PICKUP)
router.get("/orders/new", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: req.user.id,
      deliveryStatus: "AWAITING_PICKUP",
    })
      .select("shippingDetails totalAmount orderDate products")
      .populate("products.productId", "name images");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server khi lấy đơn hàng mới",
      error: error.message,
    });
  }
});

// @route GET /api/shipper/orders/active
// @desc Lấy các đơn hàng đang giao (PICKED_UP hoặc OUT_FOR_DELIVERY)
router.get("/orders/active", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: req.user.id,
      deliveryStatus: { $in: ["PICKED_UP", "OUT_FOR_DELIVERY"] },
    }).select("shippingDetails totalAmount orderDate products deliveryStatus");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server khi lấy đơn hàng đang giao",
      error: error.message,
    });
  }
});

// @route PUT /api/shipper/orders/:orderId/status
// @desc Cập nhật trạng thái giao hàng
router.put("/orders/:orderId/status", protect, async (req, res) => {
  const { newStatus, locationDetails } = req.body;
  const validUpdates = [
    "PICKED_UP",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "FAILED_ATTEMPT",
  ];

  if (!validUpdates.includes(newStatus)) {
    return res
      .status(400)
      .json({ message: "Trạng thái cập nhật không hợp lệ." });
  }

  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      shipperId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message:
          "Không tìm thấy đơn hàng hoặc bạn không được phân công đơn này.",
      });
    }

    // Cập nhật trạng thái và lịch sử
    order.deliveryStatus = newStatus;
    order.deliveryTracking.push({
      timestamp: new Date(),
      status: newStatus,
      shipperLocation: locationDetails || "Vị trí không xác định",
    });

    if (newStatus === "DELIVERED") {
      order.currentStatus = "Thành công";
      // Cập nhật Performance
      await ShipperPerformance.findOneAndUpdate(
        { userId: req.user.id },
        {
          $inc: {
            totalDeliveries: 1,
            successfulDeliveries: 1,
            totalEarnings: order.shippingDetails.shippingFee,
          },
        },
        { new: true, upsert: true }
      );
    } else if (newStatus === "FAILED_ATTEMPT") {
      order.currentStatus = "Đang vận chuyển";
    }

    await order.save();
    res.json({
      message: `Cập nhật trạng thái thành công sang: ${newStatus}`,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------------------------------------
// 2. Thống kê
// ------------------------------------------------------------------

// @route GET /api/shipper/stats
// @desc Lấy thống kê hiệu suất của Shipper
router.get("/stats", protect, async (req, res) => {
  try {
    const stats = await ShipperPerformance.findOne({ shipperId: req.user.id });

    if (!stats) {
      return res.json({
        totalDeliveries: 0,
        successfulDeliveries: 0,
        totalEarnings: 0,
        avgDeliveryTime: 0,
        cancellationRate: 0,
      });
    }
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy thống kê", error: error.message });
  }
});

// ------------------------------------------------------------------
// 3. Hồ sơ Cá nhân
// ------------------------------------------------------------------

// @route GET /api/shipper/info
// @desc Lấy hồ sơ (User + ShipperInfo)
router.get("/info", protect, async (req, res) => {
  try {
    const [user, shipperInfo] = await Promise.all([
      User.findById(req.user.id).select("-password"),
      ShipperInfo.findOne({ userId: req.user.id }),
    ]);

    if (!user || !shipperInfo) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin tài khoản." });
    }

    const profile = {
      ...user.toObject(),
      shipperDetails: shipperInfo.toObject(),
    };

    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy hồ sơ", error: error.message });
  }
});

// @route PUT /api/shipper/info
// @desc Cập nhật hồ sơ (User + ShipperInfo)
router.put("/info", protect, async (req, res) => {
  const { firstName, phoneNumber, vehicleType, licensePlate } = req.body;

  try {
    const userUpdate = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password");

    const shipperUpdate = await ShipperInfo.findOneAndUpdate(
      { userId: req.user.id },
      { vehicleType, licensePlate },
      { new: true, runValidators: true }
    );

    if (!userUpdate || !shipperUpdate) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy tài khoản để cập nhật." });
    }

    res.json({
      message: "Cập nhật hồ sơ thành công",
      user: userUpdate,
      shipper: shipperUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật hồ sơ", error: error.message });
  }
});

// @route PUT /api/shipper/location
// @desc Cập nhật vị trí GPS
router.put("/location", protect, async (req, res) => {
  const { longitude, latitude } = req.body;

  if (longitude === undefined || latitude === undefined) {
    return res.status(400).json({ message: "Phải cung cấp kinh độ và vĩ độ." });
  }

  try {
    const shipper = await ShipperInfo.findOneAndUpdate(
      { userId: req.user.id },
      {
        currentLocation: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );

    if (!shipper) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin Shipper." });
    }

    res.json({
      message: "Cập nhật vị trí thành công",
      location: shipper.currentLocation.coordinates,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
