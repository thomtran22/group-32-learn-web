const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ---------------------
// ĐĂNG KÝ
// ---------------------
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, gender, birthDay, birthMonth, birthYear, role } = req.body;

        // check email tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            gender,
            birthDay,
            birthMonth,
            birthYear,
            role
        });

        await newUser.save();

        res.json({
            message: "Đăng ký thành công!",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ---------------------
// ĐĂNG NHẬP
// ---------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // tìm user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại!" });
        }

        // check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Sai mật khẩu!" });
        }

        // login thành công
        res.json({
            message: "Đăng nhập thành công",
            role: user.role,
            token: "fake-token", // sau có thể chuyển sang JWT thật
            user: {
                id: user._id,
                fullName: user.fullName
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
