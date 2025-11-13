import React from "react";

const Header = () => {
  return (
    <header className="thuong-header">
      <div className="thuong-header-container">
        <div className="thuong-logo">
          <a href="index.html">
            <img src="./asset/images/image-1-2.png" alt="360 Boutique" />
          </a>
        </div>
        <nav className="thuong-nav">
          <a href="#">TRANG CHỦ</a>
          <a href="#">SẢN PHẨM</a>
          <a href="#">BỘ SƯU TẬP</a>
          <a href="#">TIN TỨC</a>
          <a href="#">LIÊN HỆ</a>
        </nav>
        <div className="thuong-icons">
          <div className="thuong-search">
            <input type="text" placeholder="Tìm kiếm..." />
            <i className="fas fa-search thuong-search-icon"></i>
          </div>
          <i className="far fa-user"></i>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
