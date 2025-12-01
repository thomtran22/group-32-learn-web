import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
// Import 'BrowserRouter' từ react-router-dom nếu nó cần để giải quyết lỗi trước đó
// import { BrowserRouter } from 'react-router-dom';

function ProductDetail({ productId, onProductSelect }) {
  const [product, setProduct] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [loading, setLoading] = useState(true);

  // 💡 STATE MỚI: Lưu trữ URL của ảnh chính đang hiển thị
  const [mainImage, setMainImage] = useState("");
  // 💡 STATE MỚI: Lưu trữ danh sách ảnh thumbnails
  const [thumbnails, setThumbnails] = useState([]);

  // Hàm xử lý click vào ảnh nhỏ
  const handleThumbnailClick = (clickedImageURL) => {
    // 1. Lấy ảnh chính hiện tại
    const currentMainImage = mainImage;

    // 2. Cập nhật ảnh chính mới
    setMainImage(clickedImageURL);

    // 3. Cập nhật danh sách thumbnails:
    // - Loại bỏ ảnh vừa click ra khỏi thumbnails
    // - Thêm ảnh chính cũ (currentMainImage) vào danh sách thumbnails

    // Tạo danh sách thumbnails mới bằng cách lọc bỏ ảnh vừa click
    let updatedThumbnails = thumbnails.filter((url) => url !== clickedImageURL);

    // Thêm ảnh chính cũ vào danh sách (để nó trở thành thumbnail)
    updatedThumbnails.push(currentMainImage);

    // Cập nhật state thumbnails
    setThumbnails(updatedThumbnails);
  };

  // Fetch dữ liệu khi productId thay đổi
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodRes = await fetch(
          `http://localhost:5000/api/product/${productId}`
        );
        // Gửi kèm ID sản phẩm đang xem để Server loại trừ trong list gợi ý
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

        // 💡 LOGIC KHỞI TẠO ẢNH: Tách ảnh chính và ảnh thumbnails
        if (prodData.images && prodData.images.length > 0) {
          setMainImage(prodData.images[0]); // Ảnh đầu tiên làm ảnh chính
          setThumbnails(prodData.images.slice(1)); // Ảnh còn lại làm thumbnails
        } else {
          setMainImage("");
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

  // Hàm Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Vui lòng chọn cỡ sản phẩm!");
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
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(
          `✅ Đã thêm ${quantity} sản phẩm ${product.name} (Size ${selectedSize}) vào CSDL.`
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

  return (
    <main className="container">
      <div className="breadcrumb">Trang chủ / Sản phẩm / {product.name}</div>
      <div className="product-detail-section">
        {/* Gallery */}
        <div className="product-gallery">
          {/* ẢNH THUMBNAILS (ĐƯỢC HIỂN THỊ CÁC ẢNH PHỤ VÀ ẢNH CHÍNH CŨ) */}
          <div className="thumbnails">
            {thumbnails.map((imgURL, idx) => (
              <img
                key={idx}
                src={imgURL}
                alt={`thumb ${idx + 1}`}
                // 💡 Gán sự kiện onClick để đổi ảnh
                onClick={() => handleThumbnailClick(imgURL)}
                // Nếu muốn thêm hiệu ứng active cho ảnh nhỏ, hãy thêm class 'active' tại đây.
              />
            ))}
          </div>

          {/* ẢNH CHÍNH (LUÔN HIỂN THỊ mainImage) */}
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">{product.price.toLocaleString()}đ</div>
          <hr />

          <div className="selector-row">
            <span>Màu Sắc</span>
            <div className="color-options">
              {product.colors.map((c) => (
                <div
                  key={c.id}
                  className="color-swatch"
                  title={c.name}
                  style={{ backgroundImage: `url(${c.image})` }}
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

      {/* SẢN PHẨM GỢI Ý */}
      <section className="best-sellers">
        <h2 className="section-title">CÓ THỂ BẠN CŨNG THÍCH</h2>
        <div className="product-grid">
          {bestSellers.map((item) => (
            <div
              key={item.productId}
              className="product-card"
              onClick={() => onProductSelect(item.productId)}
            >
              <img src={item.images[0]} alt={item.name} />
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
