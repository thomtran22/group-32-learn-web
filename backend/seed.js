const mongoose = require('mongoose');
const Product = require('./models/ProductModel'); // Đảm bảo đường dẫn trỏ đúng file Model
require('dotenv').config();

// 1. CẤU HÌNH
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ten_database_cua_ong';
const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmYzMmJhODkyYjEwMzQ1Y2ZlNGUzYyIsImlhdCI6MTc2NDcwMDkzMCwiZXhwIjoxNzY3MjkyOTMwfQ.6yXBpmYf1CQWMSE8NqSp4DJGUCdr_TKVw_Rlx1GxE44";

// Hàm gọi API (Giữ nguyên của ông)
async function callApi(endpoint, method, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();
        if(!response.ok) {
            console.error(`❌ API Lỗi [${endpoint}]:`, data.message || data);
            return null;
        }
        return data;
    } catch (error) {
        console.error(`❌ Lỗi mạng: ${endpoint}`, error.message);
        return null;
    }
}

async function main() {
    // BƯỚC 1: KẾT NỐI MONGODB ĐỂ LẤY SẢN PHẨM
    console.log("⏳ Đang kết nối MongoDB...");
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Đã kết nối DB.");
    } catch (err) {
        console.error("❌ Lỗi kết nối DB:", err);
        process.exit(1);
    }

    // BƯỚC 2: TRUY VẤN LẤY 20 SẢN PHẨM
    console.log("⏳ Đang lấy 20 sản phẩm từ Collection 'products'...");
    // Lấy 20 thằng, chỉ cần lấy trường _id, name và variants để nhẹ
    const products = await Product.find({}, '_id name variants').limit(20);

    if (products.length === 0) {
        console.log("⚠️ Database rỗng! Ông chạy file seeder.js chưa?");
        process.exit();
    }
    console.log(`✅ Đã lấy được ${products.length} sản phẩm.`);

    // BƯỚC 3: SPAM API GIỎ HÀNG
    console.log("\n🚀 BẮT ĐẦU SPAM GIỎ HÀNG...");
    let successCount = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Logic chọn biến thể để không bị lỗi
        let color = "Mặc định";
        let size = "F";

        // Nếu sản phẩm có biến thể, lấy cái đầu tiên
        if (product.variants && product.variants.length > 0) {
            color = product.variants[0].color;
            size = product.variants[0].size;
        }

        const payload = {
            productId: product._id, // ID lấy trực tiếp từ MongoDB
            quantity: 1,
            color: color,
            size: size
        };

        // Gọi API
        const res = await callApi('/cart', 'POST', payload);

        if (res) {
            console.log(`[${i+1}/${products.length}] ✅ Thêm xong: ${product.name} (${color}, ${size})`);
            successCount++;
        }

        // Nghỉ 1 xíu (100ms) để server thở, không bị quá tải
        await new Promise(r => setTimeout(r, 100));
    }

    // BƯỚC 4: ĐÓNG KẾT NỐI VÀ CHECK LẠI
    console.log("\n-----------------------------------");
    console.log(`🎉 Đã thêm thành công ${successCount} món vào giỏ.`);
    
    // Check lại giỏ hàng lần cuối
    const cartRes = await callApi('/cart', 'GET');
    console.log(`🛒 Tổng item trong giỏ hiện tại: ${cartRes?.items?.length || 0}`);
    
    await mongoose.connection.close();
    console.log("🔌 Đã đóng kết nối DB.");
}

main();