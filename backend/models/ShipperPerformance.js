const mongoose = require("mongoose");

const ShipperPerformanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalDeliveries: { type: Number, default: 0 },
    successfulDeliveries: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    avgDeliveryTime: { type: Number, default: 0 }, // Tính bằng phút
    cancellationRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShipperPerformance", ShipperPerformanceSchema);