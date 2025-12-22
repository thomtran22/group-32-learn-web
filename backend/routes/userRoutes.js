import "dotenv/config";
import express from "express";
const router = express.Router();
import User from "../models/UserModel.js";
import Order from "../models/OrderModel.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateToken = (userId, role) => {
  if (!userId) {
    return;
  }

  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
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

router.put("/me", verifyToken, async (req, res) => {
  // Nhận các trường khớp với state của React Frontend
  const { fullName, gender, birthDay, birthMonth, birthYear } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.fullName = fullName || user.fullName;
      user.gender = gender || user.gender;
      user.birthDay = birthDay || user.birthDay;
      user.birthMonth = birthMonth || user.birthMonth;
      user.birthYear = birthYear || user.birthYear;

      const updatedUser = await user.save();

      res.json({
        message: "Cập nhật thành công",
        user: {
          fullName: updatedUser.fullName,
          gender: updatedUser.gender,
          birthDay: updatedUser.birthDay,
          birthMonth: updatedUser.birthMonth,
          birthYear: updatedUser.birthYear,
          email: updatedUser.email,
        },
      });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/stats", verifyToken, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const orderStats = await Order.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0],
            },
          },
          totalSpent: {
            $sum: {
              $cond: [{ $eq: ["$status", "Delivered"] }, "$totalPrice", 0],
            },
          },
          pendingOrders: {
            $sum: {
              $cond: [
                { $in: ["$status", ["Pending", "Processing", "Shipping"]] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      pendingOrders: 0,
    };

    const totalSpent = stats.totalSpent || 0;
    const NEXT_TIER_REQUIREMENT = 5000000; // Ngưỡng 5 triệu để lên hạng
    const NEXT_TIER_DISCOUNT = 10;

    res.json({
      totalOrders: stats.totalOrders,
      totalSpent: totalSpent,
      pendingOrders: stats.pendingOrders,
      totalFiveStarReviews: 0, // Hiện tại bỏ qua vì không dùng ProductReview
      nextTierDiscount: NEXT_TIER_DISCOUNT,
      pointsToNextTier: Math.max(0, NEXT_TIER_REQUIREMENT - totalSpent),
    });
  } catch (error) {
    console.error("Lỗi thống kê:", error);
    res.status(500).json({
      message: "Lỗi hệ thống khi lấy thống kê",
      error: error.message,
    });
  }
});

router.put("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Mật khẩu hiện tại không chính xác." });
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res
        .status(400)
        .json({ message: "Mật khẩu mới không được trùng với mật khẩu cũ." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error("Lỗi đổi mật khẩu:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi đổi mật khẩu." });
  }
});

export default router;
