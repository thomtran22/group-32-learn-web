import React, { lazy, Suspense } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import "../assets/css/shipper.css";

const ShipperDashboardContent = lazy(() =>
  import("../components/ship/ShipperDashboardContent")
);
const ShipperStatisticsContent = lazy(() =>
  import("../components/ship/ShipperStatisticsContent")
);
const ShipperProfileContent = lazy(() =>
  import("../components/ship/ShipperProfileContent")
);
const ShipperActiveOrdersContent = lazy(() =>
  import("../components/ship/ShipperActiveOrdersContent")
);

const ShipperSidebar = () => (
  <div className="shipper-sidebar">
    <div className="sidebar-menu-header">MENU</div>
    <nav>
      <NavLink
        to="/shipper"
        end
        className={({ isActive }) =>
          `shipper-nav-link ${isActive ? "active" : ""}`
        }
      >
        <FaTachometerAlt style={{ marginRight: "10px" }} /> Dashboard
      </NavLink>
      <NavLink
        to="/shipper/orders/active"
        className={({ isActive }) =>
          `shipper-nav-link ${isActive ? "active" : ""}`
        }
      >
        <FaClipboardList style={{ marginRight: "10px" }} /> Đơn hàng đang giao
      </NavLink>
      <NavLink
        to="/shipper/stats"
        className={({ isActive }) =>
          `shipper-nav-link ${isActive ? "active" : ""}`
        }
      >
        <FaChartLine style={{ marginRight: "10px" }} /> Thống kê Hiệu suất
      </NavLink>
      <NavLink
        to="/shipper/profile"
        className={({ isActive }) =>
          `shipper-nav-link ${isActive ? "active" : ""}`
        }
      >
        <FaUserCircle style={{ marginRight: "10px" }} /> Hồ sơ Cá nhân
      </NavLink>
      <div style={{ marginTop: "50px" }}>
        <Link to="/" className="shipper-nav-link">
          <FaSignOutAlt style={{ marginRight: "10px" }} /> Đăng Xuất
        </Link>
      </div>
    </nav>
  </div>
);

const ShipperMainLayout = () => {
  const location = useLocation();

  const getActiveContent = (pathname) => {
    if (pathname.includes("/shipper/profile")) return <ShipperProfileContent />;
    if (pathname.includes("/shipper/stats"))
      return <ShipperStatisticsContent />;
    if (pathname.includes("/shipper/orders/active"))
      return <ShipperActiveOrdersContent />;
    return <ShipperDashboardContent />;
  };

  return (
    <div className="shipper-layout-wrapper">
      <div className="shipper-container">
        <ShipperSidebar />
        <div className="shipper-content">
          <Suspense fallback={<div>Đang tải nội dung...</div>}>
            {getActiveContent(location.pathname)}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ShipperMainLayout;
