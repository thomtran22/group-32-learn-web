const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/User");

if (!JWT_SECRET) {
  throw new Error("Cần định nghĩa JWT_SECRET trong file .env!");
}

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (user) {
        req.user = user;
        next();
        return;
      } else {
        return res.status(401).json({ message: "Token không tìm thấy User" });
      }
    } catch (error) {
      console.error("Lỗi xác thực Token:", error.message);
      return res
        .status(401)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có Token, không được ủy quyền" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Bạn không có quyền truy cập (Yêu cầu Admin)",
    });
  }
};

module.exports = { protect, isAdmin };
