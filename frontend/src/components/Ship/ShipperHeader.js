// src/components/ship/ShipperHeader.js

import React, { useState } from "react";
import { FaBell, FaToggleOn, FaToggleOff, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShipperHeader = ({ width, height }) => {
  const [isOnline, setIsOnline] = useState(true);
  const shipperName = "Nguyễn Văn A"; // Dữ liệu giả định

  const handleToggleStatus = () => {
    setIsOnline((prev) => !prev);
    // TODO: Gọi API để cập nhật trạng thái online/offline
  };

  const headerStyle = {
    position: "fixed",
    left: width, // Bắt đầu sau Sidebar
    height: height,
    right: 0,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    zIndex: 999,
  };

  const statusStyle = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: isOnline ? "#28a745" : "#dc3545",
    fontSize: "0.9em",
  };

  return (
    <div style={headerStyle}>
      {/* Vùng Tiêu đề (Có thể thêm breadcrumb ở đây) */}
      <h2 style={{ fontSize: "1.2em", margin: 0, color: "#333" }}>
        Dashboard Shipper
      </h2>

      {/* Vùng Điều khiển và Thông tin */}
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        {/* Nút Chuyển đổi Trạng thái */}
        <div onClick={handleToggleStatus} style={statusStyle}>
          Trạng thái:
          {isOnline ? (
            <FaToggleOn style={{ fontSize: "2em", marginLeft: "5px" }} />
          ) : (
            <FaToggleOff style={{ fontSize: "2em", marginLeft: "5px" }} />
          )}
          <span style={{ marginLeft: "5px" }}>
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>

        {/* Thông báo */}
        <FaBell
          style={{ fontSize: "1.2em", cursor: "pointer", color: "#6c757d" }}
          title="Thông báo"
        />

        {/* Tên Shipper & Profile Link */}
        <Link
          to="/shipper/profile"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#333",
          }}
        >
          <FaUser style={{ marginRight: "8px", fontSize: "1.2em" }} />
          <span style={{ fontWeight: "bold" }}>{shipperName}</span>
        </Link>
      </div>
    </div>
  );
};

export default ShipperHeader;
