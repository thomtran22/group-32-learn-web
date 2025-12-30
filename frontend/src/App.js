import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentResult from "./pages/PaymentResult";
import ProductDetail from "./pages/ProductDetail";
import ProductListPage from "./pages/ProductListPage";
import ShipperMainLayout from "./pages/ShipperMainLayout";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin"
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AIChatWidget from "./components/AIChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";

import { CartProvider } from "./context/CartContext";
import "./assets/css/globals.css";
import "./assets/css/style.css";
import "./assets/css/cart.css";
import "./assets/css/checkout.css";
import "./assets/css/orders.css";
import "./assets/css/payment-result.css";
import "./assets/css/detail.css";
import "./App.css";

// Layout cho khách hàng (có Header, Footer, Chatbot)
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <AIChatWidget />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
        />
        <Routes>
          {/* --- ADMIN ROUTES (Chỉ Admin) --- */}
          <Route path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* --- SHIPPER ROUTES (Chỉ Shipper) --- */}
          <Route path="/shipper/*"
            element={
              <ProtectedRoute allowedRoles={['shipper']}>
                <ShipperMainLayout />
              </ProtectedRoute>
            }
          />

          {/* --- PUBLIC & CUSTOMER ROUTES --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={
              <ProtectedRoute isPublic={true}>
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/products/:sku" element={
              <ProtectedRoute isPublic={true}>
                <ProductDetail />
              </ProtectedRoute>
            } />

            <Route path="/category/:categorySlug" element={
              <ProtectedRoute isPublic={true}>
                <ProductListPage />
              </ProtectedRoute>
            } />

            <Route path="/reset-password" element={
              <ProtectedRoute isPublic={true}>
                <ResetPassword />
              </ProtectedRoute>
            } />


            {/* === CÁC TRANG RIÊNG TƯ (Mặc định isPublic={false}) === */}
            {/* Logic: Chỉ Customer (đã login) xem được. Guest bị bắt login. Admin/Shipper bị đá */}

            <Route path="/cart" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Cart />
              </ProtectedRoute>
            } />

            <Route path="/checkout" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Checkout />
              </ProtectedRoute>
            } />

            <Route path="/payment-result" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <PaymentResult />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <UserProfile />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;