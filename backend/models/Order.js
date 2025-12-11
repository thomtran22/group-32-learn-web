const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // ==========================================
    // 1. THÔNG TIN NGƯỜI MUA & SẢN PHẨM
    // ==========================================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Giúp tìm kiếm đơn hàng theo user nhanh hơn
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String }, // Lưu tên SP tại thời điểm mua (đề phòng SP bị xóa sau này)
        image: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Giá tại thời điểm đặt hàng
      },
    ],

    // ==========================================
    // 2. THÔNG TIN THANH TOÁN & GIAO NHẬN
    // ==========================================
    shippingDetails: {
      recipientName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: false },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "COD", // Ví dụ: COD, PayPal, VNPAY
    },
    paymentResult: {
      // Dùng cho thanh toán online
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    // Tổng tiền đơn hàng (bao gồm cả phí ship nếu có)
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },

    // Trạng thái thanh toán
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    // ==========================================
    // 3. LOGIC SHIPPER (QUAN TRỌNG)
    // ==========================================

    // ID của Shipper được phân công đơn này
    shipperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Liên kết với bảng User (nơi chứa tài khoản Shipper)
      default: null,
      index: true,
    },

    // Trạng thái vận chuyển chi tiết
    deliveryStatus: {
      type: String,
      enum: [
        "PENDING", // Đơn mới, chưa xử lý
        "CONFIRMED", // Shop đã xác nhận
        "AWAITING_PICKUP", // Đã đóng gói, chờ Shipper đến lấy
        "PICKED_UP", // Shipper đã lấy hàng
        "OUT_FOR_DELIVERY", // Đang trên đường giao cho khách
        "DELIVERED", // Giao thành công
        "FAILED_ATTEMPT", // Giao thất bại (khách không nghe máy, v.v.)
        "CANCELLED", // Đã hủy
        "RETURNED", // Hoàn trả về kho
      ],
      default: "PENDING",
    },

    // Lịch sử hành trình (Tracking Log)
    deliveryTracking: [
      {
        status: { type: String }, // Trạng thái tại thời điểm đó (VD: PICKED_UP)
        timestamp: { type: Date, default: Date.now },
        shipperLocation: { type: String }, // Vị trí shipper (VD: "Kho Cầu Giấy")
        note: { type: String }, // Ghi chú (VD: "Khách hẹn chiều giao lại")
      },
    ],

    // Ngày giao hàng thành công thực tế
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

module.exports = mongoose.model("Order", OrderSchema);
