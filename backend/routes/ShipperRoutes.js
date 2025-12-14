const express = require("express");
const router = express.Router();
const { generateToken } = require("./authRoutes");

const Order = require("../models/OrderModel");
const ShipperInfo = require("../models/ShipperInfo");
const ShipperPerformance = require("../models/ShipperPerformance");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

const {verifyToken} = require("../middleware/authMiddleware");

router.get("/orders/new", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: req.user.id,
      deliveryStatus: "AWAITING_PICKUP",
    })
      .select("shippingDetails totalAmount createdAt products")
      .populate("products.productId", "name images")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tải đơn mới" });
  }
});

router.get("/orders/active", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: req.user.id,
      deliveryStatus: { $in: ["PICKED_UP", "OUT_FOR_DELIVERY"] },
    })
      .select("shippingDetails totalAmount deliveryStatus products")
      .populate("products.productId", "name images")
      .sort({ updatedAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tải đơn đang giao" });
  }
});

router.put("/orders/:orderId/status", verifyToken, async (req, res) => {
  const { newStatus, note, location } = req.body;
  const validStatuses = [
    "PICKED_UP",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "FAILED_ATTEMPT",
    "CANCELED",
  ];

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" });
  }

  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      shipperId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    order.deliveryStatus = newStatus;

    order.deliveryTracking.push({
      status: newStatus,
      timestamp: new Date(),
      shipperLocation: location || "Không xác định",
      note: note || "",
    });

    if (newStatus === "DELIVERED") {
      await ShipperPerformance.findOneAndUpdate(
        { userId: req.user.id },
        {
          $inc: {
            totalDeliveries: 1,
            successfulDeliveries: 1,
            totalEarnings: order.shippingDetails.shippingFee || 15000,
          },
        },
        { upsert: true, new: true }
      );
    }

    await order.save();
    res.json({ message: "Cập nhật thành công", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi cập nhật trạng thái" });
  }
});

router.get("/stats", verifyToken, async (req, res) => {
  try {
    const shipperId = req.user.id;

    const awaitingPickupCount = await Order.countDocuments({
      shipperId: shipperId,
      deliveryStatus: "AWAITING_PICKUP",
    });

    const activeDeliveryCount = await Order.countDocuments({
      shipperId: shipperId,
      deliveryStatus: { $in: ["PICKED_UP", "OUT_FOR_DELIVERY"] },
    });

    // Tìm thông tin hiệu suất
    const statsDoc = await ShipperPerformance.findOne({ userId: shipperId });

    let statsData;

    if (!statsDoc) {
      // Trường hợp 1: Chưa có dữ liệu -> Tạo object thuần mặc định
      statsData = {
        totalDeliveries: 0,
        successfulDeliveries: 0,
        totalEarnings: 0,
        rating: 5,
      };
    } else {
      // Trường hợp 2: Có dữ liệu -> Chuyển Mongoose Document sang Object thuần
      statsData = statsDoc.toObject();
    }

    // Trả về kết quả (lúc này statsData chắc chắn là object thường)
    res.json({
      ...statsData, 
      awaitingPickupCount,
      activeDeliveryCount,
    });
  } catch (error) {
    console.error("Lỗi tải thống kê:", error);
    res.status(500).json({ message: "Lỗi tải thống kê" });
  }
});

router.get("/info", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const shipperInfo = await ShipperInfo.findOne({ userId: req.user.id });

    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({
      user,
      shipperDetails: shipperInfo || {},
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tải hồ sơ" });
  }
});

router.put("/info", verifyToken, async (req, res) => {
  const { firstName, phone, vehicleType, licensePlate } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, phoneNumber: phone },
      { new: true }
    ).select("-password");

    const updatedShipperInfo = await ShipperInfo.findOneAndUpdate(
      { userId: req.user.id },
      { vehicleType, licensePlate },
      { new: true, upsert: true }
    );

    res.json({
      message: "Cập nhật hồ sơ thành công",
      user: updatedUser,
      shipperDetails: updatedShipperInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi cập nhật hồ sơ" });
  }
});

// const STATIC_SHIPPER_ID = "693ac1116bd788c8f1a6664a";

// router.get("/test-token", (req, res) => {
//   try {
//     if (
//       STATIC_SHIPPER_ID === "YoUR_STATIC_SHIPPER_ID_HERE" ||
//       STATIC_SHIPPER_ID.length < 20
//     ) {
//       return res.status(400).json({
//         message:
//           "chưa thay ID",
//       });
//     }

//     const token = generateToken(STATIC_SHIPPER_ID);

//     res.json({
//       message: "Token test thành công! Dùng nó để lưu vào Local Storage.",
//       testShipperId: STATIC_SHIPPER_ID,
//       token: token,
//     });
//   } catch (error) {
//     console.error("Lỗi tạo test token:", error);
//     res.status(500).json({ message: "Lỗi Server khi tạo token." });
//   }
// });

module.exports = router;