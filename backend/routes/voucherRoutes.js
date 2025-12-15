const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Voucher = require("../models/Voucher");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/my-wallet", verifyToken, async (req, res) => {
  try {
    const now = new Date();

    const vouchers = await Voucher.find({
      isActive: true,
      endDate: { $gt: now },
      usersUsed: { $ne: req.user.id },
    }).sort({ discountValue: -1 });

    const availableVouchers = vouchers.filter(
      (v) => v.timesUsed < v.usageLimit
    );

    res.json(availableVouchers);
  } catch (error) {
    res.status(500).json({
      message: "Không thể tải voucher",
      error: error.message,
    });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  const { code } = req.body;

  try {
    const voucher = await Voucher.findOne({ code: code.toUpperCase() });

    if (!voucher) {
      return res.status(404).json({ message: "Voucher không tồn tại" });
    }

    if (!voucher.isActive || voucher.endDate < new Date()) {
      return res
        .status(400)
        .json({ message: "Voucher đã hết hạn hoặc không hoạt động" });
    }

    if (voucher.usersUsed.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Bạn đã sở hữu voucher này" });
    }

    voucher.usersUsed.push(req.user.id);
    await voucher.save();

    res.json({ message: "Thêm voucher thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm voucher",
      error: error.message,
    });
  }
});

router.post("/apply", verifyToken, async (req, res) => {
  const { voucherCode, currentCartTotal } = req.body;

  try {
    const voucher = await Voucher.findOne({
      code: voucherCode.toUpperCase(),
    });

    if (!voucher) {
      return res.status(404).json({ message: "Voucher không tồn tại" });
    }

    if (!voucher.isActive || voucher.endDate < new Date()) {
      return res
        .status(400)
        .json({ message: "Voucher đã hết hạn hoặc không hoạt động" });
    }

    if (voucher.timesUsed >= voucher.usageLimit) {
      return res
        .status(400)
        .json({ message: "Voucher đã hết lượt sử dụng" });
    }

    if (voucher.usersUsed.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Bạn đã sử dụng voucher này" });
    }

    if (currentCartTotal < voucher.minOrderValue) {
      return res.status(400).json({
        message: `Đơn hàng tối thiểu ${voucher.minOrderValue.toLocaleString()} VNĐ`,
      });
    }

    let discountAmount = 0;

    if (voucher.discountType === "fixed") {
      discountAmount = voucher.discountValue;
    } else {
      const temp = currentCartTotal * (voucher.discountValue / 100);
      discountAmount = voucher.maxDiscountAmount
        ? Math.min(temp, voucher.maxDiscountAmount)
        : temp;
    }

    res.json({
      voucherId: voucher._id,
      code: voucher.code,
      discountAmount: Math.round(discountAmount),
    });
  } catch (error) {
    res.status(500).json({
      message: "Không thể áp dụng voucher",
      error: error.message,
    });
  }
});

router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const vouchers = await Voucher.find().sort({ createdAt: -1 });
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    const saved = await voucher.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({
      message: "Tạo voucher thất bại",
      error: error.message,
    });
  }
});

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Voucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy voucher" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({
      message: "Cập nhật thất bại",
      error: error.message,
    });
  }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Voucher.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy voucher" });
    }

    res.json({ message: "Xóa voucher thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
});

module.exports = router;