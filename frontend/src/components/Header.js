import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import LoginModal from "./LoginModal"; // Giả định file này tồn tại
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaTruck,
  FaBell,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import "../assets/css/style.css"; // Giả định file CSS
import "../assets/css/detail.css"; // Giả định file CSS

// Thêm prop 'role' (mặc định là 'user')
function Header({ role = "user" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State giả lập trạng thái Shipper (chỉ dùng trong chế độ Shipper)
  const [isOnline, setIsOnline] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  // Xử lý chuyển đổi trạng thái (giả lập)
  const handleToggleStatus = () => {
    setIsOnline(!isOnline);
    // TODO: Gọi API cập nhật trạng thái online/offline của Shipper
  };

  // --- Nội dung Hiển thị Trạng thái Shipper (Middle Section) ---
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
      {/* 1. TOP HEADER (Hotline) */}
      <div className="top-header">
        <div className="container">
          <div className="inner-title">
            Hotline: 0973 285 886 |{" "}
            {role === "shipper"
              ? "Kênh Đối Tác Vận Chuyển"
              : "Hotline CSKH: 1900 886 803"}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="header">
        <div className="container">
          <div className="inner-wrap">
            {/* inner-top: Dùng flex để đẩy các khối ra hai bên */}
            <div
              className="inner-top"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* === VÙNG BÊN TRÁI: Logo + Trạng thái Shipper === */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  to={role === "shipper" ? "/shipper" : "/"}
                  className="inner-logo"
                >
                  <img src={logo} alt="Logo" />
                </Link>

                {/* Chỉ hiện Trạng thái ngay cạnh Logo khi ở chế độ Shipper */}
                {role === "shipper" && renderShipperMiddle()}
              </div>

              {/* === VÙNG GIỮA: Tìm kiếm (Chỉ hiện cho User) === */}
              {role === "user" && (
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

              {/* === VÙNG BÊN PHẢI: Actions (Giỏ hàng/Thông báo/User) === */}
              <div
                className="header-actions"
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                {/* 1. Giỏ hàng (Chỉ hiện cho User) */}
                {role === "user" && (
                  <Link to="/cart" className="btn-cart" title="Giỏ hàng">
                    <FaShoppingCart className="btn-cart-1" />
                  </Link>
                )}

                {/* 2. Thông báo (Chỉ hiện cho Shipper) */}
                {role === "shipper" && (
                  <div
                    className="btn-cart"
                    style={{ cursor: "pointer", padding: "10px" }}
                  >
                    <FaBell className="btn-cart-1" title="Thông báo" />
                  </div>
                )}

                {/* 3. Icon User / Đăng nhập (Chung) */}
                <div
                  className="btn-login"
                  onClick={() => setIsModalOpen(true)}
                  title={role === "shipper" ? "Hồ sơ cá nhân" : "Đăng nhập"}
                >
                  <FaUser className="btn-user" />
                </div>
              </div>
            </div>

            {/* 3. MENU DƯỚI: Chỉ hiện cho User */}
            {role === "user" && (
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
            )}
          </div>
        </div>
      </header>

      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </>
  );
}

export default Header;
