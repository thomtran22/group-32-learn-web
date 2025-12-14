const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {verifyToken} = require("../middleware/authMiddleware");
const UserAddress = require("../models/UserAddress");

router.get("/addresses", verifyToken, async (req, res) => {
  try {
    const addresses = await UserAddress.find({
      userId: req.user.id,
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Không thể tải danh sách địa chỉ." });
  }
});

router.post("/addresses", verifyToken, async (req, res) => {
  try {
    const {
      receiverName,
      phone,
      addressDetail,
      district,
      city,
      isDefault,
      type,
    } = req.body;

    if (
      !receiverName ||
      !phone ||
      !addressDetail ||
      !district ||
      !city
    ) {
      return res.status(400).json({ message: "Thiếu thông tin địa chỉ." });
    }

    if (isDefault) {
      await UserAddress.updateMany(
        { userId: req.user.id },
        { isDefault: false }
      );
    }

    const address = await UserAddress.create({
      userId: req.user.id,
      receiverName,
      phone,
      addressDetail,
      district,
      city,
      isDefault: !!isDefault,
      type: type || "Home",
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: "Tạo địa chỉ thất bại." });
  }
});

router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID địa chỉ không hợp lệ." });
    }

    if (req.body.isDefault) {
      await UserAddress.updateMany(
        { userId: req.user.id },
        { isDefault: false }
      );
    }

    const updatedAddress = await UserAddress.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        receiverName: req.body.receiverName,
        phone: req.body.phone,
        addressDetail: req.body.addressDetail,
        district: req.body.district,
        city: req.body.city,
        isDefault: req.body.isDefault,
        type: req.body.type,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ." });
    }

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: "Cập nhật địa chỉ thất bại." });
  }
});

router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID địa chỉ không hợp lệ." });
    }

    const deletedAddress = await UserAddress.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ." });
    }

    res.json({ message: "Đã xóa địa chỉ thành công." });
  } catch (error) {
    res.status(500).json({ message: "Xóa địa chỉ thất bại." });
  }
});

module.exports = router;