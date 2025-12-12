import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";
import { useCart } from "../context/CartContext";
import { apiGetProduct, apiGetBestSellers } from "../services/productApi";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // STATE: Quản lý ảnh
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProductsData, setRelatedProductsData] = useState([]);

  // Hàm cập nhật ảnh theo màu
  const updateImagesByColor = useCallback((colorName, productData) => {
    if (!productData || !productData.images) return;

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

  // Xử lý chọn màu
  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    updateImagesByColor(colorName, product);
  };

  // Xử lý click thumbnail
  const handleThumbnailClick = (imageURL) => {
    const oldMainImage = mainImage;
    setMainImage(imageURL);

    setThumbnails((prevThumbnails) => {
      let newThumbnails = prevThumbnails.filter((url) => url !== imageURL);
      if (oldMainImage && !newThumbnails.includes(oldMainImage)) {
        newThumbnails.push(oldMainImage);
      }
      return newThumbnails;
    });
  };

  // Fetch data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await apiGetProduct(id);
        setProduct(data);

        // Khởi tạo màu và ảnh mặc định
        const availableColors = data.colors || data.availableColors || [];
        if (availableColors.length > 0) {
          const firstColor = availableColors[0];
          const defaultColor = typeof firstColor === 'object' ? firstColor.name : firstColor;
          setSelectedColor(defaultColor);
          updateImagesByColor(defaultColor, data);
        } else if (data.images && data.images.length > 0) {
          const firstImage = data.images[0];
          setMainImage(typeof firstImage === 'object' ? firstImage.url : firstImage);
        }

        // Khởi tạo size mặc định
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Lấy sản phẩm liên quan
        try {
          const relatedData = await apiGetBestSellers(id);
          setRelatedProductsData(Array.isArray(relatedData) ? relatedData : []);
        } catch (error) {
          setRelatedProductsData([]);
        }
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, updateImagesByColor]);

  // Xử lý thêm vào giỏ
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
      const productId = product.productId || product._id || product.id || id;
      
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

  if (loading) {
    return (
      <div className="container" style={{ padding: "50px", textAlign: "center" }}>
        Đang tải sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: "50px", textAlign: "center" }}>
        <h2>Không tìm thấy sản phẩm.</h2>
        <p>Vui lòng kiểm tra lại ID hoặc thử lại sau.</p>
      </div>
    );
  }

  // Lấy danh sách màu sắc
  const availableColors = product.colors || product.availableColors || [];

  return (
    <main className="container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> / <Link to="/products">Sản phẩm</Link> / {product.name}
      </div>

      {/* Section Chi tiết sản phẩm */}
      <div className="product-detail-section">
        {/* Gallery Ảnh */}
        <div className="product-gallery">
          {/* Thumbnails */}
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

          {/* Ảnh chính */}
          <div className="main-image">
            {mainImage ? (
              <img src={mainImage} alt={product.name} />
            ) : (
              <div style={{ 
                width: "100%", 
                aspectRatio: "3/4", 
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px"
              }}>
                Ảnh đang tải...
              </div>
            )}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">
            {product.price ? product.price.toLocaleString("vi-VN") : "N/A"} VNĐ
          </div>
          
          <hr />

          {/* Chọn Màu Sắc */}
          <div className="selector-row">
            <span>Màu sắc: {selectedColor}</span>
            <div className="color-options">
              {availableColors.map((color) => {
                const colorName = typeof color === 'object' ? color.name : color;
                const colorImage = typeof color === 'object' ? color.image : null;
                
                return (
                  <div
                    key={colorName}
                    title={colorName}
                    onClick={() => handleColorSelect(colorName)}
                    className={`color-swatch ${selectedColor === colorName ? "active" : ""}`}
                    style={colorImage ? { backgroundImage: `url(${colorImage})` } : {}}
                  />
                );
              })}
            </div>
          </div>

          {/* Chọn Cỡ */}
          <div className="selector-row">
            <span>Cỡ</span>
            <div className="size-options">
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Row */}
          <div className="actions-row">
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="fas fa-shopping-bag"></i> THÊM VÀO GIỎ HÀNG
            </button>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="product-description">
            <h3>Mô tả</h3>
            {Array.isArray(product.description) ? (
              <ul>
                {product.description.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{product.description || 'Chưa có mô tả cho sản phẩm này.'}</p>
            )}
            <h3>HƯỚNG DẪN CHỌN SIZE</h3>
          </div>
        </div>
      </div>

      {/* Phần Sản phẩm gợi ý */}
      <section className="best-sellers">
        <h2 className="section-title">CÓ THỂ BẠN CŨNG THÍCH</h2>
        <div className="product-grid">
          {relatedProductsData.length > 0 ? (
            relatedProductsData.map((p) => (
              <ProductCard key={p.id || p._id} product={p} />
            ))
          ) : (
            <p>Không có sản phẩm liên quan.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;