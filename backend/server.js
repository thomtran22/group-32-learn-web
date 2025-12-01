const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 5000;

// KẾT NỐI MONGODB
const MONGO_URI =
  "mongodb+srv://thuong2742004_sangt4:swoHHXQpA5wHqGqt@cluster0.f2rkhku.mongodb.net/test011225";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) =>
    console.error(
      "❌ MongoDB connection error. Vui lòng kiểm tra dịch vụ MongoDB."
    )
  );

// ĐỊNH NGHĨA SCHEMAS
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productId: { type: String, required: true, unique: true },
  sizes: [String],
  description: [String],
  images: [String],
  colors: [{ id: String, name: String, image: String }],
  isBestSeller: { type: Boolean, default: false },
});
const Product = mongoose.model("Product", productSchema);

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  dateAdded: { type: Date, default: Date.now },
});
const CartItem = mongoose.model("CartItem", cartItemSchema);

// CẤU HÌNH MIDDLEWARE
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// LOGIC SEEDING (Sản phẩm mẫu)
const SEED_PRODUCTS = [
  {
    name: "Áo polo nam POHTK404",
    price: 379000,
    productId: "POHTK404",
    sizes: ["M", "L", "XL"],
    description: [
      "- Chất liệu: PIQUE",
      "- Form: REGULAR",
      "- Kiểu dáng: Cổ bẻ",
    ],
    images: [
      "https://down-vn.img.susercontent.com/file/sg-11134201-22100-3cgf3tr1mtiv02.webp",
      "https://down-vn.img.susercontent.com/file/sg-11134201-22100-tm3s9fb3mtiv10.webp",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m502ps5kle8nf3.webp",
    ],
    colors: [
      {
        id: "black",
        name: "Đen",
        image:
          "https://down-vn.img.susercontent.com/file/sg-11134201-22100-3cgf3tr1mtiv02.webp",
      },
    ],
    isBestSeller: true,
  },
  {
    name: "Áo polo nam POHTK401",
    price: 479000,
    productId: "POHTK401",
    sizes: ["M", "L", "XL"],
    description: ["- Chất liệu: Cotton"],
    images: [
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m502ps5kle8nf3.webp",
    ],
    colors: [
      {
        id: "grey",
        name: "Xám",
        image:
          "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m502ps5kle8nf3.webp",
      },
    ],
    isBestSeller: true,
  },
  {
    name: "Áo polo nam POHTK402",
    price: 479000,
    productId: "POHTK402",
    sizes: ["M", "L", "XL"],
    description: ["- Chất liệu: Poly"],
    images: [
      "https://down-vn.img.susercontent.com/file/vn-11134258-820l4-mhkjhwcmlfk2b4.webp",
    ],
    colors: [
      {
        id: "blue",
        name: "Xanh",
        image:
          "https://down-vn.img.susercontent.com/file/vn-11134258-820l4-mhkjhwcmlfk2b4.webp",
      },
    ],
    isBestSeller: true,
  },
  {
    name: "Áo polo nam POHTK403",
    price: 479000,
    productId: "POHTK403",
    sizes: ["M", "L", "XL"],
    description: ["- Chất liệu: Vải lưới"],
    images: [
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-md9rlu2rgbe57d.webp",
    ],
    colors: [
      {
        id: "red",
        name: "Đỏ",
        image:
          "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-md9rlu2rgbe57d.webp",
      },
    ],
    isBestSeller: true,
  },
  {
    name: "Áo polo nam POHTK405",
    price: 479000,
    productId: "POHTK405",
    sizes: ["M", "L", "XL"],
    description: ["- Chất liệu: Dệt kim"],
    images: [
      "https://down-vn.img.susercontent.com/file/sg-11134201-22100-tm3s9fb3mtiv10.webp",
    ],
    colors: [
      {
        id: "green",
        name: "Xanh Lá",
        image:
          "https://down-vn.img.susercontent.com/file/sg-11134201-22100-tm3s9fb3mtiv10.webp",
      },
    ],
    isBestSeller: false,
  },
];

async function seedDatabase() {
  const count = await Product.countDocuments();
  if (count < SEED_PRODUCTS.length) {
    console.log("⏳ Đang cập nhật/khởi tạo dữ liệu mẫu...");
    await Product.deleteMany({});
    await Product.insertMany(SEED_PRODUCTS);
    console.log(`✅ Đã thêm ${SEED_PRODUCTS.length} sản phẩm vào MongoDB.`);
  }
}
seedDatabase();

// ===========================================
// CẬP NHẬT LOGIC: Lấy sản phẩm ngẫu nhiên
// ===========================================
// API 2: Lấy 4 sản phẩm ngẫu nhiên KHÔNG trùng với sản phẩm đang xem
app.get("/api/best-sellers", async (req, res) => {
  try {
    const excludeId = req.query.excludeId;

    const pipeline = [
      {
        // Loại bỏ sản phẩm đang xem
        $match: {
          productId: { $ne: excludeId },
        },
      },
      {
        // Chọn 4 tài liệu ngẫu nhiên
        $sample: { size: 4 },
      },
    ];

    const products = await Product.aggregate(pipeline);

    res.json(products);
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm ngẫu nhiên:", error);
    res
      .status(500)
      .json({ message: "Lỗi Server khi truy vấn danh sách ngẫu nhiên." });
  }
});
// ===========================================

// API 1: Lấy chi tiết một sản phẩm theo ID
app.get("/api/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res
        .status(404)
        .json({ message: `Không tìm thấy sản phẩm với ID: ${productId}` });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server khi truy vấn sản phẩm." });
  }
});

// API 3: Thêm sản phẩm mới
app.post("/api/add-product", async (req, res) => {
  try {
    const newProductId = uuidv4();
    const productData = {
      ...req.body,
      productId: newProductId,
    };
    const newProduct = new Product(productData);
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Thêm sản phẩm thành công!", product: newProduct });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ message: "Lỗi: ProductId đã tồn tại." });
    res.status(500).json({ message: "Lỗi Server khi tạo sản phẩm." });
  }
});

// API 4: Thêm vào giỏ hàng
app.post("/api/cart", async (req, res) => {
  try {
    const { productId, productName, size, quantity } = req.body;
    if (!productId || !size || !quantity || quantity < 1)
      return res.status(400).json({ message: "Dữ liệu không hợp lệ." });
    const newCartItem = new CartItem({
      productId,
      productName,
      size,
      quantity,
    });
    await newCartItem.save();
    res.status(201).json({ message: "Thêm vào giỏ hàng thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server khi lưu giỏ hàng." });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    // Find({}) sẽ lấy tất cả các tài liệu trong collection 'Product'
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Lỗi truy vấn tất cả sản phẩm:", error);
    res
      .status(500)
      .json({ message: "Lỗi Server khi truy vấn danh sách sản phẩm." });
  }
});

app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại: http://localhost:${PORT}`);
});
