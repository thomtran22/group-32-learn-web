import express from "express";
const router = express.Router();
import Order from "../models/OrderModel.js";
import ShipperInfo from "../models/ShipperInfo.js";
import ShipperPerformance from "../models/ShipperPerformance.js";
import User from "../models/UserModel.js";
import { verifyToken, isShipper } from "../middleware/authMiddleware.js";

router.get("/orders/new", verifyToken, isShipper, async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: req.user.id,
      status: { $in: ["Pending", "Processing"] },
    })
      .select("shippingAddress totalPrice createdAt orderItems")
      .populate("orderItems.product", "name images")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tải đơn mới" });
  }
});

router.get("/orders/active", verifyToken, isShipper, async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: req.user.id,
      status: "Shipping",
    })
      .select("shippingAddress totalPrice status orderItems")
      .populate("orderItems.product", "name images")
      .sort({ updatedAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tải đơn đang giao" });
  }
});

router.put(
  "/orders/:orderId/status",
  verifyToken,
  isShipper,
  async (req, res) => {
    const { newStatus, note, location } = req.body;
    const allowedStatuses = ["Delivered", "Cancelled"];

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        message:
          "Shipper chỉ có thể cập nhật trạng thái thành 'Delivered' hoặc 'Cancelled'",
      });
    }

    try {
      const order = await Order.findOne({
        _id: req.params.orderId,
        shipperId: req.user.id,
      });

      if (!order) {
        return res.status(404).json({
          message:
            "Không tìm thấy đơn hàng hoặc bạn không phải shipper của đơn này",
        });
      }

      if (["Delivered", "Cancelled"].includes(order.status)) {
        return res.status(400).json({
          message: "Đơn hàng này đã hoàn tất, không thể cập nhật thêm.",
        });
      }

      order.status = newStatus;
      if (newStatus === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        if (order.paymentMethod === "COD") {
          order.isPaid = true;
          order.paidAt = Date.now();
        }
      }

      if (newStatus === "Delivered") {
        const earnedAmount =
          order.shippingPrice > 0 ? order.shippingPrice : 15000;

        await ShipperPerformance.findOneAndUpdate(
          { userId: req.user.id },
          {
            $inc: {
              totalDeliveries: 1,
              successfulDeliveries: 1,
              totalEarnings: earnedAmount,
            },
            $set: { lastActive: new Date() },
          },
          { upsert: true, new: true }
        );
      }

      await order.save();
      res.json({ message: "Cập nhật trạng thái thành công", order });
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      res.status(500).json({ message: "Lỗi hệ thống khi cập nhật trạng thái" });
    }
  }
);

router.get("/stats", verifyToken, isShipper, async (req, res) => {
  try {
    const shipperId = req.user.id;

    const activeDeliveryCount = await Order.countDocuments({
      shipperId: shipperId,
      status: "Shipping",
    });

    const deliveredOrders = await Order.find({
      shipperId: shipperId,
      status: "Delivered",
    });

    const totalEarnings = deliveredOrders.reduce((acc, order) => {
      const shippingFee = order.shippingPrice > 0 ? order.shippingPrice : 15000;
      return acc + shippingFee;
    }, 0);

    const cancelledCount = await Order.countDocuments({
      shipperId: shipperId,
      status: "Cancelled",
    });
    const totalAssigned = deliveredOrders.length + cancelledCount;
    const cancellationRate =
      totalAssigned > 0 ? cancelledCount / totalAssigned : 0;

    res.json({
      activeDeliveryCount,
      successfulDeliveries: deliveredOrders.length,
      totalEarnings,
      cancellationRate,
    });
  } catch (error) {
    console.error("Lỗi tải thống kê:", error);
    res.status(500).json({ message: "Lỗi tải thống kê" });
  }
});

router.get("/info", verifyToken, isShipper, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    let shipperInfo = await ShipperInfo.findOne({ userId: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const shipperDetails = shipperInfo || {
      phoneNumber: "",
      vehicleType: "Motorbike",
      licensePlate: "",
      workingArea: [],
      status: "ACTIVE",
      rating: 5,
    };

    res.json({
      user,
      shipperDetails,
    });
  } catch (error) {
    console.error("Lỗi GET /info:", error);
    res.status(500).json({ message: "Lỗi máy chủ khi tải hồ sơ" });
  }
});

router.put("/info", verifyToken, isShipper, async (req, res) => {
  const { fullName, email, phone, vehicleType, licensePlate } = req.body;

  try {
    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email này đã được sử dụng bởi tài khoản khác." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true }
    ).select("-password");

    const updatedShipperInfo = await ShipperInfo.findOneAndUpdate(
      { userId: req.user.id },
      {
        phoneNumber: phone,
        vehicleType,
        licensePlate,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Cập nhật hồ sơ thành công",
      user: updatedUser,
      shipperDetails: updatedShipperInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật hồ sơ" });
  }
});

export default router;
