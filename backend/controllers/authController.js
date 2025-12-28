import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "node:crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, gender, dateOfBirth } = req.body;

    if (role === "admin") {
      return res.status(403).json({ message: "Không được tạo admin" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "customer",
      gender,
      dateOfBirth,
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        issuer: "group-32-api",
        audience: "group-32-web",
      }
    );

    res.json({
      token,
      role: user.role,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🔥 forgotPassword HIT", email);

    if (!email) {
      return res.status(400).json({ message: "Thiếu email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "Nếu email tồn tại, link khôi phục đã được gửi",
      });
    }

    if (!user.email) {
      return res.status(400).json({ message: "Email người dùng không hợp lệ" });
    }

    const resetToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(user.email, resetUrl);

    return res.json({
      message: "Nếu email tồn tại, link khôi phục đã được gửi",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Link không hợp lệ hoặc đã hết hạn",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};