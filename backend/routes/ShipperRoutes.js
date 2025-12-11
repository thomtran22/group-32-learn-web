const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Order = require("../models/Order");
const ShipperInfo = require("../models/ShipperInfor"); // Chú ý tên file model của bạn là ShipperInfor hay ShipperInfo
const ShipperPerformance = require("../models/ShipperPerformance");
const User = require("../models/User");

// Import Middleware
const { protect } = require("../middleware/authMiddleware");

// ==========================================
// 1. QUẢN LÝ ĐƠN HÀNG
// ==========================================

// @route   GET /api/shipper/orders/new
// @desc    Lấy đơn hàng được phân công nhưng chưa lấy (AWAITING_PICKUP)
router.get("/orders/new", protect, async (req, res) => {
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

// @route   GET /api/shipper/orders/active
// @desc    Lấy đơn hàng đang thực hiện (PICKED_UP, OUT_FOR_DELIVERY)
router.get("/orders/active", protect, async (req, res) => {
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

// @route   PUT /api/shipper/orders/:orderId/status
// @desc    Cập nhật trạng thái đơn hàng
router.put("/orders/:orderId/status", protect, async (req, res) => {
  const { newStatus, note, location } = req.body;
  const validStatuses = [
    "PICKED_UP",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "FAILED_ATTEMPT",
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

    // Cập nhật trạng thái
    order.deliveryStatus = newStatus;

    // Thêm lịch sử tracking
    order.deliveryTracking.push({
      status: newStatus,
      timestamp: new Date(),
      shipperLocation: location || "Không xác định",
      note: note || "",
    });

    // LOGIC KHI GIAO THÀNH CÔNG: Cập nhật bảng thành tích
    if (newStatus === "DELIVERED") {
      // Tự động cập nhật stats
      await ShipperPerformance.findOneAndUpdate(
        { userId: req.user.id },
        {
          $inc: {
            totalDeliveries: 1,
            successfulDeliveries: 1,
            totalEarnings: order.shippingDetails.shippingFee || 15000, // Ví dụ phí ship cứng nếu không có trong Order
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

// ==========================================
// 2. THỐNG KÊ & HỒ SƠ
// ==========================================

// @route   GET /api/shipper/stats
// @desc    Lấy thống kê hiệu suất
router.get("/stats", protect, async (req, res) => {
  try {
    let stats = await ShipperPerformance.findOne({ userId: req.user.id });

    if (!stats) {
      // Trả về dữ liệu mặc định nếu chưa có
      stats = {
        totalDeliveries: 0,
        successfulDeliveries: 0,
        totalEarnings: 0,
        rating: 5,
      };
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tải thống kê" });
  }
});

// @route   GET /api/shipper/info
// @desc    Lấy thông tin profile shipper (User + ShipperInfo)
router.get("/info", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const shipperInfo = await ShipperInfo.findOne({ userId: req.user.id });

    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({
      user,
      shipperDetails: shipperInfo || {}, // Trả về rỗng nếu chưa cập nhật info
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tải hồ sơ" });
  }
});

// @route   PUT /api/shipper/info
// @desc    Cập nhật thông tin profile
router.put("/info", protect, async (req, res) => {
  const { firstName, phone, vehicleType, licensePlate } = req.body;

  try {
    // 1. Cập nhật bảng User
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, phoneNumber: phone },
      { new: true }
    ).select("-password");

    // 2. Cập nhật bảng ShipperInfo (Upsert: có thì sửa, chưa có thì tạo)
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

const STATIC_SHIPPER_ID = "693ac1116bd788c8f1a6664a";
const JWT_SECRET = process.env.JWT_SECRET || "YOUR_JWT_SECRET_KEY"; // <-- ĐẢM BẢO KHÓA BÍ MẬT ĐÚNG

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @route  GET /api/shipper/test-token
// @desc   ROUTE ĐỂ TẠO TOKEN CỨNG
// @access Public (Không cần protect)
router.get("/test-token", (req, res) => {
  try {
    if (STATIC_SHIPPER_ID === "YoUR_STATIC_SHIPPER_ID_HERE") {
      return res.status(400).json({
        message:
          "Lỗi cấu hình: Vui lòng thay STATIC_SHIPPER_ID trong ShipperRoutes.js bằng ID Shipper hợp lệ.",
      });
    }

    const token = generateToken(STATIC_SHIPPER_ID);

    res.json({
      message: "Token test thành công! Dùng nó để lưu vào Local Storage.",
      testShipperId: STATIC_SHIPPER_ID,
      token: token,
    });
  } catch (error) {
    console.error("Lỗi tạo test token:", error);
    res.status(500).json({ message: "Lỗi Server khi tạo token." });
  }
});

module.exports = router;
