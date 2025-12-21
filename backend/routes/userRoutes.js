import 'dotenv/config'
import express from "express";
const router = express.Router();
import User from "../models/UserModel.js";
import UserAddress from "../models/UserAddress.js";
import Order from "../models/OrderModel.js";
import ProductReview from "../models/ProductReview.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const generateToken = (userId) => {
  if (!userId) {
    return;
  }

  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


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

router.get("/addresses", verifyToken, async (req, res) => {
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

router.post("/addresses", verifyToken, async (req, res) => {
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

router.delete("/addresses/:addressId", verifyToken, async (req, res) => {
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

router.get("/stats", verifyToken, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const orderStats = await Order.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: {
            $sum: {
              $cond: [
                { $eq: ["$currentStatus", "Thành công"] },
                "$totalAmount",
                0,
              ],
            },
          },
          pendingOrders: {
            $sum: {
              $cond: [
                { $in: ["$currentStatus", ["Đang xử lý", "Chờ xác nhận"]] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const reviewStats = await ProductReview.aggregate([
      {
        $match: {
          userId,
          rating: 5,
        },
      },
      {
        $group: {
          _id: null,
          totalFiveStarReviews: { $sum: 1 },
        },
      },
    ]);

    const totalSpent = orderStats[0]?.totalSpent || 0;

    const NEXT_TIER_REQUIREMENT = 5000000;
    const NEXT_TIER_DISCOUNT = 10;

    res.json({
      totalOrders: orderStats[0]?.totalOrders || 0,
      totalSpent,
      pendingOrders: orderStats[0]?.pendingOrders || 0,
      totalFiveStarReviews: reviewStats[0]?.totalFiveStarReviews || 0,
      nextTierDiscount: NEXT_TIER_DISCOUNT,
      pointsToNextTier: Math.max(0, NEXT_TIER_REQUIREMENT - totalSpent),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching statistics",
      error: error.message,
    });
  }
});

export default router;
