import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import categories from './data/categories.js'; 
import products from './data/products.js'; 
import Category from './models/CategoryModel.js'; 
import Product from './models/ProductModel.js'; 

dotenv.config();

const connectDB_local = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error connecting to DB: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};
const importData = async () => {
    await connectDB_local(); 
    
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('--- Collections Cleared ---'.yellow);
        const createdCategories = await Category.insertMany(categories);
        console.log('Data Categories Imported!'.green);
        const categoryMap = createdCategories.reduce((map, category) => {
            map[category.slug] = category._id;
            return map;
        }, {});

        const sampleProducts = products.map((product) => {
            const categorySlug = product.category_slug; 
            const categoryId = categoryMap[categorySlug];

            if (!categoryId) {
                console.error(`Lỗi Mapping: Không tìm thấy ID cho category slug: ${categorySlug}. Sản phẩm "${product.name}" bị bỏ qua.`.red);
                return null;
            }

            // Gán ID Category đã tham chiếu
            return {
                ...product,
                category: categoryId, 
            };
        }).filter(product => product !== null); 

        // Thực hiện import sản phẩm
        await Product.insertMany(sampleProducts);
        console.log(`Data Products Imported! (${sampleProducts.length} items)`.green);

        console.log('Data Import SUCCESS!'.bgGreen.black);
        process.exit();
    } catch (error) {
        if (error.code === 11000) {
             console.error(`LỖI TRÙNG LẶP DỮ LIỆU: SKU đã tồn tại! Vui lòng kiểm tra lại trường "sku" trong products.js`.bgRed.white);
        } 
        else if (error.name === 'ValidationError') {
             console.error(`LỖI VALIDATION (THIẾU TRƯỜNG BẮT BUỘC): ${error.message}`.bgRed.white);
        } 
        else {
             console.error(`Import Error (Generic): ${error.message}`.red);
        }
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB_local(); 
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`Destroy Error: ${error.message}`.red);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}