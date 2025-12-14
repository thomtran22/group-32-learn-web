const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }], // Lưu nhiều ảnh
    description: { type: String, default: '' },
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Category', 
    },
    variants: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, default: 100 } // Mặc định kho có 100 cái
        }
    ],
    isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema, 'products');