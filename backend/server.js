import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import shipperRoutes from './routes/shipperRoutes.js';
import voucherRoutes from './routes/voucherRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(hpp());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("API is running on port " + PORT);
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/shipper", shipperRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

// Todo: Dùng để test
// Cách dùng trên trình duyệt: https://group-32-learn-web-8hmv.onrender.com/api/test/get-token/ID_USER_CUA_BAN?role=admin
app.get('/api/test/get-token/:userId', (req, res) => {
  const { userId } = req.params;
  const role = req.query.role || 'customer';

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Chưa cấu hình JWT_SECRET trong file .env" });
  }

  // Tạo token hạn 30 ngày với đầy đủ id và role
  const token = jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({
    message: `Tạo token thành công cho quyền: ${role.toUpperCase()}`,
    userId: userId,
    role: role,
    token: token
  });
});

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
