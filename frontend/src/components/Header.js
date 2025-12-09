import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import LoginModal from "./LoginModal";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="top-header">
        <div className="container">
          <div className="inner-title">
            Hotline Mua Hàng: 0973 285 886 | Hotline CSKH: 1900 886 803 - Ext 1
            | Email CSKH: 360boutique.vn@gmail.com
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="inner-wrap">
            <div className="inner-top">
              <Link to="/" className="inner-logo">
                <img src={logo} alt="Logo" />
              </Link>
              <form className="inner-form">
                <button className="btn-search">
                  <FaSearch />
                </button>
                <input type="text" placeholder="Bạn đang tìm gì..." />
              </form>
              <div className="header-actions">
                <Link to="/cart" className="btn-cart">
                  <FaShoppingCart className="btn-cart-1" />
                </Link>
                <div className="btn-login" onClick={() => setIsModalOpen(true)}>
                  <FaUser className="btn-user" />
                </div>
              </div>
            </div>
            <nav className="inner-bottom">
              <ul>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/">Khuyến mại</Link>
                </li>
                <li>
                  <Link to="/">Tin tức</Link>
                </li>
                <li>
                  <Link to="/">Tuyển dụng</Link>
                </li>
                <li>
                  <Link to="/">Hệ thống cửa hàng</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </>
  );
}

export default Header;
