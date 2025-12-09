// src/components/ship/ShipperSidebar.js

import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const ShipperSidebar = ({ width }) => {
  const sidebarStyle = {
    width: width,
    position: "fixed",
    height: "100%",
    backgroundColor: "#343a40", // Màu tối cho sidebar
    color: "white",
    paddingTop: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const logoStyle = {
    textAlign: "center",
    padding: "10px 0",
    fontSize: "1.5em",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#ffc107", // Màu logo nổi bật
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    textDecoration: "none",
    color: "#dee2e6",
    transition: "background-color 0.3s",
    fontSize: "0.95em",
  };

  const activeStyle = {
    backgroundColor: "#495057",
    color: "#ffffff",
    borderLeft: "4px solid #ffc107",
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <FaTruck style={{ marginRight: "5px" }} /> SHIPPER HUB
      </div>
      <nav>
        <NavLink
          to="/shipper"
          end
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaTachometerAlt style={{ marginRight: "10px" }} /> Dashboard
        </NavLink>
        <NavLink
          to="/shipper/orders"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaClipboardList style={{ marginRight: "10px" }} /> Đơn hàng đang giao
        </NavLink>
        <NavLink
          to="/shipper/stats"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaChartLine style={{ marginRight: "10px" }} /> Thống kê Hiệu suất
        </NavLink>
        <NavLink
          to="/shipper/profile"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaUserCircle style={{ marginRight: "10px" }} /> Hồ sơ Cá nhân
        </NavLink>

        {/* Dòng cách để đăng xuất */}
        <div style={{ marginTop: "50px" }}>
          <Link to="/logout" style={linkStyle}>
            <FaSignOutAlt style={{ marginRight: "10px" }} /> Đăng Xuất
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ShipperSidebar;
