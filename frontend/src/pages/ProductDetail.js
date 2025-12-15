import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { apiGetProduct, apiGetBestSellers } from "../services/productApi";

const ImageZoom = ({ src, alt }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      style={{ position: "relative", overflow: "hidden", cursor: "crosshair" }}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
      {showZoom && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "200%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiGetProduct(id);
        setProduct(data);

        if (data.images && data.images.length > 0) {
          const firstImg = data.images[0];
          setMainImage(typeof firstImg === "string" ? firstImg : firstImg.url);

          if (Array.isArray(data.images)) {
            setThumbnails(
              data.images.map((img) =>
                typeof img === "string" ? img : img.url
              )
            );
          }
        }

        const availableColors = [
          ...new Set(
            data.variants?.map((v) => v.color) ||
              data.colors?.map((c) => (typeof c === "object" ? c.name : c)) ||
              []
          ),
        ];
        if (availableColors.length > 0) {
          setSelectedColor(availableColors[0]);
        }

        const related = await apiGetBestSellers(id);
        setRelatedProducts(Array.isArray(related) ? related : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const checkStock = (sizeToCheck) => {
    if (!product || !product.variants || product.variants.length === 0)
      return false;

    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === sizeToCheck
    );

    return !variant || variant.quantity <= 0;
  };

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

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
      const productData = {
        _id: product._id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        images: product.images || [],
        variants: product.variants || [],
      };
      await addToCart(productData);
      alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng.`);
    } catch (error) {
      alert("Lỗi khi thêm vào giỏ hàng.");
    }
  };

  if (loading)
    return (
      <div className="container" style={{ padding: 50, textAlign: "center" }}>
        Đang tải dữ liệu...
      </div>
    );
  if (!product)
    return (
      <div className="container" style={{ padding: 50, textAlign: "center" }}>
        Sản phẩm không tồn tại
      </div>
    );

  const availableColors = [
    ...new Set(
      product.variants?.map((v) => v.color) ||
        product.colors?.map((c) => (typeof c === "object" ? c.name : c)) ||
        []
    ),
  ];
  const availableSizes = [
    ...new Set(product.variants?.map((v) => v.size) || product.sizes || []),
  ];

  return (
    <main className="container">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> /
        {product.category ? (
          <Link
            to={`/category/${product.category.slug || product.category._id}`}
          >
            {" "}
            {product.category.name || "Danh mục"}{" "}
          </Link>
        ) : (
          " Sản phẩm "
        )}
        / {product.name}
      </div>

      <div className="product-detail-section">
        <div className="product-gallery">
          <div className="thumbnails">
            {thumbnails.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="thumbnail"
                className={src === mainImage ? "active" : ""}
                onClick={() => handleThumbnailClick(src)}
              />
            ))}
          </div>
          <div className="main-image">
            <ImageZoom src={mainImage} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">{product.price?.toLocaleString()}đ</div>
          <hr />

          <div className="selector-row">
            <span>
              Màu sắc: <strong>{selectedColor}</strong>
            </span>
            <div className="color-options">
              {availableColors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`color-swatch ${
                    selectedColor === color ? "active" : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>

          <div className="selector-row">
            <span>
              Cỡ: <strong>{selectedSize}</strong>
            </span>
            <div className="size-options">
              {availableSizes.map((size) => {
                const isOutOfStock = checkStock(size);
                return (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => !isOutOfStock && setSelectedSize(size)}
                    disabled={isOutOfStock}
                    style={{
                      opacity: isOutOfStock ? 0.4 : 1,
                      cursor: isOutOfStock ? "not-allowed" : "pointer",
                      textDecoration: isOutOfStock ? "line-through" : "none",
                      position: "relative",
                    }}
                    title={isOutOfStock ? "Hết hàng" : ""}
                  >
                    {size}
                  </button>
                );
              })}
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
            {product.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description.replace(/\n/g, "<br/>"),
                }}
              />
            ) : (
              <p>Chưa có mô tả</p>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="best-sellers">
          <h2 className="section-title">CÓ THỂ BẠN CŨNG THÍCH</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <Link
                to={`/products/${p._id}`}
                key={p._id}
                className="product-item"
              >
                <div className="inner-image">
                  <img src={p.images?.[0] || p.image} alt={p.name} />
                </div>
                <div className="inner-content">
                  <h3 className="inner-title">{p.name}</h3>
                  <div className="inner-price">
                    {p.price?.toLocaleString()} VNĐ
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetail;
