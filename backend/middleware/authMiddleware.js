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
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({
      success: false,
      message: "Token không hợp lệ.",
    });
  }
};

// MIDDLEWARE CHỈ CHO PHÉP ADMIN
const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Truy cập bị từ chối. Chỉ Admin mới có quyền này.",
    });
  }
};

// MIDDLEWARE CHỈ CHO PHÉP SHIPPER
const isShipper = (req, res, next) => {
  if (req.user?.role === "shipper") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Truy cập bị từ chối. Chỉ Shipper mới có quyền này.",
    });
  }
};

// MIDDLEWARE CHỈ CHO PHÉP CUSTOMER
const isCustomer = (req, res, next) => {
  if (req.user?.role === "customer") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Truy cập bị từ chối. Chỉ khách hàng mới có quyền này.",
    });
  }
};

// MIDDLEWARE CHỈ CHẶN SHIPPER (cho phép admin và customer)
const blockShipper = (req, res, next) => {
  if (req.user?.role === "shipper") {
    return res.status(403).json({
      success: false,
      message: "Shipper không được phép truy cập tính năng này.",
    });
  }
  next();
};

// MIDDLEWARE CHỈ CHẶN ADMIN (cho phép shipper và customer)
const blockAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin không được phép truy cập tính năng này.",
    });
  }
  next();
};

export { 
  verifyToken, 
  isAdmin, 
  isShipper, 
  isCustomer,
  blockShipper,
  blockAdmin
};