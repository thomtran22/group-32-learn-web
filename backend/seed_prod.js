// seed_products.js
const mongoose = require('mongoose');
const Product = require('./models/ProductModel'); // Đảm bảo đường dẫn này trỏ đúng tới file ProductModel của bạn
require('dotenv').config(); // Để lấy MONGO_URI từ file .env

// Dữ liệu mẫu (Đã bỏ ObjectId wrapper để Mongoose tự xử lý)
const products = [
    {
        "_id": "656e12345678901234567890", // ID Cố định để tí nữa test script mua hàng
        "name": "Áo Thun Basic Cotton",
        "price": 250000,
        "image": "https://via.placeholder.com/150",
        "description": "Áo thun chất liệu cotton 100% thấm hút mồ hôi.",
        "variants": [
            { "color": "Trắng", "size": "M", "quantity": 50 },
            { "color": "Trắng", "size": "L", "quantity": 50 },
            { "color": "Đen", "size": "M", "quantity": 30 }
        ]
    },
    {
        "_id": "656e12345678901234567891", // ID Cố định
        "name": "Quần Jean Slim Fit",
        "price": 500000,
        "image": "https://via.placeholder.com/150",
        "description": "Quần Jean dáng ôm thời trang.",
        "variants": [
            { "color": "Xanh Nhạt", "size": "29", "quantity": 20 },
            { "color": "Xanh Nhạt", "size": "30", "quantity": 20 },
            { "color": "Xanh Đậm", "size": "30", "quantity": 15 }
        ]
    }
];

const seedData = async () => {
    try {
        // 1. Kết nối MongoDB Atlas
        // Bạn nhớ kiểm tra file .env xem biến môi trường tên là MONGO_URI hay DATABASE_URL nhé
        const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL); 
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // 2. Xóa dữ liệu cũ (để tránh trùng lặp ID nếu chạy nhiều lần)
        await Product.deleteMany({});
        console.log('Đã xóa dữ liệu sản phẩm cũ.');

        // 3. Thêm dữ liệu mới
        await Product.insertMany(products);
        console.log('✅ Đã thêm dữ liệu mẫu thành công!');

        process.exit();
    } catch (error) {
        console.error(`Lỗi: ${error.message}`);
        process.exit(1);
    }
};

seedData();