// backend/models/ProductModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], // Lưu nhiều ảnh
    description: { type: String, default: '' },
    //category: { type: String, default: 'Áo' },
    variants: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, default: 100 } // Mặc định kho có 100 cái
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema, 'products');