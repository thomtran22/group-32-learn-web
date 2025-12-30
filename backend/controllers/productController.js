import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import Category from '../models/CategoryModel.js';
import redisClient from '../config/redis.js';

// --- HELPER: Tạo key cache---
// Sắp xếp object query để đảm bảo thứ tự key luôn giống nhau
const generateCacheKey = (prefix, query) => {
    const sortedKeys = Object.keys(query).sort();
    const sortedQuery = sortedKeys.reduce((acc, key) => {
        acc[key] = query[key];
        return acc;
    }, {});
    return `${prefix}:${JSON.stringify(sortedQuery)}`;
};

// --- GET ALL PRODUCTS ---
export const getProducts = asyncHandler(async (req, res) => {
    // --- REDIS CACHE START ---
    // Sử dụng hàm helper để tạo key chuẩn
    const cacheKey = generateCacheKey('products', req.query);

    if (redisClient && redisClient.isOpen) {
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
        } catch (err) {
            console.error("Redis Get Error:", err);
            // Nếu lỗi Redis, code sẽ tự động chạy tiếp xuống DB, không return lỗi
        }
    }
    // --- REDIS CACHE END ---

    // Xử lý Query Database
    const { category: categorySlug, size, sort, page: pageQuery, priceRange } = req.query;

    const page = parseInt(pageQuery) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    let filter = {};

    // Lọc theo danh mục
    if (categorySlug && categorySlug !== 'all') {
        const categoryDoc = await Category.findOne({ slug: categorySlug }).lean();

        if (categoryDoc) {
            const childCategories = await Category.find({ parent: categoryDoc._id }).lean();
            const allCategoryIds = [
                categoryDoc._id,
                ...childCategories.map(c => c._id)
            ];
            filter.category = { $in: allCategoryIds };
        } else {
            return res.json({ products: [], page: 1, pages: 0, count: 0 });
        }
    }

    // Lọc theo size
    if (size && size.trim() !== '') {
        filter.variants = { $elemMatch: { size: size } };
    }

    // Lọc theo khoảng giá
    if (priceRange) {
        if (priceRange === 'under500') {
            filter.price = { $lt: 500000 };
        } else if (priceRange === '500-1000') {
            filter.price = { $gte: 500000, $lte: 1000000 };
        } else if (priceRange === 'over1000') {
            filter.price = { $gt: 1000000 };
        }
    }

    // Truy vấn và đếm sản phẩm
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .populate('category', 'name slug')
        .sort(sort === 'price-asc' ? { price: 1 } : sort === 'price-desc' ? { price: -1 } : { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const responseData = {
        products: products || [],
        page,
        pages: Math.ceil(count / limit) || 1,
        count: count || 0
    };

    // Trả về kết quả cho Client
    res.json(responseData);

    // --- SAVE TO REDIS ---
    // Lưu cache sau khi đã response để không làm user phải chờ
    if (redisClient && redisClient.isOpen) {
        try {
            // Lưu cache trong 600 giây (10 phút)
            // Không cần await để tránh chặn luồng, dùng .catch để log lỗi nếu có
            redisClient.setEx(cacheKey, 600, JSON.stringify(responseData))
                .catch(err => console.error("Redis Set Error:", err));
        } catch (err) {
            console.error("Redis Try-Catch Error:", err);
        }
    }
});

// --- GET PRODUCT BY SKU ---
export const getProductBySku = asyncHandler(async (req, res) => {
    const sku = req.params.sku;
    const cacheKey = `product_detail:${sku}`;

    // Kiểm tra Cache
    if (redisClient && redisClient.isOpen) {
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
        } catch (err) {
            console.error("Redis Get Detail Error:", err);
        }
    }

    // Query DB
    const product = await Product.findOne({ sku: sku })
        .populate('category', 'name slug')
        .lean();

    if (product) {
        res.json(product);

        // Lưu Cache (Lưu lâu hơn list, ví dụ 1 tiếng)
        if (redisClient && redisClient.isOpen) {
            redisClient.setEx(cacheKey, 3600, JSON.stringify(product))
                .catch(err => console.error("Redis Set Detail Error:", err));
        }
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// --- SEARCH PRODUCTS ---
export const searchProducts = async (req, res) => {
    try {
        const keyword = req.query.q;

        if (!keyword) {
            return res.status(200).json([]);
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { sku: { $regex: keyword, $options: 'i' } }
            ]
        })
            .select('name price images sku')
            .limit(8);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};