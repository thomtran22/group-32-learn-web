import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import PaymentResult from './pages/PaymentResult'; 
import ProductDetail from './pages/ProductDetail';
import ProductListPage from "./pages/ProductListPage";
import ShipperMainLayout from "./pages/ShipperMainLayout";
import UserProfile from "./pages/UserProfile";
import ResetPassword from "./pages/ResetPassword";

import { CartProvider } from './context/CartContext'; 
import "./assets/css/globals.css";
import "./assets/css/style.css";
import "./assets/css/cart.css";
import "./assets/css/checkout.css";
import "./assets/css/orders.css";
import "./assets/css/payment-result.css";
import "./assets/css/detail.css"
import './App.css';

function App() {
  return (
     <Router>
      <CartProvider>
        <Toaster position="top-right" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/shipper/*" element={<ShipperMainLayout />} />
          <Route path="/products/:sku" element={<ProductDetail />} />
          <Route path="/category/:categorySlug" element={<ProductListPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Contact/>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;