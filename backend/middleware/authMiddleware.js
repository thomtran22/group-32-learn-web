const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Lấy token từ header: "Authorization: Bearer <token>"
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Truy cập bị từ chối. Thiếu Token."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "Token không hợp lệ." });
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

const isShipper = (req, res, next) => {
  if (req.user && (req.user.role === "shipper" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Chỉ Shipper mới có quyền này" });
  }
};
module.exports = { verifyToken, isAdmin, isShipper };