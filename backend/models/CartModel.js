const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Giả sử bạn có User model, nếu không có login thì có thể dùng session ID
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Tham chiếu đến bảng sản phẩm
                required: true
            },
            color: { type: String, default: '' },
            size: { type: String, default: '' },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ],

    totalAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema, 'Thien.NV225409');