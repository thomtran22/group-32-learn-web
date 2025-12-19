import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaChartBar,
  FaGift,
  FaShoppingCart,
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
  const ActiveComponent = menuItems.find(
    (item) => item.id === activeTab
  )?.component;
  const ActiveTitle = menuItems.find((item) => item.id === activeTab)?.name;

  return (
    <div className="user-profile-container">
      <div className="user-profile-sidebar">
        <h3 className="sidebar-title">Quản lý Tài khoản</h3>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={setActiveTab}
          />
        ))}
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
