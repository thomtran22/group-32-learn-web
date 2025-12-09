// src/models/ShipperPerformance.js
import mongoose from "mongoose";

const ShipperPerformanceSchema = new mongoose.Schema(
  {
    shipperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShipperInfo",
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

const ShipperPerformance = mongoose.model(
  "ShipperPerformance",
  ShipperPerformanceSchema
);
export default ShipperPerformance;
