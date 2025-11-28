import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword"; 
import AIChatWidget from "./components/AIChatWidget";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import "./assets/css/style.css";

function App() {
  const location = useLocation();
  const hideChat = location.pathname === "/login";

  return (
    <>
      <Header />
      {!hideChat && <AIChatWidget />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
