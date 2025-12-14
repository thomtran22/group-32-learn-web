import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const cardStyles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    transition: "transform 0.3s",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
    height: "40px",
    overflow: "hidden",
    lineHeight: "1.4",
    marginBottom: "5px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#DC3545",
    marginTop: "5px",
  },
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const imageUrl =
    product.images?.[0] || product.image || "https://via.placeholder.com/200";
  const linkTo = `/product/${product._id || product.id}`;

  return (
    <Link
      to={linkTo}
      style={{ ...cardStyles.card, ...(isHovered ? cardStyles.cardHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={product.name} style={cardStyles.image} />
      <div style={cardStyles.name}>{product.name}</div>
      <div style={cardStyles.price}>
        {product.price ? product.price.toLocaleString("vi-VN") : "Liên hệ"} VNĐ
      </div>
    </Link>
  );
};

export default ProductCard;
