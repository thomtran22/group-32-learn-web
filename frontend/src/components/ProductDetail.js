import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";

function ProductDetail({ productId, onProductSelect }) {
  const [product, setProduct] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState("");

  const [mainImage, setMainImage] = useState("");

  const [thumbnails, setThumbnails] = useState([]);

  const handleThumbnailClick = (imageURL) => {
    const currentMainImage = mainImage;
    setMainImage(imageURL);

    let updatedThumbnails = thumbnails.filter((url) => url !== imageURL);

    if (currentMainImage && !updatedThumbnails.includes(currentMainImage)) {
      updatedThumbnails.push(currentMainImage);
    }
    setThumbnails(updatedThumbnails.filter((url) => url !== imageURL));
  };

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);

    const newImages = product.images.filter((img) => img.color === colorName);

    if (newImages.length > 0) {
      setMainImage(newImages[0].url);
      setThumbnails(newImages.slice(1).map((img) => img.url));
    } else {
      setMainImage("");
      setThumbnails([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodRes = await fetch(
          `http://localhost:5000/api/product/${productId}`
        );
        const bestRes = await fetch(
          `http://localhost:5000/api/best-sellers?excludeId=${productId}`
        );

        if (!prodRes.ok) {
          setProduct(null);
          setLoading(false);
          return;
        }

        const prodData = await prodRes.json();
        const bestData = await bestRes.json();

        setProduct(prodData);
        setBestSellers(bestData);
        const images = prodData.images || [];
        const availableColors = prodData.availableColors || [];

        if (images.length > 0) {
          const defaultColor =
            availableColors.length > 0
              ? availableColors[0].name
              : images[0].color;

          setSelectedColor(defaultColor);
          const defaultImages = images
            .filter((img) => img.color === defaultColor)
            .map((img) => img.url);
          if (defaultImages.length > 0) {
            setMainImage(defaultImages[0]);
            setThumbnails(defaultImages.slice(1));
          } else {
            setMainImage(null);
            setThumbnails([]);
          }
        } else {
          setSelectedColor("");
          setMainImage(null);
          setThumbnails([]);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setProduct(null);
      }
    };
    fetchData();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Vui lòng chọn cỡ sản phẩm!");
      return;
    }
    if (!selectedColor) {
      alert("Vui lòng chọn màu sắc sản phẩm!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.productId,
          productName: product.name,
          size: selectedSize,
          quantity: quantity,
          color: selectedColor,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(
          `✅ Đã thêm ${quantity} sản phẩm ${product.name} (Màu: ${selectedColor}, Size ${selectedSize}) vào giỏ hàng.`
        );
      } else {
        alert(`❌ Lỗi: ${data.message}`);
      }
    } catch (error) {
      alert("❌ Lỗi kết nối mạng hoặc Server.");
    }
  };

  if (loading) return <div className="loading-state">Đang tải dữ liệu...</div>;
  if (!product)
    return <div className="error-state">Không tìm thấy sản phẩm này.</div>;

  const availableColors = product.availableColors || [];

  return (
    <main className="container">
      <div className="breadcrumb">Trang chủ / Sản phẩm / {product.name}</div>

      <div className="product-detail-section">
        <div className="product-gallery">
          <div className="thumbnails">
            {thumbnails.map((imgURL, idx) => (
              <img
                key={idx}
                src={imgURL}
                alt={`thumb ${idx + 1}`}
                onClick={() => handleThumbnailClick(imgURL)}
                className={imgURL === mainImage ? "active" : ""}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">{product.price.toLocaleString()}đ</div>
          <hr />

          <div className="selector-row">
            <span>Màu Sắc: {selectedColor}</span>
            <div className="color-options">
              {availableColors.map((colorOption) => (
                <div
                  key={colorOption.name}
                  title={colorOption.name}
                  onClick={() => handleColorSelect(colorOption.name)}
                  className={`color-swatch ${
                    selectedColor === colorOption.name ? "active" : ""
                  }`}
                  style={{ backgroundImage: `url(${colorOption.image})` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="selector-row">
            <span>Cỡ</span>
            <div className="size-options">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="actions-row">
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingBag /> THÊM VÀO GIỎ HÀNG
            </button>
          </div>

          <div className="product-description">
            <h3>Mô tả</h3>
            <ul>
              {product.description.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            <h3>HƯỚNG DẪN CHỌN SIZE</h3>
          </div>
        </div>
      </div>

      <section className="best-sellers">
        <h2 className="section-title">CÓ THỂ BẠN CŨNG THÍCH</h2>
        <div className="product-grid">
          {bestSellers.map((item) => (
            <div
              key={item.productId}
              className="product-card"
              onClick={() => onProductSelect(item.productId)}
            >
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[0].url
                    : ""
                }
                alt={item.name}
              />
              <div className="card-info">
                <p className="p-name">{item.name}</p>
                <p className="p-price">{item.price.toLocaleString()}đ</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
