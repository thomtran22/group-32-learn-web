import React from "react";
import item1 from "../assets/images/item-1.jpg";
import item2 from "../assets/images/item-2.jpg";
import item3 from "../assets/images/item-3.jpg";
import item4 from "../assets/images/item-4.jpg";

function Section3() {
  const newItems = [
    { id: 1, name: "Áo polo nam POHTK401", price: "479.000", image: item1 },
    { id: 2, name: "Áo polo nam POHTK401", price: "479.000", image: item2 },
    { id: 3, name: "Áo polo nam POHTK401", price: "479.000", image: item3 },
    { id: 4, name: "Áo polo nam POHTK401", price: "479.000", image: item4 },
  ];

  return (
    <div className="section-3">
      <div className="container">
        <h2 className="inner-title">HÀNG MỚI VỀ</h2>
        <div className="inner-wrap">
          {newItems.map((item) => (
            <div className="product-item" key={item.id}>
              <div className="inner-image">
                <a href="#"><img src={item.image} alt={item.name} /></a>
              </div>
              <div className="inner-content">
                <h3 className="inner-title">
                  <a href="#">{item.name}</a>
                </h3>
                <div className="inner-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section3;
