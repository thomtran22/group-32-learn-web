import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section1 from "../components/background/BackGround";
import { ProductSection } from "../components/sections/ProductSection";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu user là Shipper thì redirect
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'shipper') {
      navigate('/shipper', { replace: true });
      return;
    }
  }, [navigate]);

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
    </div>
  );
}

export default Home;