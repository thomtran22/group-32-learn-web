import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { apiGetProduct, apiGetBestSellers } from "../services/productApi";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
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
        const data = await apiGetProduct(id);
        setProduct(data);

        // 💡 KHỞI TẠO MÀU, SIZE VÀ ẢNH CHÍNH MẶC ĐỊNH
        // Hỗ trợ cả colors và availableColors
        const availableColors = data.colors || data.availableColors || [];
        if (availableColors.length > 0) {
          // Nếu colors là mảng objects có name, lấy name. Nếu là string thì dùng trực tiếp
          const firstColor = availableColors[0];
          const defaultColor = typeof firstColor === 'object' ? firstColor.name : firstColor;
          setSelectedColor(defaultColor);
          updateImagesByColor(defaultColor, data); // Gọi hàm cập nhật ảnh
        } else if (data.images && data.images.length > 0) {
          // Nếu không có màu, lấy ảnh đầu tiên
          const firstImage = data.images[0];
          setMainImage(typeof firstImage === 'object' ? firstImage.url : firstImage);
        }

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Lấy sản phẩm liên quan (best sellers)
        try {
          const relatedData = await apiGetBestSellers(id);
          setRelatedProductsData(Array.isArray(relatedData) ? relatedData : []);
        } catch (error) {
          setRelatedProductsData([]);
        }
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, updateImagesByColor]); // Thêm updateImagesByColor vào dependency

  const handleAddToCart = async () => {
    if (!product) {
      alert("Sản phẩm không tồn tại.");
      return;
    }
    
    if (!selectedColor) {
      alert("Vui lòng chọn màu sắc sản phẩm!");
      return;
    }
    
    if (!selectedSize) {
      alert("Vui lòng chọn cỡ sản phẩm!");
      return;
    }
    
    if (quantity <= 0) {
      alert("Số lượng phải lớn hơn 0!");
      return;
    }

    try {
      // Lấy ID sản phẩm (hỗ trợ nhiều format)
      const productId = product.productId || product._id || product.id || id;
      
      // Chuẩn bị dữ liệu theo format của CartContext
      const productData = {
        _id: productId,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        images: product.images || [],
        colors: product.colors || product.availableColors || [],
        sizes: product.sizes || [],
        variants: product.variants || []
      };

      await addToCart(productData);
      alert(`✅ Đã thêm ${quantity} sản phẩm ${product.name} (Màu: ${selectedColor}, Size: ${selectedSize}) vào giỏ hàng.`);
    } catch (error) {
      alert("❌ Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.");
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
        <h2>Không tìm thấy sản phẩm.</h2>
        <p>ID sản phẩm: {id}</p>
        <p>Vui lòng kiểm tra lại ID hoặc thử lại sau.</p>
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
                {/* Hỗ trợ cả colors và availableColors */}
                {(product.colors || product.availableColors || []).map((color) => {
                  const colorName = typeof color === 'object' ? color.name : color;
                  const colorImage = typeof color === 'object' ? color.image : null;
                  
                  return (
                    <div
                      key={colorName}
                      className={`color-item ${
                        selectedColor === colorName ? "selected" : ""
                      }`}
                      onClick={() => handleColorSelect(colorName)}
                    >
                      {colorImage && <img src={colorImage} alt={colorName} />}
                      <span>{colorName}</span>
                    </div>
                  );
                })}
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
              {/* Hỗ trợ cả string và array */}
              {Array.isArray(product.description) ? (
                <ul>
                  {product.description.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>{product.description || 'Chưa có mô tả cho sản phẩm này.'}</p>
              )}
              <h3 className="description-title">Hướng dẫn chọn size</h3>
              <p>Phom REGULAR. Size: {product.sizes ? product.sizes.join(', ') : 'M, L, XL'}.</p>
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