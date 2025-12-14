import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import ProductSection from "../components/sections/ProductSection";

function ProductDetail() {
  const { sku } = useParams(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/${sku}`);
        setProduct(data);
        if (data && data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
        }
        if (data && data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
        }

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

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Đang tải chi tiết sản phẩm...</div>;
  }
  if (!product) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Không tìm thấy sản phẩm! (SKU: {sku})</div>;
  }
  const mainProductImage = product.images && product.images.length > 0 
                           ? product.images[0] 
                           : 'URL_ANH_MAC_DINH_NEU_KHONG_CO';

  return (
    <div className="product-detail-page container" style={{ padding: '20px 0' }}>
      
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ fontSize: '12px', marginBottom: '20px' }}>
          Trang chủ / Sản phẩm / {product.name}
      </div>

      <div className="product-info-wrap" style={{ display: 'flex', gap: '40px' }}>
        
        {/* Cột 1: Ảnh */}
        <div className="product-images" style={{ width: '45%', display: 'flex', gap: '15px' }}>
            <img 
                src={mainProductImage} 
                alt={product.name} 
                style={{ width: '100%', maxWidth: '400px' }} 
            />
        </div>

        {/* Cột 2: Thông tin chi tiết và Mua hàng */}
        <div className="product-details" style={{ width: '50%' }}>
          <h2>{product.name}</h2>
          <div style={{ fontSize: '30px', color: '#D50000', fontWeight: 'bold', margin: '15px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            {product.price.toLocaleString('vi-VN')} VNĐ
          </div>

          {/* Lựa chọn Màu Sắc */}
          <div className="color-selection" style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>Màu Sắc</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.colors.map((color) => (
                <div 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ 
                    padding: '5px 15px', 
                    border: color === selectedColor ? '2px solid black' : '1px solid #ccc', 
                    cursor: 'pointer', 
                    textAlign: 'center'
                  }}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>

          {/* Lựa chọn Cỡ */}
          <div className="size-selection" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <p style={{ fontWeight: 'bold' }}>Cỡ</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{ 
                    padding: '8px 15px', 
                    border: size === selectedSize ? '2px solid black' : '1px solid #ccc', 
                    cursor: 'pointer',
                    minWidth: '50px'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Số lượng và Thêm vào giỏ */}
          <div className="quantity-and-cart" style={{ marginBottom: '30px' }}>
            <button style={{ padding: '15px 30px', backgroundColor: 'black', color: 'white' }}>
              🛒 THÊM VÀO GIỎ HÀNG
            </button>
          </div>
          
          {/* Mô tả chi tiết */}
          <div className="product-description">
            <h4 style={{ fontWeight: 'bold' }}>Mô tả</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {product.description.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductSection
              title="SẢN PHẨM NỔI BẬT"
              initialSlug="ao-ni-thun-dai-tay" />
    </div>
  );
}

export default ProductDetail;