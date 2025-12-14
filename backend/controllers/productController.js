import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import Category from '../models/CategoryModel.js';
const getProducts = asyncHandler(async (req, res) => {
    const { category: categorySlug, page: pageQuery, limit: limitQuery, size, sort } = req.query;

    const page = parseInt(pageQuery) || 1; 
    const limit = parseInt(limitQuery) || 12; 
    const skip = (page - 1) * limit; 
    
    let filter = {};
    let sortOptions = { createdAt: -1 };
    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });

        if (category) {
            filter.category = category._id; 
        } else {
            return res.json({ products: [], page: 1, pages: 1, count: 0 }); 
        }
    }
    if (size) {
        filter.sizes = { $in: [size] };
    }
    if (sort === 'price-asc') {
        sortOptions = { price: 1, createdAt: -1 };
    } else if (sort === 'price-desc') {
        sortOptions = { price: -1, createdAt: -1 };
    } else {
        sortOptions = { createdAt: -1 }; 
    }
    
    // Đếm tổng số sản phẩm dựa trên bộ lọc đã áp dụng (category + size)
    const count = await Product.countDocuments(filter);

    //Truy vấn sản phẩm CÓ PHÂN TRANG, CÓ LỌC và CÓ SẮP XẾP
    const products = await Product.find(filter)
        .populate('category', 'name slug image')
        .sort(sortOptions)
        .skip(skip) 
        .limit(limit); 

    //Tính tổng số trang
    const pages = Math.ceil(count / limit);

    // Trả về kết quả phân trang
    res.json({
        products,
        page,
        pages,
        count
    });
});

const getProductBySku = asyncHandler(async (req, res) => {
    const productSku = req.params.sku; 

    const product = await Product.findOne({ sku: productSku })
        .populate('category', 'name slug image'); 

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductBySku };