import asyncHandler from 'express-async-handler';
import Category from '../models/CategoryModel.js'; 
//Trả về danh sách danh mục sắp xếp từ A-Z
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ name: 1 }); 
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
        res.status(201).json(category); 
    } else {
        res.status(400);
        throw new Error('Dữ liệu danh mục không hợp lệ');
    }
});

export { getCategories, createCategory };