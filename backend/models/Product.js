const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    //id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    colors: [{ name: String, code: String, image: String }],
    sizes: [{ type: String }],
    relatedProducts: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
