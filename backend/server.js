const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const serviceRoutes = require("./routes/ServiceRoutes");
const ShipperRoutes = require("./routes/ShipperRoutes");
const { router: authRoutes } = require("./routes/authRoutes");
const ProductRouter = require("./routes/ProductRoutes");
const addressRoutes = require("./routes/addressRoutes");
const voucherRoutes = require("./routes/voucherRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://thuong:27040404@cluster0.kgccigl.mongodb.net/test1";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/shipper", ShipperRoutes);
app.use("/api/products", ProductRouter);
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/vouchers", voucherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
