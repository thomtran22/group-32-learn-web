// src/pages/ShipperMainLayout.js

import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import ShipperSidebar from "../components/Ship/ShipperSidebar";
import ShipperHeader from "../components/Ship/ShipperHeader";

// Lazy Load các Component Nội dung
const ShipperDashboardContent = lazy(() =>
  import("../components/Ship/ShipperDashboardContent")
);
const ShipperStatisticsContent = lazy(() =>
  import("../components/Ship/ShipperStatisticsContent")
);
const ShipperProfileContent = lazy(() =>
  import("../components/Ship/ShipperProfileContent")
);

const sidebarWidth = "250px";
const headerHeight = "70px"; // Điều chỉnh để khớp với Header

const layoutStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Roboto, sans-serif",
  backgroundColor: "#f4f7f9",
};

const contentAreaStyle = {
  flexGrow: 1,
  marginLeft: sidebarWidth, // Đẩy khu vực nội dung sau Sidebar
  paddingTop: headerHeight, // Đẩy nội dung xuống dưới Header cố định
};

// Hàm quyết định nội dung nào sẽ được hiển thị dựa trên URL
const getActiveContent = (pathname) => {
  // 1. Kiểm tra /profile
  if (pathname.includes("/shipper/profile")) {
    return <ShipperProfileContent />;
  }
  // 2. Kiểm tra /stats
  if (pathname.includes("/shipper/stats")) {
    return <ShipperStatisticsContent />;
  }
  // 3. Mặc định là Trang Chủ (Dashboard) - /shipper
  if (pathname === "/shipper" || pathname.endsWith("/shipper/")) {
    return <ShipperDashboardContent />;
  }

  return <div>Không tìm thấy trang.</div>;
};

const ShipperMainLayout = () => {
  const location = useLocation();
  const ActiveContent = getActiveContent(location.pathname);

  return (
    <div style={layoutStyle}>
      {/* 1. Sidebar cố định */}
      <ShipperSidebar width={sidebarWidth} />

      <div style={contentAreaStyle}>
        {/* 2. Header cố định */}
        <ShipperHeader width={sidebarWidth} height={headerHeight} />

        {/* 3. Vùng Nội dung chính */}
        <Suspense
          fallback={<div style={{ padding: "20px" }}>Đang tải nội dung...</div>}
        >
          <div style={{ padding: "20px" }}>{ActiveContent}</div>
        </Suspense>
      </div>
    </div>
  );
};

export default ShipperMainLayout;
