const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// SỬA 1: Trỏ vào thư mục models (vì file này giờ đang ở ngoài)
const Product = require('./models/ProductModel'); 

// SỬA 2: Load file .env chuẩn
require('dotenv').config(); 

// CẤU HÌNH
// SỬA 3: Đảm bảo đường dẫn file JSON chính xác (dùng path.join cho chắc ăn)
const DATA_FILE = "E:\\Project\\group-32-learn-web\\backend\\models\\badass_import_ready.json";

// Kiểm tra xem có lấy được URI không (Debug)
if (!process.env.MONGODB_URI) {
    console.error("❌ Lỗi: Không tìm thấy MONGODB_URI trong file .env");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => {
        console.error("❌ Lỗi kết nối DB:", err);
        process.exit(1);
    });

const importData = async () => {
    try {
        // Kiểm tra file tồn tại không
        if (!fs.existsSync(DATA_FILE)) {
            throw new Error(`Không tìm thấy file dữ liệu tại: ${DATA_FILE}`);
        }

        // 1. Đọc dữ liệu
        const json = fs.readFileSync(DATA_FILE, 'utf8');
        const products = JSON.parse(json);

        if (products.length === 0) {
            console.log("⚠️ File JSON rỗng, không có gì để import.");
            process.exit();
        }

        // 2. Xóa dữ liệu cũ
        await Product.deleteMany();
        console.log('🗑️ Đã xóa dữ liệu cũ trong DB...');

        // 3. Thêm dữ liệu mới
        await Product.insertMany(products);
        console.log(`🎉 Đã thêm thành công ${products.length} sản phẩm vào Database!`);

        process.exit();
    } catch (error) {
        console.error(`❌ Lỗi import: ${error.message}`);
        process.exit(1);
    }
};

importData();