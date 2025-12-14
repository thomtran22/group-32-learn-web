import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Category', 
        },
        images: [{ type: String, required: true }], 
        colors: [{ type: String }],
        sizes: [{ type: String }],
        description: { type: [String] }, 
        sku: { type: String, required: true, unique: true }, 
        isBestSeller: { type: Boolean, default: false }
    
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;