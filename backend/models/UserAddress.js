const mongoose = require("mongoose");

const UserAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    receiverName: { type: String, required: true },
    phone: { type: String, required: true },
    addressDetail: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    type: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAddress", UserAddressSchema);
