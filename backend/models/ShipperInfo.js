const mongoose = require("mongoose");

const ShipperInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BUSY"],
      default: "ACTIVE",
    },
    currentLocation: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    vehicleType: {
      type: String,
      enum: ["Motorbike", "Car", "Truck"],
      default: "Motorbike",
    },
    licensePlate: { type: String, default: "" },
    workingArea: [{ type: String }],
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

ShipperInfoSchema.index({ currentLocation: "2dsphere" });

module.exports = mongoose.model("ShipperInfo", ShipperInfoSchema);