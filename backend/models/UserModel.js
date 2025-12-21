import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    password: { type: String, required: true },

    gender: { type: String },

    dateOfBirth: { type: String },

    role: {
      type: String,
      enum: ["admin", "customer", "shipper"],
      default: "customer",
      required: true,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");
export default User;