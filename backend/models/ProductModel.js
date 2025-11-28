// backend/models/ProductModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    // Lưu danh sách màu (VD: ["Red", "Blue"])
    colors: [ { type: String } ],
    // Lưu danh sách size (VD: ["M", "L", "XL"])
    sizes: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema,'Thien.NV225409');