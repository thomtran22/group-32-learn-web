const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["shipper", "admin", "customer"],
      default: "customer",
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
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
    },

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
  { timestamps: true }
);

// UserSchema.pre("save", function (next) {
//   if (
//     (this.isModified("firstName") || this.isModified("lastName")) &&
//     (this.firstName || this.lastName)
//   ) {
//     this.fullName = `${this.firstName || ""} ${this.lastName || ""}`.trim();
//   } else if (!this.fullName && (this.firstName || this.lastName)) {
//     this.fullName = `${this.firstName || ""} ${this.lastName || ""}`.trim();
//   }
//   next();
// });

const User = mongoose.model("User", UserSchema);
module.exports = User;
