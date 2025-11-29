import React from "react";
import PixelTransition from "./PixelTransition";
import "../assets/css/style.css";
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
                <PixelTransition
                  firstContent={
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  }
                  secondContent={
                    <div className="pixel-second-content">
                      <p className="pixel-second-name">
                        {product.name}
                      </p>
                      <p className="pixel-second-price">
                        {product.price} ₫
                      </p>
                      <span className="pixel-second-cta">
                        Xem chi tiết
                      </span>
                    </div>
                  }
                  gridSize={7}
                  pixelColor="#ffffff"
                  once={false}
                  animationStepDuration={0.4}
                  className="product-pixel-card"
                />
              </div>

              <div className="inner-content">
                <h3 className="inner-title">
                  <a href="#">{product.name}</a>
                </h3>
                <div className="inner-price">{product.price} ₫</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section2;
