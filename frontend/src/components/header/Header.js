import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import LoginModal from "../login/LoginModal";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Search from "../search/Search";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const { cartCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get("https://group-32-learn-web-8hmv.onrender.com/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // localStorage.removeItem("token"); // Optional: clear token if invalid
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold tracking-[0.1em] transition-all duration-300 uppercase py-1 ${isActive
      ? "text-red-600 after:w-full"
      : "text-gray-600 hover:text-red-600 after:w-0"
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full`;

  const handleUserClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen(true);
      return;
    }

    // Nếu đã có thông tin user trong state thì dùng luôn để navigate
    if (currentUser) {
      switch (currentUser.role) {
        case "admin": navigate("/admin"); break;
        case "shipper": navigate("/shipper"); break;
        default: navigate("/profile"); break;
      }
      return;
    }

    try {
      const response = await axios.get("https://group-32-learn-web-8hmv.onrender.com/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { role } = response.data;
      switch (role) {
        case "admin": navigate("/admin"); break;
        case "shipper": navigate("/shipper"); break;
        default: navigate("/profile"); break;
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      toast.error("Phiên đăng nhập đã hết hạn.");
      setIsModalOpen(true);
    }
  };

  const handleCartClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen(true);
      return;
    }
    try {
      const response = await axios.get("https://group-32-learn-web-8hmv.onrender.com/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { role } = response.data;
      if (role === "customer") {
        navigate("/cart");
      } else {
        toast.error("Tài khoản quản trị/shipper không thể mua hàng.");
      }
    } catch (error) {
      console.error("Cart token check failed:", error);
      localStorage.removeItem("token");
      toast.error("Phiên đăng nhập hết hạn.");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
          <div className="inner-wrap py-2">

            {/* Hàng 1: Logo - Search - Icon */}
            <div className="flex items-center justify-between gap-4 md:gap-10">
              <Link
                to="/"
                className="shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img src={logo} alt="Logo" className="w-[100px] md:w-[120px]" />
              </Link>

              {/* Search */}
              <div className="hidden md:block flex-1 max-w-xl">
                <Search />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:gap-5">
                {/* CART ICON */}
                <div
                  onClick={handleCartClick}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors relative group cursor-pointer"
                >
                  <FaShoppingCart className="text-xl md:text-2xl transition-transform group-hover:scale-110" />
                  <AnimatePresence mode="popLayout">
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-bold shadow-md ring-2 ring-white"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Icon */}
                <div
                  className="flex flex-col items-center justify-center gap-0.5 group p-1 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer min-w-[60px]"
                  onClick={handleUserClick}
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-red-100 transition-colors">
                    <FaUser className="text-sm md:text-xl text-gray-600 group-hover:text-red-600" />
                  </div>
                  {currentUser && (
                    <span 
                        className="hidden md:block text-[11px] font-semibold text-gray-700 group-hover:text-red-600 max-w-[90px] truncate leading-none text-center"
                        title={currentUser.fullName || currentUser.name}
                    >
                      {currentUser.fullName || currentUser.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation: Hàng 2 */}
            <nav className="mt-1 border-t border-gray-100 pt-1">
              <ul className="flex justify-between items-center gap-4 md:gap-10 list-none p-0 m-0">
                <li>
                  <NavLink to="/" end className={navLinkClass}>
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/ao-nam" className={navLinkClass}>
                    Áo Nam
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/quan-nam" className={navLinkClass}>
                    Quần Nam
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/phu-kien" className={navLinkClass}>
                    Phụ kiện
                  </NavLink>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </header>
      {isModalOpen && <LoginModal closeModal={closeModal} onLoginSuccess={(user) => { setCurrentUser(user); fetchCurrentUser(); }} />}
    </>
  );
}
export default Header;