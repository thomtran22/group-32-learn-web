require('dotenv').config(); // <- nạp biến môi trường từ .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// PORT từ .env nếu có, không thì dùng 3000
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// Sử dụng routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Kết nối MongoDB
console.log("Đang cố gắng kết nối MongoDB...");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB đã kết nối thành công!");

        app.listen(PORT, () => {
            console.log(`Server đang chạy tại: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Lỗi kết nối MongoDB:", err.message);
        console.log("Kiểm tra lại MONGO_URI trong file .env và Network Access trên Atlas.");
        process.exit(1);
    });

// Test API
app.get('/', (req, res) => {
    res.json({ message: 'API đang hoạt động tốt!' });
});
