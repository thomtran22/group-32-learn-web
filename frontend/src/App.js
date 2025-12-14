// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout"
import PaymentResult from './pages/PaymentResult'; 
import Orders from './pages/Orders';
import ProductDetails from "./pages/ProductDetail";
import ShipperMainLayout from "./pages/ShipperMainLayout";
import UserProfile from "./pages/UserProfile";

import { CartProvider } from './context/CartContext'; 

import "./assets/css/style.css";
import "./assets/css/globals.css";
import "./assets/css/cart.css";
import "./assets/css/checkout.css";
import "./assets/css/orders.css";
import "./assets/css/payment-result.css";
import "./assets/css/detail.css"

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/shipper/*" element={<ShipperMainLayout />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
