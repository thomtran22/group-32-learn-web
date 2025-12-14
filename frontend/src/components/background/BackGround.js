// src/components/Section1.js
import React from "react";
import bg from "../../assets/images/background.jpg";

function BackGround() {
  return (
    <div className="section-1">
      <div className="container">
        <img src={bg} alt="Background" />
      </div>
    </div>
  );
}

export default BackGround;
