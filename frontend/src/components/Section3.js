import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

import imgMain from "../asset/images/image-27-1.jpg"; // Ảnh đen (chính)
import imgWhite from "../asset/images/image-27-2.jpg"; // Ảnh trắng
import imgBeige from "../asset/images/image-27-3.jpg"; // Ảnh be
import imgGreen from "../asset/images/image-27-4.jpg"; // Ảnh xanh lá (cho phần bán chạy)
import imgWhite2 from "../asset/images/image-27-5.jpg"; // Ảnh trắng (cho phần bán chạy)

function Section3() {
  // --- DỮ LIỆU SẢN PHẨM ---
  const initialProduct = {
    name: "Áo polo nam POHTK404",
    price: "379.000₫",
    sizes: ["S", "M", "L", "XL"],
    images: [
      { src: imgMain, alt: "Màu đen", color: "Đen" },
      { src: imgWhite, alt: "Màu trắng", color: "Trắng" },
      { src: imgBeige, alt: "Màu be", color: "Be" },
    ],
    description: [
      "Chất liệu: Poly co giãn thoáng mát",
      "Phom dáng: Regular Fit",
      "Kiểu dáng: Cổ bẻ 2 nút",
      "Phù hợp: Đi làm, đi chơi, dạo phố",
    ],
  };

  // --- DỮ LIỆU SẢN PHẨM BÁN CHẠY ---
  const hotProductsData = [
    { id: 1, name: "Áo polo nam POHTK401", price: "479.000₫", image: imgMain },
    {
      id: 2,
      name: "Áo polo nam POHTK402",
      price: "479.000₫",
      image: imgWhite2,
    },
    { id: 3, name: "Áo polo nam POHTK403", price: "479.000₫", image: imgBeige },
    { id: 4, name: "Áo polo nam POHTK405", price: "479.000₫", image: imgGreen },
  ];

  // --- STATE (TRẠNG THÁI) ---
  const [selectedColor, setSelectedColor] = useState(
    initialProduct.images[0].color
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(initialProduct.images[0].src);

  // --- HÀM XỬ LÝ ---
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn cỡ sản phẩm!");
      return;
    }
    console.log(
      `Đã thêm ${quantity} sản phẩm: ${initialProduct.name}, Màu: ${selectedColor}, Cỡ: ${selectedSize}`
    );
    alert(`Đã thêm vào giỏ: ${initialProduct.name} - Size ${selectedSize}`);
  };

  const handleThumbClick = (imageSrc, color) => {
    setMainImage(imageSrc);
    setSelectedColor(color);
  };

  return (
    <>
      <Header />

      <div className="thuong-container">
        {/* === PHẦN CHI TIẾT SẢN PHẨM === */}
        <section className="thuong-product-detail">
          {/* Cột trái: Ảnh */}
          <div className="thuong-images">
            <img
              src={mainImage}
              className="thuong-main-img"
              alt={initialProduct.name}
            />
            <div className="thuong-thumb-list">
              {initialProduct.images.map((img, index) => (
                <img
                  key={index}
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

          {/* Cột phải: Thông tin */}
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

        {/* === PHẦN SẢN PHẨM BÁN CHẠY === */}
        <h2 className="thuong-hot-title">SẢN PHẨM BÁN CHẠY</h2>
        <div className="thuong-hot-products">
          {hotProductsData.map((product) => (
            <div className="thuong-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <div className="thuong-price">{product.price}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Section3;
