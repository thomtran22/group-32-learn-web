// src/models/ShipperInfo.js
import mongoose from "mongoose";

const ShipperInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ON_DELIVERY", "PENDING_APPROVAL"],
      default: "ACTIVE",
    },
    currentLocation: {
      type: { type: String, default: "Point" },
      coordinates: [{ type: Number }], // [longitude, latitude]
    },
    vehicleType: {
      type: String,
      enum: ["Motorbike", "Car", "Bicycle"],
      required: true,
    },
    licensePlate: { type: String, unique: true, sparse: true },
    workingArea: [{ type: String }],
    rating: { type: Number, default: 5, min: 1, max: 5 },
  },
  { timestamps: true }
);

const ShipperInfo = mongoose.model("ShipperInfo", ShipperInfoSchema);
export default ShipperInfo;
