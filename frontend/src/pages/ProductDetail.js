import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import ProductSection from "../components/sections/ProductSection";
import { apiAddToCart } from "../services/cartApi";

function ProductDetail() {
  const { sku } = useParams(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/${sku}`);
        
        // Danh sách Màu và Size duy nhất
        const uniqueColors = data.variants ? [...new Set(data.variants.map(v => v.color))] : [];
        const uniqueSizes = data.variants ? [...new Set(data.variants.map(v => v.size))] : [];

        // Gộp dữ liệu đã xử lý vào state product
        setProduct({
          ...data,
          displayColors: uniqueColors,
          displaySizes: uniqueSizes
        });

        // Tự động chọn giá trị đầu tiên nếu có
        if (uniqueColors.length > 0) setSelectedColor(uniqueColors[0]);
        if (uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0]);

      } catch (error) {
        console.error(`Lỗi khi fetch sản phẩm ${sku}:`, error);
        setProduct(null); 
      } finally {
        setLoading(false);
      }
    };
    if (sku) {
        fetchProduct();
    }
  }, [sku]);

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích cỡ!");
      return;
    }

    setAdding(true);
    try {
      const cartData = {
        productId: product._id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
      };

      await apiAddToCart(cartData);
      alert("Đã thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
      alert(error.response?.data?.message || "Vui lòng đăng nhập để thực hiện thao tác này!");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Đang tải chi tiết sản phẩm...</div>;
  }
  
  if (!product) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Không tìm thấy sản phẩm! (SKU: {sku})</div>;
  }

  const mainProductImage = product.images?.[0] || 'https://via.placeholder.com/400';

  return (
    <div className="product-detail-page container" style={{ padding: '20px 0' }}>
      <div className="breadcrumb" style={{ fontSize: '12px', marginBottom: '20px' }}>
          Trang chủ / Sản phẩm / {product.name}
      </div>

      <div className="product-info-wrap" style={{ display: 'flex', gap: '40px' }}>
        {/* Cột 1: Ảnh */}
        <div className="product-images" style={{ width: '45%' }}>
            <img 
                src={mainProductImage} 
                alt={product.name} 
                style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} 
            />
        </div>

        {/* Cột 2: Thông tin chi tiết */}
        <div className="product-details" style={{ width: '50%' }}>
          <h2>{product.name}</h2>
          <div style={{ fontSize: '30px', color: '#D50000', fontWeight: 'bold', margin: '15px 0' }}>
            {product.price?.toLocaleString('vi-VN')} VNĐ
          </div>
          <div className="color-selection" style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>Màu Sắc</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.displayColors?.map((color) => (
                <div 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ 
                    padding: '5px 15px', 
                    border: color === selectedColor ? '2px solid black' : '1px solid #ccc', 
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>

          {/* Lựa chọn Cỡ */}
          <div className="size-selection" style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>Cỡ</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.displaySizes?.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{ 
                    padding: '8px 15px', 
                    border: size === selectedSize ? '2px solid black' : '1px solid #ccc', 
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    minWidth: '50px'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Số lượng và Button */}
          <div className="quantity-and-cart" style={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
            <div>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Số lượng</p>
                <input 
                    type="number" 
                    min="1"
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '60px', padding: '10px', textAlign: 'center' }}
                />
            </div>
            
            <button 
                onClick={handleAddToCart}
                disabled={adding}
                style={{ 
                    flex: 1,
                    padding: '15px', 
                    backgroundColor: adding ? '#666' : 'black', 
                    color: 'white', 
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: adding ? 'not-allowed' : 'pointer'
                }}
            >
              {adding ? 'ĐANG THÊM...' : 'THÊM VÀO GIỎ HÀNG'}
            </button>
          </div>
          
          {/* Mô tả */}
          <div className="product-description" style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h4 style={{ fontWeight: 'bold' }}>Mô tả sản phẩm</h4>
            <ul style={{ paddingLeft: '20px' }}>
              {product.description?.map((line, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {product.category && product.category.slug ? (
        <ProductSection 
          title="SẢN PHẨM LIÊN QUAN" 
          initialSlug={product.category.slug} 
        />
      ) : (
        <ProductSection title="SẢN PHẨM MỚI" initialSlug="ao-nam" />
      )}
    </div>
  );
}

export default ProductDetail;