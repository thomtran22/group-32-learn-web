import asyncHandler from 'express-async-handler';
import Category from '../models/CategoryModel.js';
import redisClient from '../config/redis.js';

//Trả về danh sách danh mục sắp xếp từ A-Z
const getCategories = asyncHandler(async (req, res) => {
    // Kiểm tra nếu là shipper thì từ chối
    if (req.user?.role === 'shipper') {
        return res.status(403).json({
            success: false,
            message: "Shipper không được phép xem danh mục"
        });
    }

    // --- REDIS CACHE START ---
    const cacheKey = 'categories:all';
    if (redisClient && redisClient.isOpen) {
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                // console.log("⚡ Fetching from Redis Cache (Categories)");
                return res.json(JSON.parse(cachedData));
            }
        } catch (err) {
            console.error("Redis Get Error:", err);
        }
    }
    // --- REDIS CACHE END ---

    const categories = await Category.find({}).sort({ name: 1 });

    // --- REDIS SET ---
    if (redisClient && redisClient.isOpen) {
        try {
            // Cache 1 gio (3600s) vi category it thay doi
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(categories));
        } catch (err) {
            console.error("Redis Set Error:", err);
        }
    }

    res.json(categories);
});

// Tạo danh mục mới
const createCategory = asyncHandler(async (req, res) => {
    const { name, slug } = req.body;
    const categoryExists = await Category.findOne({ slug });

    if (categoryExists) {
        res.status(400);
        throw new Error('Danh mục với slug này đã tồn tại');
    }
    const category = await Category.create({
        name,
        slug,
    });

    if (category) {
        // Xoa Cache khi co moi
        if (redisClient && redisClient.isOpen) await redisClient.del('categories:all');

        res.status(201).json(category);
    } else {
        res.status(400);
        throw new Error('Dữ liệu danh mục không hợp lệ');
    }
});

export { getCategories, createCategory };