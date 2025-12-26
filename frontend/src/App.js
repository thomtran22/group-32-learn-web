import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import PaymentResult from "./pages/PaymentResult";
import ProductDetail from "./pages/ProductDetail";
import ProductListPage from "./pages/ProductListPage";
import ShipperMainLayout from "./pages/ShipperMainLayout";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin"
import ResetPassword from "./pages/ResetPassword";
import AIChatWidget from "./components/AIChatWidget";

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
      {/* Outlet là nơi nội dung các trang con (Home, Cart...) sẽ hiển thị */}
      <main>
        <Outlet />
      </main>
      <AIChatWidget /> {/* Đã thêm Chatbot vào đây */}
      <Contact/>
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
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Routes>
          {/* ROUTE ADMIN - Không hiện Header/Footer/Chat của khách */}
          <Route path="/admin/*" element={<Admin />} />

          {/* ROUTE SHIPPER - Không hiện Header/Footer/Chat của khách */}
          <Route path="/shipper/*" element={<ShipperMainLayout />} />

          {/* Giao diện khách hàng (Bọc trong PublicLayout) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/products/:sku" element={<ProductDetail />} />
            <Route path="/category/:categorySlug" element={<ProductListPage />} />
            
            {/* Đã thêm trang Reset Password từ code mới vào đây */}
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;