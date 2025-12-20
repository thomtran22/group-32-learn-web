import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import Category from '../models/CategoryModel.js';
import mongoose from 'mongoose';

export const getProducts = asyncHandler(async (req, res) => {
    const { category: categorySlug, size, sort, page: pageQuery, priceRange } = req.query;
    
    const page = parseInt(pageQuery) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    let filter = {};

    if (categorySlug && categorySlug !== 'all') {
        // Tìm danh mục cha bằng slug
        const categoryDoc = await Category.findOne({ slug: categorySlug }).lean();

        if (categoryDoc) {
            // Tìm tất cả ID của danh mục con
            const childCategories = await Category.find({ parent: categoryDoc._id }).lean();
            
            // Gom mảng ID chuẩn kiểu ObjectId
            const allCategoryIds = [
                categoryDoc._id, 
                ...childCategories.map(c => c._id)
            ];
            
            // Lọc sản phẩm khớp với danh sách ID này
            filter.category = { $in: allCategoryIds };

        } else {
            return res.json({ products: [], page: 1, pages: 0, count: 0 });
        }
    }

    //Lọc theo size (Dùng $elemMatch vì variants là mảng object)
    if (size && size.trim() !== '') {
        filter.variants = { $elemMatch: { size: size } };
    }

    //Lọc theo  khoảng giá
    if (priceRange) {
        if (priceRange === 'under500') {
            // Giá nhỏ hơn 500.000
            filter.price = { $lt: 500000 };
        } else if (priceRange === '500-1000') {
            // Giá từ 500.000 đến 1.000.000
            filter.price = { $gte: 500000, $lte: 1000000 };
        } else if (priceRange === 'over1000') {
            // Giá trên 1.000.000
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
    res.json({
        products: products || [],
        page,
        pages: Math.ceil(count / limit) || 1,
        count: count || 0
    });
});

export const getProductBySku = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ sku: req.params.sku }).populate('category', 'name slug').lean();
    if (product) res.json(product);
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});