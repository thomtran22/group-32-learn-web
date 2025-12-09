import React, { lazy, Suspense } from "react";
// ❌ KHÔNG IMPORT 'BrowserRouter as Router' Ở ĐÂY NỮA
import { Routes, Route } from "react-router-dom";

// --- Components dùng chung / Layout ---
import Header from "./components/Header";
import Footer from "./components/Footer";

// --- Lazy Loading cho các Trang chính ---
const UserProfile = lazy(() => import("./pages/UserProfile"));
const ShipperMainLayout = lazy(() => import("./pages/ShipperMainLayout"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

function App() {
  // 💡 LƯU Ý: Đã xóa <Router> bao quanh
  return (
    <Suspense fallback={<div>Đang tải giao diện...</div>}>
      <Routes>
        {/* -------------------------------------------------- */}
        {/* 1. ROUTE DÀNH CHO SHIPPER */}
        {/* -------------------------------------------------- */}
        <Route path="/shipper" element={<ShipperMainLayout />} />
        <Route path="/shipper/stats" element={<ShipperMainLayout />} />
        <Route path="/shipper/profile" element={<ShipperMainLayout />} />

        {/* -------------------------------------------------- */}
        {/* 2. ROUTE DÀNH CHO USER PROFILE (Khách hàng) */}
        {/* -------------------------------------------------- */}
        <Route
          // path="/profile"
          path="/"
          element={
            <>
              <Header />
              <UserProfile />
              <Footer />
            </>
          }
        />

        {/* <Route
          path="/"
          element={
            <div style={{ padding: "50px", textAlign: "center" }}>
              <h1>Chào mừng!</h1>
              <p>
                Vui lòng truy cập <a href="/profile">/profile</a> hoặc{" "}
                <a href="/shipper">/shipper</a>
              </p>
            </div>
          }
        /> */}

        {<Route path="/product/:id" element={<ProductDetail />} />}
      </Routes>
    </Suspense>
  );
}

export default App;
