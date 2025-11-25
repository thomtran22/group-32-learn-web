const mongoose = require('mongoose');
const { timeStamp } = require('node:console');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    orderItems: [
        {
            name: { 
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String, required: true
            },
            price: {
                type: Number, required: true
            },
            color: {
                type: String
            }, // Ví dụ: Xanh Indigo, Đen
            size: {
                type: String
            },  // Ví dụ: L, XL
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },      // Họ và tên
        phone: {
            type: String, required: true
        },         // Số điện thoại
        email: {
            type: String, required: true
        },         // Email
        city: {
            type: String, required: true
        },          // Tỉnh/Thành phố
        district: {
            type: String, required: true
        },      // Quận/Huyện
        ward: {
            type: String, required: true
        },          // Xã/Phường
        streetAddress: {
            type: String, required: true 
        }, // Số nhà, tên đường
    },
    orderNotes: {
        type: String
    },
    paymentMethod: {
        type: String,
        default: 'COD' // Hoặc 'Online'
    },
    itemsPrice: { 
        type: Number,
        required: true,
        default: 0
    }, // Tổng tiền hàng (Subtotal)
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    }, // Phí ship
    totalPrice: { 
        type: Number,
        required: true,
        default: 0
    }, // Tổng thanh toán
    isPaid: { 
        type: Boolean,
        default: false 
    },
    status: { 
        type: String, 
        default: 'Pending', // Pending -> Confirmed -> Shipping -> Delivered
        enum: ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled']
    }

}, {
    timeStamp: true
});

module.exports = mongoose.model('Order', orderSchema);