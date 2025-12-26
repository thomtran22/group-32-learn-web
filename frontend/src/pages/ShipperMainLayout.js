import React, { lazy, Suspense, useEffect, useState } from "react";
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
import axios from "axios";
import LoginModal from "../components/login/LoginModal"; // Import LoginModal

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
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Thêm state cho modal

  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
    // Sau khi đóng modal, nếu user vẫn chưa có token hoặc role không đúng, chuyển hướng
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      toast.error("Vui lòng đăng nhập để tiếp tục.");
      return;
    }
    // Hoặc nếu token có nhưng role vẫn không phải shipper
    axios.get("http://localhost:4000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(response => {
      if (response.data.role !== "shipper") {
        toast.warning("Bạn không có quyền truy cập trang này.");
        if (response.data.role === "admin") navigate("/admin");
        else if (response.data.role === "customer") navigate("/profile");
        else navigate("/");
      } else {
        setIsLoading(false);
      }
    }).catch(() => {
      localStorage.removeItem("token");
      toast.error("Phiên đăng nhập hết hạn.");
      navigate("/");
    });
  };

  useEffect(() => {
    const checkShipperAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsModalOpen(true); // Mở modal đăng nhập
        setIsLoading(false); // Dừng loading
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { role } = response.data;

        if (role !== "shipper") {
          toast.warning("Bạn không có quyền truy cập trang Shipper!");
          if (role === "admin") navigate("/admin");
          else navigate("/profile");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        toast.error("Phiên đăng nhập hết hạn.");
        setIsModalOpen(true); // Mở modal đăng nhập
        setIsLoading(false); // Dừng loading
      }
    };

    checkShipperAuth();
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất tài khoản Shipper?"
    );
    if (confirmLogout) {
      localStorage.removeItem("token");
      sessionStorage.clear();

      toast.success("Đã đăng xuất thành công!");
      navigate("/");
    }
  };

  const getActiveContent = (pathname) => {
    if (pathname.includes("/shipper/profile")) return <ShipperProfileContent />;
    if (pathname.includes("/shipper/stats"))
      return <ShipperStatisticsContent />;
    if (pathname.includes("/shipper/orders/active"))
      return <ShipperActiveOrdersContent />;
    return <ShipperDashboardContent />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 font-semibold">
        Đang xác thực thông tin Shipper...
      </div>
    );
  }

  // Nếu modal đang mở, chỉ hiển thị modal
  if (isModalOpen) {
    return <LoginModal closeModal={handleCloseLoginModal} />;
  }

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