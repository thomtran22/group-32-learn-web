import React, { lazy, Suspense } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import Header from "../components/Header";
import {
  FaTachometerAlt,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";

// Lazy Load Content (Giữ nguyên)
const ShipperDashboardContent = lazy(() =>
  import("../components/Ship/ShipperDashboardContent")
);
const ShipperStatisticsContent = lazy(() =>
  import("../components/Ship/ShipperStatisticsContent")
);
const ShipperProfileContent = lazy(() =>
  import("../components/Ship/ShipperProfileContent")
);

// Định nghĩa chiều rộng và chiều cao cố định
const sidebarWidth = "250px";
const HEADER_HEIGHT = "100px"; // Chiều cao ước tính của Header

// ==================================================
// 1. CSS CHO LAYOUT
// ==================================================

const containerStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "0 15px",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  gap: "30px",
};

const sidebarWrapperStyle = {
  // Style cho wrapper chứa Sidebar (nền trắng)
  flex: "0 0 250px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRight: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  minHeight: "calc(100vh - 100px - 80px)", // Chiều cao tối thiểu: 100vh - Header - margin top/bottom (40*2)
  alignSelf: "flex-start",
};

const contentStyle = {
  flexGrow: 1,
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

// ==================================================
// 2. COMPONENT SIDEBAR (ĐÃ GỘP VÀ CHỈNH SỬA CHO NỀN TRẮNG)
// ==================================================

const ShipperSidebar = () => {
  // --- Styles Inline ---
  const sidebarInnerStyle = {
    width: "100%",
    backgroundColor: "transparent",
    color: "#343a40",
    paddingTop: "0",
  };

  const menuHeaderStyle = {
    textAlign: "left",
    padding: "15px 0",
    fontSize: "1em",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#6c757d",
    textTransform: "uppercase",
    borderBottom: "1px solid #eee",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 10px",
    justifyContent: "flex-start",
    textDecoration: "none",
    color: "#343a40",
    transition: "background-color 0.3s",
    fontSize: "0.95em",
    borderLeft: "4px solid transparent",
  };

  const activeStyle = {
    backgroundColor: "#e9ecef",
    color: "#dc3545",
    fontWeight: "bold",
    borderLeft: "4px solid #dc3545",
  };
  // ----------------------

  return (
    <div style={sidebarInnerStyle}>
      {/* Tiêu đề MENU */}
      <div style={menuHeaderStyle}>MENU</div>

      <nav>
        {/* 1. Dashboard */}
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

        {/* 2. Đơn hàng đang giao */}
        <NavLink
          to="/shipper/orders/active"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaClipboardList style={{ marginRight: "10px" }} /> Đơn hàng đang giao
        </NavLink>

        {/* 3. Thống kê Hiệu suất */}
        <NavLink
          to="/shipper/stats"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaChartLine style={{ marginRight: "10px" }} /> Thống kê Hiệu suất
        </NavLink>

        {/* 4. Hồ sơ Cá nhân */}
        <NavLink
          to="/shipper/profile"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <FaUserCircle style={{ marginRight: "10px" }} /> Hồ sơ Cá nhân
        </NavLink>

        {/* 5. Đăng Xuất */}
        <div style={{ marginTop: "50px" }}>
          <Link to="/logout" style={linkStyle}>
            <FaSignOutAlt style={{ marginRight: "10px" }} /> Đăng Xuất
          </Link>
        </div>
      </nav>
    </div>
  );
};

// ==================================================
// 3. MAIN LAYOUT (ÁP DỤNG FIXED HEADER VÀ LAYOUT MỚI)
// ==================================================

const ShipperMainLayout = () => {
  const location = useLocation();

  // Hàm chọn nội dung (giữ nguyên logic cũ)
  const getActiveContent = (pathname) => {
    if (pathname.includes("/shipper/profile")) return <ShipperProfileContent />;
    if (pathname.includes("/shipper/stats"))
      return <ShipperStatisticsContent />;
    if (pathname.includes("/shipper/orders/active"))
      return <div>Nội dung Đơn hàng đang giao</div>;
    if (pathname === "/shipper" || pathname.endsWith("/shipper/"))
      return <ShipperDashboardContent />;
    return <div>Không tìm thấy trang.</div>;
  };

  const globalWrapperStyle = {
    backgroundColor: "#f4f7f9",
    minHeight: "100vh",
    // Thêm padding-top để bù trừ cho Header cố định
    paddingTop: HEADER_HEIGHT,
  };

  return (
    <div style={globalWrapperStyle}>
      {/* 1. HEADER CỐ ĐỊNH (FIXED) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Header role="shipper" />
      </div>

      {/* 2. BODY CONTAINER: ÁP DỤNG containerStyle */}
      <div style={containerStyle}>
        {/* Sidebar Wrapper: ÁP DỤNG sidebarWrapperStyle */}
        <div style={sidebarWrapperStyle}>
          <ShipperSidebar />
        </div>

        {/* Nội dung chính: ÁP DỤNG contentStyle */}
        <div style={contentStyle}>
          <Suspense fallback={<div>Đang tải nội dung...</div>}>
            {getActiveContent(location.pathname)}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ShipperMainLayout;
