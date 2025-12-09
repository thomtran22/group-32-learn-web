// server.js (Đã sửa lỗi cú pháp và thứ tự)

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// 1. REQUIRE CÁC ROUTER
const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const serviceRoutes = require("./routes/ServiceRoutes");
// Đổi tên để tránh xung đột với biến cuối cùng
const ShipperRouterModule = require("./routes/ShipperRoutes");

// 2. XỬ LÝ LỖI DEFAULT EXPORT (Lấy Router Object Hợp lệ)
// Nếu file router sử dụng export default (ESM), router object sẽ nằm trong .default
const ShipperRouterObject = ShipperRouterModule.default || ShipperRouterModule;

const app = express();
app.use(express.json());

// KẾT NỐI MONGO DB
const MONGO_URI =
  "mongodb-srv://thuong:27040404@cluster0.kgccigl.mongodb.net/test1";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ĐỊNH TUYẾN API
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
// Sử dụng biến Router Object đã được xử lý
app.use("/api/shipper", ShipperRouterObject);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
