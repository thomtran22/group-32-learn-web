/* 
   FILE: backend/seed_database.js 
   Run: node seed_database.js
*/

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
require('dotenv').config();

// --- 1. IMPORT MODELS (Hoặc định nghĩa tạm nếu dính lỗi ES6/CommonJS) ---
// Do CategoryModel của bạn dùng "export default" (ES6) mà nodejs chạy file này thường dùng CommonJS,
// nên tôi sẽ định nghĩa lại Schema nhanh tại đây để tránh lỗi import.

// SCHEMA CATEGORY
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });
const Category = mongoose.model('Category', categorySchema);

// SCHEMA PRODUCT (Copy từ ProductModel của bạn, chỉnh lại reference)
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, default: '' },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: false 
    },
    variants: [{
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, default: 100 }
    }],
    isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);

// --- 2. CẤU HÌNH ---
const MONGO_URI = process.env.MONGODB_URI;
const JSON_PATH = path.join(__dirname, 'models', 'badass_import_ready.json');

// --- 3. HÀM XỬ LÝ ---
async function importData() {
    try {
        // A. KẾT NỐI DB
        await mongoose.connect(MONGO_URI);
        console.log("✅ Đã kết nối MongoDB.");

        // B. ĐỌC FILE JSON
        if (!fs.existsSync(JSON_PATH)) {
            console.error(`❌ Không tìm thấy file tại: ${JSON_PATH}`);
            process.exit(1);
        }
        const rawData = fs.readFileSync(JSON_PATH, 'utf-8');
        const productsData = JSON.parse(rawData);
        console.log(`📦 Đã đọc được ${productsData.length} sản phẩm từ file JSON.`);

        // C. XÓA DỮ LIỆU CŨ (Tuỳ chọn - Để tránh trùng lặp khi chạy nhiều lần)
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log("🗑️  Đã xóa dữ liệu cũ (Products & Categories).");

        // D. XỬ LÝ CATEGORY & IMPORT
        // Tạo Map để lưu cache category đã tạo: "ÁO PHÔNG" -> ObjectId
        const categoryCache = {}; 

        const finalProducts = [];

        for (const item of productsData) {
            // 1. Đoán tên danh mục từ tên sản phẩm
            // Ví dụ: "ÁO VEST NAM..." -> Lấy 2 từ đầu làm danh mục -> "ÁO VEST"
            // Hoặc nếu không đoán được thì gán vào "SẢN PHẨM KHÁC"
            let categoryName = "Sản phẩm khác";
            
            const nameParts = item.name.split(' ');
            if (nameParts.length >= 2) {
                // Lấy 2 từ đầu tiên làm tên Category (VD: ÁO PHÔNG, ÁO VEST, QUẦN JEANS)
                categoryName = `${nameParts[0]} ${nameParts[1]}`.toUpperCase();
            }

            // 2. Tạo Category nếu chưa tồn tại
            if (!categoryCache[categoryName]) {
                const slug = slugify(categoryName, { lower: true, locale: 'vi' });
                
                // Tạo mới trong DB
                const newCat = await Category.create({ name: categoryName, slug: slug });
                categoryCache[categoryName] = newCat._id; // Lưu ID vào cache
                console.log(`   + Đã tạo danh mục mới: ${categoryName}`);
            }

            // 3. Gán Category ID vào sản phẩm
            item.category = categoryCache[categoryName];
            
            // Push vào mảng chuẩn bị lưu
            finalProducts.push(item);
        }

        // E. LƯU TẤT CẢ SẢN PHẨM
        await Product.insertMany(finalProducts);
        console.log(`🎉 Đã import thành công ${finalProducts.length} sản phẩm vào Database!`);

        process.exit();

    } catch (error) {
        console.error("❌ Lỗi Import:", error);
        process.exit(1);
    }
}

importData();