const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: "360d",
  });
};

router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDay,
      birthMonth,
      birthYear,
      role,
    } = req.body;

    let dateOfBirth = null;
    if (birthDay && birthMonth && birthYear) {
      dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth: dateOfBirth,
      role: "customer",
    });

    await newUser.save();

    res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/isadmin", async (req, res) => {
  try {
    const {
      fullName,
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDay,
      birthMonth,
      birthYear,
      role,
    } = req.body;

    let dateOfBirth = null;
    if (birthDay && birthMonth && birthYear) {
      dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth: dateOfBirth,
      role: "admin",
    });

    await newUser.save();

    res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/isshipper", async (req, res) => {
  try {
    const {
      fullName,
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDay,
      birthMonth,
      birthYear,
      role,
    } = req.body;

    let dateOfBirth = null;
    if (birthDay && birthMonth && birthYear) {
      dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth: dateOfBirth,
      role: "shipper",
    });

    await newUser.save();

    res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại!" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Sai mật khẩu!" });
    }

    const token = generateToken(user._id, user.role);

    user.password = undefined;

    res.json({
      message: "Đăng nhập thành công",
      role: user.role,
      token: token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// router.post("/change-password", async (req, res) => {});

module.exports = { router, generateToken };
