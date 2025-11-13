import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Dữ liệu sản phẩm
const initialProduct = {
  name: "Áo polo nam POHTK404",
  price: "379.000₫",
  sizes: ["S", "M", "L", "XL"],
  images: [
    { src: "./asset/images/image-27-1.jpg", alt: "mau den", color: "Đen" },
    { src: "./asset/images/image-27-2.jpg", alt: "mau trang", color: "Trắng" },
    { src: "./asset/images/image-27-3.jpg", alt: "mau be", color: "Be" },
  ],
  description: [
    "Chất liệu: Poly co giãn thoáng mát",
    "Phom dáng: Regular Fit",
    "Kiểu dáng: Cổ bẻ 2 nút",
    "Phù hợp: Đi làm, đi chơi, dạo phố",
  ],
};

// Dữ liệu sản phẩm bán chạy
const hotProductsData = [
  {
    name: "Áo polo nam POHTK401",
    price: "479.000₫",
    image: "./asset/images/image-27-1.jpg",
    alt: "Đen",
  },
  {
    name: "Áo polo nam POHTK402",
    price: "479.000₫",
    image: "./asset/images/image-27-5.jpg",
    alt: "Trắng",
  },
  {
    name: "Áo polo nam POHTK403",
    price: "479.000₫",
    image: "./asset/images/image-27-3.jpg",
    alt: "Be",
  },
  {
    name: "Áo polo nam POHTK405",
    price: "479.000₫",
    image: "./asset/images/image-27-4.jpg",
    alt: "Xanh lá",
  },
];

const Product = () => {
  const [selectedColor, setSelectedColor] = useState(
    initialProduct.images[0].color
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(initialProduct.images[0].src);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn cỡ sản phẩm!");
      return;
    }
    console.log(
      `Đã thêm ${quantity} sản phẩm: ${initialProduct.name}, Màu: ${selectedColor}, Cỡ: ${selectedSize}`
    );
  };

  const handleThumbClick = (imageSrc, color) => {
    setMainImage(imageSrc);
    setSelectedColor(color);
  };

  return (
    <>
      <Header />

      <div className="thuong-container">
        {/* Phần Chi tiết Sản phẩm */}
        <section className="thuong-product-detail">
          <div className="thuong-images">
            <img
              src={mainImage}
              className="thuong-main-img"
              alt={initialProduct.name}
            />
            <div className="thuong-thumb-list">
              {initialProduct.images.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => handleThumbClick(img.src, img.color)}
                  style={
                    img.src === mainImage
                      ? { borderColor: "#000", transform: "scale(1.05)" }
                      : {}
                  }
                />
              ))}
            </div>
          </div>

          <div className="thuong-info">
            <h1>{initialProduct.name}</h1>
            <div className="thuong-price">{initialProduct.price}</div>

            <div className="thuong-color">
              <span>Màu sắc:</span> {selectedColor}
            </div>

            <div className="thuong-size">
              <span>Chọn cỡ:</span>
              {initialProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={
                    selectedSize === size
                      ? {
                          backgroundColor: "#000",
                          color: "#fff",
                          borderColor: "#000",
                        }
                      : {}
                  }
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="thuong-quantity">
              <span>Số lượng: </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <button className="thuong-add-cart" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>

            <div className="thuong-description">
              <p>
                <b>Mô tả:</b>
              </p>
              <ul>
                {initialProduct.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Phần Sản phẩm bán chạy */}
        <h2 className="thuong-hot-title">SẢN PHẨM BÁN CHẠY</h2>
        <div className="thuong-hot-products">
          {hotProductsData.map((product, index) => (
            <div className="thuong-card" key={index}>
              <img src={product.image} alt={product.alt} />
              <h3>{product.name}</h3>
              <div className="thuong-price">{product.price}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;
