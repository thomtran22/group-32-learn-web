import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaUserCircle,
  FaChartBar,
  FaGift,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import UserStatistics from "../components/UserStatistics";
import PersonalInfo from "../components/userprofile/PersonalInfo";
import VoucherWallet from "../components/userprofile/VoucherWallet";
import OrderHistory from "../components/userprofile/OrderHistory";
import LoginModal from "../components/login/LoginModal"; // Import LoginModal
import "../assets/css/userprofile.css";

const menuItems = [
  {
    id: "info",
    name: "Thông tin Tài khoản",
    icon: FaUserCircle,
    component: PersonalInfo,
  },
  {
    id: "orders",
    name: "Lịch sử Đơn hàng",
    icon: FaShoppingCart,
    component: OrderHistory,
  },
  {
    id: "stats",
    name: "Thống kê Mua sắm",
    icon: FaChartBar,
    component: UserStatistics,
  },
  {
    id: "vouchers",
    name: "Ví Voucher",
    icon: FaGift,
    component: VoucherWallet,
  },
];

const SidebarItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <div
      className={`sidebar-item ${isActive ? "active" : ""}`}
      onClick={() => onClick(item.id)}
    >
      <Icon className="sidebar-item-icon" />
      {item.name}
    </div>
  );
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Thêm state cho modal
  const navigate = useNavigate();

  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
    // Sau khi đóng modal, nếu user vẫn chưa có token hoặc role không đúng, chuyển hướng về trang chủ
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      toast.error("Vui lòng đăng nhập để tiếp tục.");
      return;
    }
    // Hoặc nếu token có nhưng role vẫn không phải customer (có thể user login bằng tài khoản khác)
    axios.get("http://localhost:4000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(response => {
      if (response.data.role !== "customer") {
        toast.warning("Bạn không có quyền truy cập trang này.");
        if (response.data.role === "admin") navigate("/admin");
        else if (response.data.role === "shipper") navigate("/shipper");
        else navigate("/"); // Fallback
      } else {
        // Nếu đã đúng customer, tắt loading
        setIsLoading(false);
      }
    }).catch(() => {
      localStorage.removeItem("token");
      toast.error("Phiên đăng nhập hết hạn.");
      navigate("/");
    });
  };


  useEffect(() => {
    const checkPermission = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Nếu không có token, mở modal đăng nhập
        setIsModalOpen(true);
        setIsLoading(false); // Dừng loading để modal có thể hiển thị
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { role } = response.data;

        if (role !== "customer") {
          toast.info("Trang này chỉ dành cho khách hàng.");
          // Chuyển hướng về trang phù hợp với role nếu có
          if (role === "admin") navigate("/admin");
          else if (role === "shipper") navigate("/shipper");
          else navigate("/");
        } else {
          setIsLoading(false); // Nếu đúng là customer thì tắt loading
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token"); // Xóa token lỗi
        toast.error("Phiên đăng nhập hết hạn.");
        setIsModalOpen(true); // Mở modal đăng nhập
        setIsLoading(false); // Dừng loading
      }
    };

    checkPermission();
  }, [navigate]);

  const ActiveComponent = menuItems.find(
    (item) => item.id === activeTab
  )?.component;
  const ActiveTitle = menuItems.find((item) => item.id === activeTab)?.name;

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("token");
      sessionStorage.clear();
      navigate("/");
      toast.success("Đã đăng xuất thành công");
    }
  };

  // Hiển thị màn hình chờ hoặc null trong khi đang check quyền hoặc modal đang mở
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600">
          Đang tải thông tin...
        </div>
      </div>
    );
  }

  // Nếu modal đang mở, không hiển thị nội dung trang profile
  if (isModalOpen) {
    return <LoginModal closeModal={handleCloseLoginModal} />;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-sidebar">
        <h3 className="sidebar-title">Quản lý Tài khoản</h3>
         <div className="sidebar-menu-wrapper"> 
          <div className="sidebar-menu-list">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={setActiveTab}
              />
            ))}
          </div>

          <div className="sidebar-item sidebar-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="sidebar-item-icon" />
            Đăng xuất
          </div>
        </div>
      </div>

      <div className="user-profile-content">
        <h2 className="content-title">{ActiveTitle}</h2>
        <hr className="content-divider" />
        {ActiveComponent && <ActiveComponent />}
      </div>
      {/* {isModalOpen && <LoginModal closeModal={handleCloseLoginModal} />} */} {/* Đã di chuyển lên trên */}
    </div>
  );
};

export default UserProfile;