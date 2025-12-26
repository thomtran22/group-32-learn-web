import React, { lazy, Suspense, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import "../assets/css/shipper.css";
import { toast } from "react-toastify";

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

const ShipperSidebar = ({ onLogout }) => (
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

      {/* Nút Đăng xuất với hàm xử lý */}
      <div style={{ marginTop: "50px" }}>
        <div
          className="shipper-nav-link"
          onClick={onLogout}
          style={{ cursor: "pointer" }}
        >
          <FaSignOutAlt style={{ marginRight: "10px" }} /> Đăng Xuất
        </div>
      </div>
    </nav>
  </div>
);

const ShipperMainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole")?.toLowerCase();

  useEffect(() => {
    if (userRole !== "shipper") {
      toast.info("Bạn không có quyền truy cập trang này!");
      navigate("/");
    }
  }, [userRole, navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất tài khoản Shipper?"
    );
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      sessionStorage.clear();

      toast.success("Đã đăng xuất thành công!");
      navigate("/");
    }
  };
  if (userRole !== "shipper") return null;

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
        <ShipperSidebar onLogout={handleLogout} />

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
