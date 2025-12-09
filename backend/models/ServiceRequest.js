const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },

    requestType: {
      type: String,
      enum: ["REFUND", "EXCHANGE", "COMPLAINT", "INQUIRY"],
      required: true,
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "RESOLVED", "CLOSED"],
      default: "PENDING",
    },

    resolutionDetails: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);
