import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Truy cập bị từ chối. Thiếu Token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn.",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Bạn không có quyền truy cập (Yêu cầu Admin)",
    });
  }
};

const isShipper = (req, res, next) => {
  if (req.user?.role === "shipper" || req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Chỉ Shipper mới có quyền này",
    });
  }
};

const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "customer") {
    next();
  } else {
    res.status(403).json({ message: "Chỉ khách hàng mới có quyền này" });
  }
};
export { verifyToken, isAdmin, isShipper };
