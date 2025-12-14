const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
//const xss = require('xss-clean');
const hpp = require('hpp');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
//app.use(xss()); // Sanitize data
app.use(hpp()); // Chống HTTP Parameter Pollution

const orderRoutes = require('./routes/OrderRoutes');
const cartRoutes = require('./routes/CartRoutes');
const userRoutes = require("./routes/UserRoutes");
const ShipperRoutes = require("./routes/ShipperRoutes");
const addressRoutes = require("./routes/addressRoutes");
const voucherRoutes = require("./routes/voucherRoutes");
//const { getBestSellers } = require('./controllers/ProductController');

// Routes chính
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
//app.use('/api/product', productRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/shipper", ShipperRoutes);
app.use("/api/user", userRoutes);
// Route riêng cho best-sellers (frontend đang gọi /api/best-sellers)
//app.get('/api/best-sellers', getBestSellers);


// ==========================================
// KHU VỰC TEST (CỬA HẬU) - SAU NÀY XÓA
// ==========================================
app.get('/', (req, res) => {
  res.json({ message: 'Backend API đang chạy!' });
});

// Route lấy Token nhanh (Fake Login)
app.get('/api/test/get-token/:userId', (req, res) => {
    const { userId } = req.params;
    // Tạo token hạn 30 ngày
    const token = jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
    
    res.json({ 
        message: "Tạo token thành công! Copy token bên dưới ném vào LocalStorage",
        userId: userId,
        token: token 
    });
});
// ==========================================


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});