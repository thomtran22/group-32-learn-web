import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        images: [{ type: String, required: true }], 
        description: { type: [String] }, 
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
        colors: [{ type: String }],
        sizes: [{ type: String }],
        sku: { type: String, required: true, unique: true }, 
        isBestSeller: { type: Boolean, default: false }
    
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;