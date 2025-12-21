import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    // ✅ JWT: thống nhất payload với middleware (id + role)
    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role, // customer | shipper | admin
      },
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
    res.status(500).json({ message: "Lỗi server" });
  }
};
