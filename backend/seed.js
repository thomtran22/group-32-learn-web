/* 
   FILE: backend/seed_database.js 
   Run: node seed_database.js
*/

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
require('dotenv').config();

// --- 1. IMPORT MODELS ---

// SCHEMA CATEGORY
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });
const Category = mongoose.model('Category', categorySchema);

// SCHEMA PRODUCT
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
    // --- TRƯỜNG SKU ---
    sku: {
        type: String,
        required: true,
        unique: true
    },
    isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);

// --- 2. CẤU HÌNH ---
const MONGO_URI = process.env.MONGODB_URI;
const JSON_PATH = path.join(__dirname, 'badass_import_ready.json'); 

// --- 3. HÀM XỬ LÝ ---
async function importData() {
    try {
        // A. KẾT NỐI DB
        await mongoose.connect(MONGO_URI);
        console.log("✅ Đã kết nối MongoDB.");

        // B. ĐỌC FILE JSON
        let finalPath = JSON_PATH; // Tạo biến trung gian để lưu đường dẫn thực tế

        if (!fs.existsSync(JSON_PATH)) {
            console.error(`❌ Không tìm thấy file tại: ${JSON_PATH}`);
            
            // Tìm trong thư mục models
            const fallbackPath = path.join(__dirname, 'models', 'badass_import_ready.json');
            
            if (fs.existsSync(fallbackPath)) {
                 console.log(`⚠️ Đã tìm thấy file tại thư mục models.`);
                 finalPath = fallbackPath; // <--- QUAN TRỌNG: Cập nhật lại đường dẫn đúng
            } else {
                console.error("❌ Không tìm thấy file ở cả 2 nơi!");
                process.exit(1);
            }
        }
        
        let rawData = fs.readFileSync(finalPath, 'utf-8');

        // --- BƯỚC KHẮC PHỤC: Xóa bỏ các comment // trong chuỗi JSON ---
        // Regex này sẽ tìm các đoạn bắt đầu bằng // và thay thế bằng rỗng
        rawData = rawData.replace(/\/\/.*$/gm, ''); 
        
        // Sau đó mới Parse
        const productsData = JSON.parse(rawData);
        console.log(`📦 Đã đọc được ${productsData.length} sản phẩm.`);

        // C. XÓA DỮ LIỆU CŨ
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log("🗑️  Đã xóa dữ liệu cũ.");

        // D. XỬ LÝ DỮ LIỆU
        const categoryCache = {}; 
        const skuSet = new Set(); 
        const finalProducts = [];

        for (const item of productsData) {
            // --- 1. XỬ LÝ SKU ---
            let originalName = item.name.trim();
            let nameParts = originalName.split(' ');
            
            let extractedSku = "";

            // Lấy từ cuối cùng làm SKU, nhưng KHÔNG thay đổi tên gốc
            if (nameParts.length > 0) {
                extractedSku = nameParts[nameParts.length - 1]; 
            } else {
                extractedSku = "UNKNOWN-" + Date.now();
            }

            // --- 2. XỬ LÝ TRÙNG SKU ---
            // Nếu file JSON có nhiều sản phẩm cùng mã (ví dụ APHTK610 lặp lại), thêm đuôi -1, -2
            if (skuSet.has(extractedSku)) {
                let count = 1;
                let tempSku = `${extractedSku}-${count}`;
                while (skuSet.has(tempSku)) {
                    count++;
                    tempSku = `${extractedSku}-${count}`;
                }
                extractedSku = tempSku; 
            }
            skuSet.add(extractedSku);

            // Gán dữ liệu: Tên giữ nguyên, SKU lấy phần đuôi
            item.name = originalName; 
            item.sku = extractedSku;

            // --- 3. XỬ LÝ DANH MỤC (CATEGORY) ---
            // Lấy 2 từ đầu của tên để làm danh mục
            let categoryName = "Sản phẩm khác";
            if (nameParts.length >= 2) {
                categoryName = `${nameParts[0]} ${nameParts[1]}`.toUpperCase();
            } else if (nameParts.length === 1) {
                categoryName = nameParts[0].toUpperCase();
            }

            // Tạo Category nếu chưa có
            if (!categoryCache[categoryName]) {
                const slug = slugify(categoryName, { lower: true, locale: 'vi' });
                const newCat = await Category.create({ name: categoryName, slug: slug });
                categoryCache[categoryName] = newCat._id;
                console.log(`   + Tạo danh mục: ${categoryName}`);
            }

            item.category = categoryCache[categoryName];
            
            finalProducts.push(item);
        }

        // E. LƯU VÀO DB
        await Product.insertMany(finalProducts);
        console.log(`🎉 Đã import thành công ${finalProducts.length} sản phẩm!`);
        
        // Log kiểm tra kết quả
        if (finalProducts.length > 0) {
            console.log("--- Kiểm tra mẫu dữ liệu ---");
            console.log(`Tên gốc: ${finalProducts[0].name}`);
            console.log(`SKU mới: ${finalProducts[0].sku}`);
        }

        process.exit();

    } catch (error) {
        console.error("❌ Lỗi Import:", error);
        process.exit(1);
    }
}

importData();