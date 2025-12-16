import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

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
              {!user ? (
                <Link to="/login" className="btn-login">Đăng nhập/Đăng ký</Link>
              ) : (
                <>
                  <span className="btn-login" style={{ padding: '10px 14px', display: 'inline-block' }}>{user.fullName || 'Tài khoản'}</span>
                  <button onClick={handleLogout} className="btn-login" style={{ background: 'transparent', color: '#000', border: '1px solid #ddd' }}>Đăng xuất</button>
                </>
              )}
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
