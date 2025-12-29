import express from "express";
const router = express.Router();
import Order from "../models/OrderModel.js";
import ShipperInfo from "../models/ShipperInfo.js";
import ShipperPerformance from "../models/ShipperPerformance.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
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
      .select("shippingAddress totalPrice status orderItems createAt")
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
    // Thêm "Shipping" vào danh sách trạng thái hợp lệ
    const allowedStatuses = ["Delivered", "Cancelled", "Shipping"];

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        message:
          "Shipper chỉ có thể cập nhật trạng thái thành 'Shipping', 'Delivered' hoặc 'Cancelled'",
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

      // Logic cập nhật trạng thái
      order.status = newStatus;

      // Nếu chuyển sang trạng thái "Shipping" (Bắt đầu giao)
      if (newStatus === "Shipping") {
        // Có thể thêm logic nếu cần (VD: Gửi thông báo cho user)
      }

      // Xử lý khi hủy đơn (Hoàn lại kho)
      if (newStatus === "Cancelled") {
        const bulkUpdateOps = order.orderItems.map((item) => ({
          updateOne: {
            filter: {
              _id: item.product,
              "variants.color": item.color,
              "variants.size": item.size,
            },
            update: {
              $inc: { "variants.$.quantity": item.quantity },
            },
          },
        }));

        if (bulkUpdateOps.length > 0) {
          await Product.bulkWrite(bulkUpdateOps);
        }
      }

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
      status: ["Delivered", "Completed"],
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

router.put("/info", verifyToken, isShipper, async (req, res) => {
  const {
    fullName,
    email,
    phone,
    vehicleType,
    licensePlate,
    gender,
    dateOfBirth,
  } = req.body;

  try {
    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });
      if (existingUser)
        return res.status(400).json({ message: "Email đã tồn tại." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email, gender, dateOfBirth },
      { new: true }
    ).select("-password");

    const updatedShipperInfo = await ShipperInfo.findOneAndUpdate(
      { userId: req.user.id },
      { phoneNumber: phone, vehicleType, licensePlate },
      { new: true, upsert: true }
    );

    res.json({
      message: "Cập nhật hồ sơ thành công",
      user: updatedUser,
      shipperDetails: updatedShipperInfo,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
});

export default router;
