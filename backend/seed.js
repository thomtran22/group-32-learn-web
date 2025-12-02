// backend/seed.js
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const User = require('./models/UserModel');
const Cart = require('./models/CartModel');
const Order = require('./models/OrderModel');
require('dotenv').config();

// Kết nối DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('🌱 MongoDB connected for seeding...'))
    .catch(err => {
        console.log('❌ Connection Error:', err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // 1. Xóa sạch dữ liệu cũ
        console.log('🧹 Đang dọn dẹp dữ liệu cũ...');
        await Product.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});
        await Order.deleteMany({}); // Xóa luôn đơn hàng cũ cho sạch

        // 2. Tạo User mẫu
        // Lưu ý: Nếu User Model của bạn có hook 'pre save' để hash password, 
        // thì password này sẽ được hash tự động.
        const user = await User.create({
            username: "khachhang",
            email: "test@gmail.com"
            //password: "123456", // Password mẫu
            //phone: "0987654321",
            //isAdmin: false
        });
        
        console.log(`👤 User created: ${user.email} (Pass: 123456)`);

        // 3. Tạo danh sách sản phẩm với cấu trúc Variants
        const sampleProducts = [
            {
                name: "Áo Thun Cotton Basic",
                price: 150000,
                image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmucn5j1x68b98", // Ảnh mẫu shopee/mạng
                description: "Áo thun chất liệu 100% Cotton, thấm hút mồ hôi tốt.",
                variants: [
                    { color: "Trắng", size: "M", quantity: 50 },
                    { color: "Trắng", size: "L", quantity: 30 },
                    { color: "Đen", size: "M", quantity: 40 },
                    { color: "Đen", size: "L", quantity: 0 } // Test case: Hết hàng màu Đen L
                ]
            },
            {
                name: "Quần Jean Slim Fit Rách Gối",
                price: 450000,
                image: "https://down-vn.img.susercontent.com/file/sg-11134201-22100-2p77j9j5hivvb8",
                description: "Quần Jean phong cách bụi bặm, form ôm vừa vặn.",
                variants: [
                    { color: "Xanh Nhạt", size: "29", quantity: 15 },
                    { color: "Xanh Nhạt", size: "30", quantity: 10 },
                    { color: "Xanh Đậm", size: "29", quantity: 20 },
                    { color: "Xanh Đậm", size: "30", quantity: 5 },
                    { color: "Xanh Đậm", size: "31", quantity: 10 }
                ]
            },
            {
                name: "Áo Khoác Hoodie Unisex",
                price: 320000,
                image: "https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lowqp5j2y9a212",
                description: "Áo Hoodie form rộng, nỉ bông dày dặn.",
                variants: [
                    { color: "Xám", size: "Freesize", quantity: 100 },
                    { color: "Đen", size: "Freesize", quantity: 50 }
                ]
            },
            {
                name: "Giày Sneaker Thể Thao",
                price: 850000,
                image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljz6j5h1y68b98",
                description: "Giày êm chân, phù hợp chạy bộ và đi chơi.",
                variants: [
                    { color: "Trắng/Đỏ", size: "40", quantity: 10 },
                    { color: "Trắng/Đỏ", size: "41", quantity: 8 },
                    { color: "Trắng/Đỏ", size: "42", quantity: 12 },
                    { color: "Full Đen", size: "40", quantity: 5 },
                    { color: "Full Đen", size: "41", quantity: 5 }
                ]
            },
            {
                name: "Mũ Lưỡi Trai Nón Sơn",
                price: 120000,
                image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lkfj5j1x68b98", 
                description: "Mũ lưỡi trai thời trang, che nắng cực tốt.",
                variants: [
                    { color: "Đen", size: "OneSize", quantity: 200 },
                    { color: "Hồng", size: "OneSize", quantity: 50 }
                ]
            }
        ];

        const createdProducts = await Product.insertMany(sampleProducts);
        
        console.log(`📦 Đã tạo thành công ${createdProducts.length} sản phẩm mới.`);
        console.log("✅ SEED DATA HOÀN TẤT!");
        
        process.exit();
    } catch (error) {
        console.error("❌ Lỗi khi seed data:", error);
        process.exit(1);
    }
};

seedData();