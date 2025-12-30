import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "node:crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, gender, dateOfBirth } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
    }
    
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

    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
    }

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

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    // Bảo mật: Luôn trả về thông báo thành công dù email có tồn tại hay không
    // để tránh hacker dò tìm email trong hệ thống
    const successMessage = "Nếu email tồn tại, link khôi phục đã được gửi vào hòm thư của bạn.";

    if (!user) {
      console.log(`[ForgotPwd] Email ${normalizedEmail} không tồn tại trong DB.`);
      return res.json({ message: successMessage });
    }

    // 1. Tạo Token ngẫu nhiên (Raw Token dùng để gửi qua mail)
    const resetToken = randomBytes(32).toString("hex");

    // 2. Băm Token trước khi lưu vào DB (Bảo mật: nếu lộ DB cũng không lộ token reset)
    const hashedToken = createHash("sha256").update(resetToken).digest("hex");

    // 3. Lưu vào DB kèm thời gian hết hạn (15 phút)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    // 4. Tạo Link Reset
    const clientUrl = process.env.FRONTEND_URL;
    const resetUrl = `${clientUrl.replace(/\/$/, "")}/reset-password?token=${resetToken}`;

    // 5. Gửi Email (Dùng OAuth2 Service)
    console.log(`[ForgotPwd] Đang gửi mail tới ${user.email}...`);
    await sendPasswordResetEmail(user.email, resetUrl);
    
    return res.json({ message: successMessage });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.json({ message: "Nếu email tồn tại, link khôi phục đã được gửi." });
  }
};

// --- RESET PASSWORD ---
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Thiếu thông tin token hoặc mật khẩu mới" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
    }

    // 1. Băm token nhận được để so sánh với cái đã lưu trong DB
    const hashedToken = createHash("sha256").update(token).digest("hex");

    // 2. Tìm User có token trùng khớp và CHƯA hết hạn ($gt: greater than now)
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Link khôi phục không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.",
      });
    }

    // 3. Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Cập nhật User và Xóa token reset
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Lỗi server khi đặt lại mật khẩu" });
  }
};