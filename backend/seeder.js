import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import categories from './data/categories.js';
import products from './data/products.js';
import users from './data/users.js';
import Category from './models/CategoryModel.js';
import Product from './models/ProductModel.js';
import User from './models/UserModel.js';

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
        // Xóa sạch dữ liệu cũ
        await Category.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Collections Cleared'.yellow);

        //Test user khi chưa có tài khoản
        const salt = await bcrypt.genSalt(10);
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, salt);
            return { ...user, password: hashedPassword };
        }));
        await User.insertMany(hashedUsers);
        console.log('Data Users Imported!'.green);

        // Thêm các danh mục gốc trước (ÁO NAM, QUẦN NAM...)
        const parentCatsData = categories.filter(c => !c.parentSlug);
        const createdParents = await Category.insertMany(parentCatsData);

        // Tạo Map để tra cứu ID từ slug cho danh mục cha
        const categoryMap = createdParents.reduce((map, cat) => {
            map[cat.slug] = cat._id;
            return map;
        }, {});

        // Thêm danh mục con và gán parent ID chuẩn từ database
        const childCatsData = categories.filter(c => c.parentSlug).map(c => {
            return {
                ...c,
                parent: categoryMap[c.parentSlug] // Gán ID thực tế của cha
            };
        });
        const createdChildren = await Category.insertMany(childCatsData);

        // Cập nhật Map để chứa cả ID của các con (để map vào sản phẩm)
        createdChildren.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });
        console.log('Data Categories with Hierarchy Imported Success!'.green);

        //Thêm sản phẩm
        const sampleProducts = products.map((product) => {
            // Lấy ID danh mục chuẩn dựa trên category_slug trong file products.js
            const categoryId = categoryMap[product.category_slug];

            if (!categoryId) {
                console.error(`Lỗi Mapping: Không tìm thấy danh mục cho slug: ${product.category_slug}`.red);
                return null;
            }

            // Xử lý biến thể variants (color/size)
            const flattenedVariants = [];
            if (product.variants && Array.isArray(product.variants)) {
                product.variants.forEach(v => {
                    if (Array.isArray(v.color) && Array.isArray(v.size)) {
                        v.color.forEach(c => {
                            v.size.forEach(s => {
                                flattenedVariants.push({ color: c, size: s, quantity: 100 });
                            });
                        });
                    }
                });
            }

            return {
                ...product,
                category: categoryId,
                variants: flattenedVariants,
            };
        }).filter(p => p !== null);

        await Product.insertMany(sampleProducts);
        console.log(`Data Products Imported! (${sampleProducts.length} items)`.green);
        console.log('Data Import SUCCESS!'.bgGreen.black);
        process.exit();
    } catch (error) {
        console.error(`Lỗi Import: ${error.message}`.red.bold);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB_local();
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
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