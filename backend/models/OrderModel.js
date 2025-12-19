import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            color: { type: String }, 
            size: { type: String },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],

    shipperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        
        // Lưu ý: Frontend cần gửi Text (VD: "Hà Nội") thay vì Code (VD: "01")
        city: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        streetAddress: { type: String, required: true },
    },
    
    orderNotes: { type: String },
    
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'VNPAY'],
        default: 'COD' // 'COD', 'BANKING', 'VNPAY'
    },

    // Kết quả thanh toán (Dành cho VNPAY / Banking)
    paymentResult: {
        id: { type: String },       // Mã giao dịch VNPAY hoặc Mã bút toán ngân hàng
        status: { type: String },   // Trạng thái từ cổng thanh toán
        update_time: { type: String },
        email_address: { type: String }
    },

    itemsPrice: { type: Number, required: true, default: 0 },   // Tiền hàng
    shippingPrice: { type: Number, required: true, default: 0 }, // Phí ship
    totalPrice: { type: Number, required: true, default: 0 },   // Tổng thu
    
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date }, // Ngày thanh toán xong

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }, // Ngày giao xong

    status: { 
        type: String, 
        required: true,
        default: 'Pending', 
        enum: ['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled']
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema, 'orders');
export default Order;