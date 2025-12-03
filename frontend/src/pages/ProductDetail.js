import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const BASE_URL = "http://localhost:5000";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 💡 STATE MỚI: Quản lý ảnh chính và thumbnails dựa trên màu sắc
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProductsData, setRelatedProductsData] = useState([]);

  // --- LOGIC XỬ LÝ ẢNH & MÀU SẮC ---

  // Hàm này lọc ảnh theo màu và cập nhật state ảnh
  const updateImagesByColor = useCallback((colorName, productData) => {
    if (!productData || !productData.images) return;

    // Lọc tất cả ảnh (url) của màu đang chọn (GIẢ SỬ CẤU TRÚC LÀ product.images = [{color: '...', url: '...'}] )
    const imagesForColor = productData.images
      .filter((img) => img.color === colorName)
      .map((img) => img.url);

    if (imagesForColor.length > 0) {
      setMainImage(imagesForColor[0]);
      setThumbnails(imagesForColor.slice(1));
    } else {
      setMainImage(null);
      setThumbnails([]);
    }
  }, []);

  // Hàm xử lý khi click chọn màu
  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    updateImagesByColor(colorName, product);
  };

  // Hàm xử lý đổi ảnh chính trong gallery (dùng cho thumbnails)
  const handleThumbnailClick = (imageURL) => {
    const oldMainImage = mainImage;

    // 1. Đặt ảnh mới làm ảnh chính
    setMainImage(imageURL);

    // 2. Cập nhật thumbnails: loại bỏ ảnh mới, thêm ảnh cũ
    setThumbnails((prevThumbnails) => {
      let newThumbnails = prevThumbnails.filter((url) => url !== imageURL);

      if (oldMainImage) {
        newThumbnails.push(oldMainImage);
      }
      return newThumbnails;
    });
  };

  // --- FETCH DATA (useEffect) ---
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // 💡 Đổi tên API từ /api/products/ sang /api/product/ cho đúng convention trước đó
        const response = await fetch(`${BASE_URL}/api/product/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setProduct(data);

        // 💡 KHỞI TẠO MÀU, SIZE VÀ ẢNH CHÍNH MẶC ĐỊNH
        if (data.colors && data.colors.length > 0) {
          const defaultColor = data.colors[0].name;
          setSelectedColor(defaultColor);
          updateImagesByColor(defaultColor, data); // Gọi hàm cập nhật ảnh
        } else {
          setMainImage(
            data.images && data.images.length > 0 ? data.images[0].url : null
          );
        }

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Giả sử có API riêng cho sản phẩm liên quan
        // const relatedRes = await fetch(`${BASE_URL}/api/related-products/${id}`);
        // const relatedData = await relatedRes.json();
        // setRelatedProductsData(relatedData);
      } catch (error) {
        console.error("Lỗi khi fetch API chi tiết sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, updateImagesByColor]); // Thêm updateImagesByColor vào dependency

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize && quantity > 0) {
      console.log(
        `Thêm vào giỏ hàng: ${product.name}, Màu: ${selectedColor}, Size: ${selectedSize}, SL: ${quantity}`
      );
      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
      // TODO: GỌI API POST /api/cart/add ĐỂ THÊM VÀO GIỎ HÀNG THẬT SỰ
    } else {
      alert("Vui lòng chọn màu, size và số lượng hợp lệ.");
    }
  };

  if (loading)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Đang tải sản phẩm...
      </div>
    );
  if (!product)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Không tìm thấy sản phẩm.
      </div>
    );

  // --- RENDER JSX ---
  return (
    <div className="product-detail-page">
      <div className="container">
        {/* ... (Breadcrumb giữ nguyên) ... */}

        <div className="detail-main-wrap">
          {/* Cột 1: Ảnh sản phẩm (SỬA LỖI Ở ĐÂY) */}
          <div className="detail-images">
            <div className="main-image">
              {/* 💡 SỬ DỤNG mainImage STATE */}
              {mainImage ? (
                <img src={mainImage} alt={product.name} />
              ) : (
                <div style={{ height: "400px", backgroundColor: "#eee" }}>
                  Ảnh đang tải...
                </div>
              )}
            </div>
            <div className="thumb-images">
              {/* 💡 SỬ DỤNG thumbnails STATE */}
              {thumbnails.map((imgURL, index) => (
                <img
                  key={index}
                  src={imgURL}
                  alt={`Thumb ${index}`}
                  onClick={() => handleThumbnailClick(imgURL)}
                  className={mainImage === imgURL ? "active" : ""}
                />
              ))}
              {/* Thêm ảnh chính cũ (hiện tại) vào thumbnails nếu có */}
              {mainImage && !thumbnails.includes(mainImage) && (
                <img
                  key="current-main"
                  src={mainImage}
                  alt="Ảnh chính"
                  className="current active"
                  onClick={() => handleThumbnailClick(mainImage)}
                />
              )}
            </div>
          </div>

          {/* Cột 2: Thông tin và Tùy chọn */}
          <div className="detail-info">
            <h1 className="product-name">{product.name}</h1>
            {/* 💡 Bạn nên format product.price */}
            <div className="product-price">
              {product.price ? product.price.toLocaleString("vi-VN") : "N/A"}{" "}
              VNĐ
            </div>

            <div className="option-group">
              <h3 className="option-title">Màu Sắc</h3>
              <div className="color-options">
                {/* 💡 GỌI handleColorSelect */}
                {product.colors &&
                  product.colors.map((color) => (
                    <div
                      key={color.name}
                      className={`color-item ${
                        selectedColor === color.name ? "selected" : ""
                      }`}
                      onClick={() => handleColorSelect(color.name)}
                    >
                      {/* Giả sử color.image là URL của icon/ảnh đại diện màu */}
                      <img src={color.image} alt={color.name} />
                      <span>{color.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* ... (Phần chọn Cỡ giữ nguyên) ... */}
            <div className="option-group">
              <h3 className="option-title">Cỡ</h3>
              <div className="size-options">
                {product.sizes &&
                  product.sizes.map((size) => (
                    <div
                      key={size}
                      className={`size-item ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>

            {/* ... (Phần actions và mô tả giữ nguyên) ... */}
            <div className="purchase-actions">
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input type="number" value={quantity} readOnly min="1" />
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                <i className="icon-cart"></i> THÊM VÀO GIỎ HÀNG
              </button>
            </div>
            <div className="product-description">
              <h3 className="description-title">Mô tả</h3>
              {/* Giả sử product.description là string, nếu là array thì cần join() */}
              <p>
                {Array.isArray(product.description)
                  ? product.description.join(", ")
                  : product.description}
              </p>
              <h3 className="description-title">Hướng dẫn chọn size</h3>
              <p>Phom REGULAR. Size: M, L, XL.</p>
            </div>
          </div>
        </div>

        {/* Phần sản phẩm liên quan */}
        <div className="related-products">
          <h2 className="section-title">SẢN PHẨM BÁN CHẠY</h2>
          <div className="product-list-wrap">
            {relatedProductsData.length > 0 ? (
              relatedProductsData.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p>Không có sản phẩm liên quan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
