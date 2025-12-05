// backend/models/ProductModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    variants: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true, default: 0 } // Số lượng của riêng màu/size này
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema,'products');