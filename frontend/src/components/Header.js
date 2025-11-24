import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function Header() {
  return (
    <>
    <div className="top-header">
      <div className="container">
        <div className="inner-title">
          Hotline Mua Hàng: 0973 285 886 | Hotline CSKH: 1900 886 803 - Ext 1 | Email CSKH: 360boutique.vn@gmail.com
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
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            </form>
            <div className="header-actions">
              <Link to="/cart" className="btn-cart">Giỏ hàng</Link>
              <Link to="/login" className="btn-login">Đăng nhập/Đăng ký</Link>
            </div>
          </div>
          <nav className="inner-bottom">
            <ul>
              <li><Link to="/">Giới thiệu</Link></li>
              <li><Link to="/">Sản phẩm</Link></li>
              <li><Link to="/">Khuyến mại</Link></li>
              <li><Link to="/">Tin tức</Link></li>
              <li><Link to="/">Tuyển dụng</Link></li>
              <li><Link to="/">Hệ thống cửa hàng</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;
