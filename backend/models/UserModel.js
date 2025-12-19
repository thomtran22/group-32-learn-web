import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    gender: ["Nam", "Nữ", "Khác"],
    birthDay: { type: String },
    birthMonth: { type: String },
    birthYear: { type: String },

    role: {
      type: String,
      enum: ["customer", "shipper"],
      required: true,
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
