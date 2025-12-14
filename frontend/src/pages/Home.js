// src/pages/Home.js
import React from "react";
import Section1 from "../components/background/BackGround";
import ProductSection from "../components/sections/ProductSection";
import Section4 from "../components/sections/Section4";
function Home() {
  return (
    <div>
      <Section1 />
      <ProductSection
        title="ÁO THU ĐÔNG"
        initialSlug="ao-ni-thun-dai-tay" />
      <ProductSection
        title="ÁO XUÂN HÈ"
        initialSlug="ao-ni-thun-dai-tay" />
      <ProductSection
        title="PHỤ KIỆN"
        initialSlug="ao-ni-thun-dai-tay" />
      <Section4 />
    </div>
  );
}

export default Home;
