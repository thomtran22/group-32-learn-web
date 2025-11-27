// backend/seed.js
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const User = require('./models/UserModel');
const Cart = require('./models/CartModel');
require('dotenv').config();

// Kết nối DB (Copy string connection từ server.js qua)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Mongodb connected for seeding...'))
    .catch(err => console.log(err));

const seedData = async () => {
    try {
        // 1. Xóa sạch dữ liệu cũ
        await Product.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});
        console.log('🧹 Đã dọn dẹp DB cũ');

        // 2. Tạo 1 User để test (Ông trùm mua hàng)
        const user = await User.create({
            username: "test_user",
            email: "test@gmail.com"
        });
        console.log(`👤 User created: ID = ${user._id}`);

        // 3. Tạo vài sản phẩm mẫu
        const products = await Product.insertMany([
            {
                name: "Áo Thun Basic Trắng",
                price: 150000,
                image: "https://via.placeholder.com/150", // Ảnh giả
                description: "Áo thun cotton xịn",
                colors: ["White", "Black"],
                sizes: ["M", "L"]
            },
            {
                name: "Quần Jean Rách",
                price: 350000,
                image: "https://via.placeholder.com/150",
                description: "Quần jean style bụi bặm",
                colors: ["Blue"],
                sizes: ["29", "30", "31"]
            },
            {
                name: "Giày Sneaker",
                price: 800000,
                image: "https://via.placeholder.com/150",
                description: "Giày chạy bộ êm ái",
                colors: ["Red", "White"],
                sizes: ["40", "41", "42"]
            }
        ]);
        console.log(`📦 Đã tạo ${products.length} sản phẩm`);
        
        console.log("✅ SEED DATA THÀNH CÔNG! Nhớ copy User ID ở trên nhé.");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedData();