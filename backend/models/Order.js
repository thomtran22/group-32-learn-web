import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1. Khóa Liên kết & Tổng quan
    // -----------------------------------------------------
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true, // Quan trọng cho việc truy vấn Lịch sử Đơn hàng
    },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },

    // Trạng thái đơn hàng tổng quát (dùng cho User Profile)
    currentStatus: {
      type: String,
      required: true,
      default: "Chờ xác nhận",
      enum: [
        "Chờ xác nhận",
        "Đã xác nhận",
        "Đang chuẩn bị hàng",
        "Đang vận chuyển",
        "Thành công",
        "Đã hủy",
        "Hoàn trả",
      ],
    },

    // -----------------------------------------------------
    // 2. Chi tiết Sản phẩm (Nhúng)
    // -----------------------------------------------------
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Giá tại thời điểm đặt hàng
      },
    ],

    // -----------------------------------------------------
    // 3. Thông tin Vận chuyển (Tích hợp từ Schema Shipping)
    // -----------------------------------------------------
    shippingDetails: {
      recipientName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true }, // Địa chỉ chi tiết
      carrier: { type: String, default: "Standard Delivery" },
      shippingFee: { type: Number, default: 0 },
      estimatedDeliveryDate: { type: Date, default: null },
      trackingNumber: { type: String, sparse: true },
      trackingUrl: { type: String, default: null },
    },

    shipperId: {
      // ID của Shipper được phân công
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShipperInfo",
      default: null,
      index: true,
    },

    deliveryStatus: {
      type: String,
      enum: [
        "AWAITING_PICKUP",
        "PICKED_UP",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "FAILED_ATTEMPT",
        "RETURNED",
      ],
      default: "AWAITING_PICKUP",
    },

    // 5. Lịch sử Trạng thái & Theo dõi
    statusHistory: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: String, default: "System" },
      },
    ],

    deliveryTracking: [
      {
        // Lịch sử theo dõi vị trí giao hàng (dùng cho Admin/Shipper)
        timestamp: { type: Date, default: Date.now },
        status: { type: String }, // Trạng thái giao hàng tại thời điểm đó
        shipperLocation: { type: String }, // Vị trí ghi nhận của Shipper
      },
    ],
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
