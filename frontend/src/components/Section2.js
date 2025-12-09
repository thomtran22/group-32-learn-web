import React from "react";
import { Link } from "react-router-dom";
import product1 from "../assets/images/product-1.jpg";
import product2 from "../assets/images/product-2.jpg";
import product3 from "../assets/images/product-3.jpg";
import product4 from "../assets/images/product-4.jpg";

function Section2() {
  const products = [
    { id: 1, name: "Áo polo nam POHTK401", price: "479.000", image: product1 },
    { id: 2, name: "Áo polo nam POHTK401", price: "479.000", image: product2 },
    { id: 3, name: "Áo polo nam POHTK401", price: "479.000", image: product3 },
    { id: 4, name: "Áo polo nam POHTK401", price: "479.000", image: product4 },
  ];

  return (
    <div className="section-2">
      <div className="container">
        <h2 className="inner-title">SẢN PHẨM BÁN CHẠY</h2>
        <div className="inner-wrap">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="inner-image">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>
              <div className="inner-content">
                <h3 className="inner-title">
                  <Link to={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <div className="inner-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section2;
