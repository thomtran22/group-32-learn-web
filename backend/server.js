// server.js (Đã sửa lỗi cú pháp và thứ tự)

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// 1. REQUIRE CÁC ROUTER
const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const serviceRoutes = require("./routes/ServiceRoutes");
// Đổi tên để tránh xung đột với biến cuối cùng
const ShipperRoutes = require("./routes/ShipperRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Chỉ cho phép nguồn gốc Frontend của bạn truy cập
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// KẾT NỐI MONGO DB
const MONGO_URI =
  "mongodb+srv://thuong:27040404@cluster0.kgccigl.mongodb.net/test1";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ĐỊNH TUYẾN API
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/shipper", ShipperRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
