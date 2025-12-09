const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    }, // Mỗi đơn hàng chỉ có 1 đánh giá

    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },

    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
