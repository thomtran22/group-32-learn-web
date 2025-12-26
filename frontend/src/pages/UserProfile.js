import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  useEffect(() => {
    if (userRole !== "customer") {
      toast.info("Bạn không có quyền truy cập trang này!");
      navigate("/");
    }
  }, [userRole, navigate]);

  const ActiveComponent = menuItems.find(
    (item) => item.id === activeTab
  )?.component;
  const ActiveTitle = menuItems.find((item) => item.id === activeTab)?.name;

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-sidebar">
        <h3 className="sidebar-title">Quản lý Tài khoản</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={setActiveTab}
              />
            ))}
          </div>

          <div
            className="sidebar-item"
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              color: "var(--primary-color)",
              borderTop: "1px solid #eee",
            }}
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
    </div>
  );
};

export default UserProfile;
