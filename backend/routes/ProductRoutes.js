const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

router.get("/allproduct", async (req, res) => {
  try {
    const products = await Product.find({}).select("-__v");
    res.json(products);
  } catch (error) {
    console.error("Lỗi khi tải danh sách sản phẩm:", error);
    res.status(500).json({ message: "Lỗi Server khi tải danh sách sản phẩm" });
  }
});

router.get("/getproduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "ID sản phẩm không hợp lệ" });
    }
    console.error("Lỗi khi tải chi tiết sản phẩm:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
});

router.post("/createproduct", protect, isAdmin, async (req, res) => {
  const { name, price, description, images, colors, sizes, relatedProducts } =
    req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Tên và Giá sản phẩm là bắt buộc" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      images,
      colors,
      sizes,
      relatedProducts,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    res.status(400).json({ message: "Dữ liệu tạo sản phẩm không hợp lệ" });
  }
});

router.get("/related/:id", async (req, res) => {
  try {
    const currentProductId = req.params.id;

    const products = await Product.find({
      _id: { $ne: currentProductId },
    }).limit(10);

    if (products.length === 0) {
      return res.json([]);
    }

    const shuffled = products.sort(() => 0.5 - Math.random());
    const relatedProducts = shuffled.slice(0, 3);

    res.json(relatedProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm liên quan:", error);
    res.status(500).json({ message: "Lỗi Server khi lấy sản phẩm liên quan" });
  }
});

router.put("/fixproduct/:id", protect, isAdmin, async (req, res) => {
  const { name, price, description, images, colors, sizes, relatedProducts } =
    req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    }

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? price : product.price;
    product.description =
      description !== undefined ? description : product.description;
    product.images = images !== undefined ? images : product.images;
    product.colors = colors !== undefined ? colors : product.colors;
    product.sizes = sizes !== undefined ? sizes : product.sizes;
    product.relatedProducts =
      relatedProducts !== undefined ? relatedProducts : product.relatedProducts;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi Server khi cập nhật sản phẩm" });
  }
});

router.delete("/deleteproduct/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa" });
    }

    res.json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi Server khi xóa sản phẩm" });
  }
});

module.exports = router;
