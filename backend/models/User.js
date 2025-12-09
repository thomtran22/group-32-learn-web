import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // -----------------------------------------------------
    // 1. Thông tin Xác thực (Authentication)
    // -----------------------------------------------------
    email: {
      type: String,
      required: true,
      unique: true, // Email là duy nhất
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Quan trọng: Luôn ẩn password khi truy vấn
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    }, // ----------------------------------------------------- // 2. Thông tin Cá nhân (Phục vụ tab PersonalInfo) // -----------------------------------------------------

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    fullName: {
      // Tên đầy đủ (dùng để hiển thị)
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // Cho phép nhiều null/undefined phone number
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", null],
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    }, // ----------------------------------------------------- // 3. Trạng thái Tài khoản & Metadata // -----------------------------------------------------

    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware để tạo fullName trước khi lưu
UserSchema.pre("save", function (next) {
  if (this.isModified("firstName") || this.isModified("lastName")) {
    this.fullName = `${this.firstName || ""} ${this.lastName || ""}`.trim();
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
