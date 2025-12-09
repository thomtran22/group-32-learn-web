const jwt = require("jsonwebtoken");
// const User = require('../models/User'); // Tùy chọn: tìm User trong DB
const JWT_SECRET = process.env.JWT_SECRET || "YOUR_SUPER_SECRET_KEY";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Giải mã Token
      const decoded = jwt.verify(token, JWT_SECRET);

      // GẮN USER ID VÀO REQUEST (Sử dụng ID từ payload JWT)
      // Giả định JWT payload chứa { id: userId }
      req.user = { id: decoded.id };

      next();
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

module.exports = { protect };
