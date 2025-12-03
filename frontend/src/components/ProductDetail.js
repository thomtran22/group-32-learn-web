import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
// Import các component/utility khác nếu cần

function ProductDetail({ productId, onProductSelect }) {
  const [product, setProduct] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [loading, setLoading] = useState(true);

  // STATE: Màu sắc đang được chọn
  const [selectedColor, setSelectedColor] = useState("");

  // STATE: Quản lý ảnh chính đang hiển thị (URL)
  const [mainImage, setMainImage] = useState("");

  // STATE: Danh sách thumbnails (URLs) thuộc về màu đang chọn
  const [thumbnails, setThumbnails] = useState([]);

  // Hàm xử lý đổi ảnh chính trong gallery khi click thumbnail
  const handleThumbnailClick = (imageURL) => {
    const currentMainImage = mainImage;
    setMainImage(imageURL);

    // Lọc bỏ ảnh vừa click ra khỏi thumbnails
    let updatedThumbnails = thumbnails.filter((url) => url !== imageURL);

    // Nếu ảnh chính cũ chưa có trong list thumbnails, thì thêm vào
    if (currentMainImage && !updatedThumbnails.includes(currentMainImage)) {
      updatedThumbnails.push(currentMainImage);
    }
    // Lọc lại một lần nữa để đảm bảo ảnh chính mới không bị trùng trong thumbnails
    setThumbnails(updatedThumbnails.filter((url) => url !== imageURL));
  };

  // Hàm xử lý khi click chọn màu sắc
  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);

    // Lấy tất cả ảnh của màu mới này từ mảng product.images
    const newImages = product.images.filter((img) => img.color === colorName);

    if (newImages.length > 0) {
      // Đặt ảnh đầu tiên của màu mới làm ảnh chính
      setMainImage(newImages[0].url);
      // Đặt các ảnh còn lại làm thumbnails
      setThumbnails(newImages.slice(1).map((img) => img.url));
    } else {
      setMainImage("");
      setThumbnails([]);
    }
  };

  // Fetch dữ liệu và khởi tạo State
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

        // prodData chứa cả product và availableColors (do logic backend đã sửa)
        const prodData = await prodRes.json();
        const bestData = await bestRes.json();

        setProduct(prodData);
        setBestSellers(bestData); // LOGIC KHỞI TẠO ẢNH & MÀU
        const images = prodData.images || []; // Đảm bảo images là một mảng
        const availableColors = prodData.availableColors || []; // Đảm bảo colors là một mảng

        if (images.length > 0) {
          // Lấy màu sắc mặc định (Ưu tiên màu từ availableColors nếu có)
          const defaultColor =
            availableColors.length > 0
              ? availableColors[0].name
              : images[0].color; // Lấy từ images nếu availableColors rỗng

          setSelectedColor(defaultColor); // Lọc các ảnh thuộc màu mặc định
          const defaultImages = images
            .filter((img) => img.color === defaultColor)
            .map((img) => img.url);
          if (defaultImages.length > 0) {
            setMainImage(defaultImages[0]); // Ảnh đầu tiên của màu đó làm ảnh chính
            setThumbnails(defaultImages.slice(1)); // Ảnh còn lại làm thumbnails
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

  // Hàm Thêm vào giỏ hàng (Gửi thêm 'color' lên server)
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
          color: selectedColor, // GỬI THÔNG TIN MÀU SẮC
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

  // Lấy danh sách màu sắc duy nhất từ phản hồi của Server
  const availableColors = product.availableColors || [];

  return (
    <main className="container">
      <div className="breadcrumb">Trang chủ / Sản phẩm / {product.name}</div>

      <div className="product-detail-section">
        {/* GALLERY */}
        <div className="product-gallery">
          {/* ẢNH THUMBNAILS */}
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

          {/* ẢNH CHÍNH */}
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
        </div>

        {/* INFO */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">{product.price.toLocaleString()}đ</div>
          <hr />

          {/* HIỂN THỊ CHỌN MÀU SẮC */}
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
                  // Dùng ảnh đại diện của màu đó làm nền cho ô chọn
                  style={{ backgroundImage: `url(${colorOption.image})` }}
                ></div>
              ))}
            </div>
          </div>

          {/* CHỌN SIZE */}
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

          {/* HÀNH ĐỘNG */}
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

          {/* MÔ TẢ */}
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
              {/* 💡 SỬA ĐỔI DƯỚI ĐÂY: Lấy URL từ đối tượng đầu tiên trong mảng images */}
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
