import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  if (!product) return null; 

  // Lấy ID sản phẩm (hỗ trợ nhiều format: id, productId, _id)
  const productId = product.id || product.productId || product._id;
  
  // Lấy ảnh sản phẩm (hỗ trợ nhiều format)
  let productImage = product.image;
  if (!productImage && product.images && product.images.length > 0) {
    // Nếu images là mảng objects có url
    if (typeof product.images[0] === 'object' && product.images[0].url) {
      productImage = product.images[0].url;
    } else if (typeof product.images[0] === 'string') {
      productImage = product.images[0];
    }
  }
  
  // Format giá
  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toLocaleString('vi-VN') 
    : product.price;

  return (
    <div className="product-item">
      <div className="inner-image">
        <Link to={`/products/${productId}`}>
          <img 
            src={productImage || "https://via.placeholder.com/150"} 
            alt={product.name || "Sản phẩm"} 
          />
        </Link>
      </div>
      <div className="inner-content">
        <h3 className="inner-title">
          <Link to={`/products/${productId}`}>{product.name || "Sản phẩm"}</Link>
        </h3>
        <div className="inner-price">{formattedPrice} VNĐ</div>
      </div>
    </div>
  );
}

export default ProductCard;