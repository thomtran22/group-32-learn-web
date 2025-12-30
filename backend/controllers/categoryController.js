import asyncHandler from 'express-async-handler';
import Category from '../models/CategoryModel.js';
import redisClient from '../config/redis.js';

// Helper: Xóa cache liên quan đến Category
const clearCategoryCache = async () => {
    if (redisClient && redisClient.isOpen) {
        try {
            // Xóa cache danh sách danh mục
            await redisClient.del('categories:all');

            // Xóa cache danh sách sản phẩm (Vì sản phẩm có hiện tên danh mục)
            // Nếu admin sửa tên "Áo thun" -> "Áo phông", cần reload lại list sản phẩm
            const productKeys = await redisClient.keys('products:*');
            if (productKeys.length > 0) {
                await redisClient.del(productKeys);
            }
        } catch (err) {
            console.error("Redis Clear Category Error:", err);
        }
    }
};

// --- GET ALL CATEGORIES ---
const getCategories = asyncHandler(async (req, res) => {
    // Check Redis Cache
    const cacheKey = 'categories:all';
    if (redisClient && redisClient.isOpen) {
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
        } catch (err) {
            console.error("Redis Get Error:", err);
        }
    }

    // Query DB
    const categories = await Category.find({}).sort({ name: 1 });

    // Set Redis Cache (1 giờ - 3600s)
    if (redisClient && redisClient.isOpen) {
        redisClient.setEx(cacheKey, 3600, JSON.stringify(categories))
            .catch(err => console.error("Redis Set Error:", err));
    }

    res.json(categories);
});

// --- CREATE CATEGORY ---
const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, parent } = req.body; // Thêm parent nếu có danh mục con

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
        res.status(400);
        throw new Error('Danh mục với slug này đã tồn tại');
    }

    const category = await Category.create({
        name,
        slug,
        parent: parent || null
    });

    if (category) {
        // Xóa cache để cập nhật danh sách mới
        await clearCategoryCache();
        res.status(201).json(category);
    } else {
        res.status(400);
        throw new Error('Dữ liệu danh mục không hợp lệ');
    }
});

// --- UPDATE CATEGORY ---
const updateCategory = asyncHandler(async (req, res) => {
    const { name, slug, parent } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = name || category.name;
        category.slug = slug || category.slug;
        category.parent = parent !== undefined ? parent : category.parent;

        const updatedCategory = await category.save();

        // Xóa cache vì tên danh mục đã đổi, các sản phẩm đang hiển thị tên cũ cần refresh
        await clearCategoryCache();

        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy danh mục');
    }
});

// --- DELETE CATEGORY ---
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await category.deleteOne();
        
        // Xóa cache
        await clearCategoryCache();
        
        res.json({ message: 'Đã xóa danh mục' });
    } else {
        res.status(404);
        throw new Error('Không tìm thấy danh mục');
    }
});

export { getCategories, createCategory, updateCategory, deleteCategory };