import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import LoginModal from "./LoginModal";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaTruck,
  FaBell,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import "../assets/css/style.css";
import "../assets/css/detail.css";

function Header({ role = "customer" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const isShipper = role === "shipper";
  const isCustomer = role === "customer";

  const closeModal = () => setIsModalOpen(false);

  const handleToggleStatus = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      console.log("Shipper chuyển sang: ONLINE");
    } else {
      console.log("Shipper chuyển sang: OFFLINE");
    }
  };

  const renderShipperMiddle = () => (
    <div
      className="shipper-status"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        fontWeight: "bold",
        marginLeft: "20px",
      }}
    >
      <div
        onClick={handleToggleStatus}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: isOnline ? "#28a745" : "#dc3545",
          fontSize: "16px",
        }}
        title={`Chuyển trạng thái sang ${
          isOnline ? "NGOẠI TUYẾN" : "HOẠT ĐỘNG"
        }`}
      >
        <FaTruck style={{ marginRight: "8px", fontSize: "1.2em" }} />
        {isOnline ? (
          <>
            <FaToggleOn style={{ fontSize: "1.8em", marginRight: "5px" }} />{" "}
            ĐANG HOẠT ĐỘNG
          </>
        ) : (
          <>
            <FaToggleOff style={{ fontSize: "1.8em", marginRight: "5px" }} />{" "}
            NGOẠI TUYẾN
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="top-header">
        <div className="container">
          <div className="inner-title">
            Hotline: 0973 285 886 |{" "}
            {isShipper
              ? "Kênh Đối Tác Vận Chuyển"
              : "Hotline CSKH: 1900 886 803"}
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <div className="inner-wrap">
            <div
              className="inner-top"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={isShipper ? "/shipper" : "/"} className="inner-logo">
                  <img src={logo} alt="Logo" />
                </Link>

                {isShipper && renderShipperMiddle()}
              </div>

              {isCustomer && (
                <form
                  className="inner-form"
                  style={{ flexGrow: 1, maxWidth: "500px", margin: "0 20px" }}
                >
                  <button className="btn-search">
                    <FaSearch />
                  </button>
                  <input type="text" placeholder="Bạn đang tìm gì..." />
                </form>
              )}

              <div
                className="header-actions"
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                {isCustomer && (
                  <Link to="/cart" className="btn-cart" title="Giỏ hàng">
                    <FaShoppingCart className="btn-cart-1" />
                  </Link>
                )}

                {isShipper && (
                  <Link
                    to="/shipper/notifications"
                    className="btn-cart"
                    style={{ cursor: "pointer", padding: "10px" }}
                  >
                    <FaBell className="btn-cart-1" title="Thông báo" />
                  </Link>
                )}

                <div
                  className="btn-login"
                  onClick={() => setIsModalOpen(true)}
                  title={isShipper ? "Hồ sơ đối tác" : "Đăng nhập / Tài khoản"}
                >
                  <FaUser className="btn-user" />
                </div>
              </div>
            </div>

            {isCustomer && (
              <nav className="inner-bottom">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="/products">Sản phẩm</Link>
                  </li>
                  <li>
                    <Link to="/promotions">Khuyến mại</Link>{" "}
                  </li>
                  <li>
                    <Link to="/news">Tin tức</Link>
                  </li>
                  <li>
                    <Link to="/careers">Tuyển dụng</Link>
                  </li>
                  <li>
                    <Link to="/stores">Hệ thống cửa hàng</Link>{" "}
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>

      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </>
  );
}

export default Header;
