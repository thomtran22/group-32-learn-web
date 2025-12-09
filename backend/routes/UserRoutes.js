// src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
const Order = require("../models/Order");
const ProductReview = require("../models/ProductReview");
const { protect } = require("../middleware/authMiddleware"); // Middleware xác thực

// @route GET /api/user/me
// @desc Lấy thông tin người dùng hiện tại
router.get("/me", protect, async (req, res) => {
  try {
    // Lấy thông tin user (chỉ lấy các trường cần thiết)
    const user = await User.findById(req.user.id).select(
      "-password -role -__v"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/user/me
// @desc Cập nhật thông tin cá nhân
router.put("/me", protect, async (req, res) => {
  const { firstName, lastName, phoneNumber, dateOfBirth, gender } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.gender = gender || user.gender;

      const updatedUser = await user.save();
      res.json({ message: "Cập nhật thành công", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ********************************************
// B. SỔ ĐỊA CHỈ (AddressList)
// ********************************************

// @route GET /api/user/addresses
// @desc Lấy tất cả địa chỉ của người dùng
router.get("/addresses", protect, async (req, res) => {
  try {
    const addresses = await UserAddress.find({ userId: req.user.id }).sort({
      isDefault: -1,
      createdAt: 1,
    });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/user/addresses
// @desc Thêm địa chỉ mới
router.post("/addresses", protect, async (req, res) => {
  const {
    receiverName,
    phone,
    addressDetail,
    district,
    city,
    isDefault,
    type,
  } = req.body;
  try {
    const newAddress = new UserAddress({
      userId: req.user.id,
      receiverName,
      phone,
      addressDetail,
      district,
      city,
      isDefault,
      type,
    });

    // Xử lý logic đặt mặc định (nếu địa chỉ mới là mặc định, các địa chỉ cũ phải chuyển thành không mặc định)
    if (isDefault) {
      await UserAddress.updateMany(
        { userId: req.user.id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/user/addresses/:addressId
// @desc Xóa địa chỉ
router.delete("/addresses/:addressId", protect, async (req, res) => {
  try {
    const result = await UserAddress.findOneAndDelete({
      _id: req.params.addressId,
      userId: req.user.id,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ********************************************
// C. THỐNG KÊ MUA SẮM (UserStatistics)
// ********************************************

// @route GET /api/user/stats
// @desc Lấy tổng quan thống kê cho UserProfile
router.get("/stats", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Tổng chi tiêu và số lượng đơn hàng
    const orderStats = await Order.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          currentStatus: "Thành công",
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
        },
      },
    ]);

    // 2. Số lượng đánh giá (ví dụ: đánh giá 5 sao)
    const reviewStats = await ProductReview.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), rating: 5 } },
      { $group: { _id: null, totalFiveStarReviews: { $sum: 1 } } },
    ]);

    const stats = {
      totalOrders: orderStats[0]?.totalOrders || 0,
      totalSpent: orderStats[0]?.totalSpent || 0,
      totalFiveStarReviews: reviewStats[0]?.totalFiveStarReviews || 0,
      // (Thêm các thống kê khác như số voucher, điểm tích lũy...)
    };

    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching statistics", error: error.message });
  }
});

module.exports = router;
