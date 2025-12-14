import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AIChatWidget from "./components/AIChatWidget";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import ShipperMainLayout from "./pages/ShipperMainLayout";
import UserProfile from "./pages/UserProfile";

function App() {
  const location = useLocation();
  const hideChat =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  const isShipperLayout = location.pathname.startsWith("/shipper/");

  const NotFound = () => (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Vui lòng kiểm tra lại đường dẫn.</p>
    </div>
  );

  return (
    <>
      {!isShipperLayout && <Header />}
      {!hideChat && !isShipperLayout && <AIChatWidget />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<Login />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/orders" element={<Order />} />

        <Route path="/shipper/*" element={<ShipperMainLayout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {<Footer />}
    </>
  );
}

export default App;
