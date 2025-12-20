import React from "react";
import Section1 from "../components/background/BackGround";
import { ProductSection } from "../components/sections/ProductSection"; // Đảm bảo dùng ngoặc nhọn nếu export const
import Section4 from "../components/sections/Section4";
import Contact from "../components/contact/Contact"

function Home() {
  return (
    <div>
      <Section1 />
      
      {/* ÁO NAM */}
      <ProductSection 
        title="ÁO NAM" 
        parentSlug="ao-nam" 
        initialSlug="ao-khoac" 
      />

      {/* QUẦN NAM */}
      <ProductSection 
        title="QUẦN NAM" 
        parentSlug="quan-nam" 
        initialSlug="quan-jeans" 
      />

      {/* PHỤ KIỆN */}
      <ProductSection 
        title="PHỤ KIỆN" 
        parentSlug="phu-kien"
        initialSlug="balo" 
      />

      {/* <Section4 /> */}
    </div>
  );
}

export default Home;