import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  if (!product) return null; 

  return (
    <div className="product-item">
      <div className="inner-image">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="inner-content">
        <h3 className="inner-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="inner-price">{product.price} VNĐ</div>
      </div>
    </div>
  );
}

export default ProductCard;