import React, { useState } from "react";
// 💡 THÊM IMPORT BrowserRouter
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import "./assets/css/detail.css";
import "./assets/css/style.css";

function App() {
  const [selectedProductId, setSelectedProductId] = useState("POHTK404");

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 💡 BỌC TOÀN BỘ ỨNG DỤNG TRONG <BrowserRouter>
    <BrowserRouter>
      <div className="style">
        <Header />
        <ProductDetail
          productId={selectedProductId}
          onProductSelect={handleProductSelect}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
