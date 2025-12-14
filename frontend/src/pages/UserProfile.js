import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaMapMarkedAlt,
  FaChartBar,
  FaGift,
  FaHistory,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import UserStatistics from "../components/UserStatistics";
import PersonalInfo from "../components/UserProfile/PersonalInfo";
import AddressList from "../components/UserProfile/AddressList";
import VoucherWallet from "../components/UserProfile/VoucherWallet";
import OrderHistory from "../components/UserProfile/OrderHistory";

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
    id: "addresses",
    name: "Sổ Địa chỉ",
    icon: FaMapMarkedAlt,
    component: AddressList,
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

const containerStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "0 15px",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  gap: "30px",
};

const sidebarStyle = {
  flex: "0 0 250px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRight: "1px solid #ddd",
};

const contentStyle = {
  flexGrow: 1,
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const SidebarItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  const itemStyle = {
    padding: "12px 15px",
    margin: "5px 0",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#c90000" : "#333",
    backgroundColor: isActive ? "#fff0f0" : "transparent",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s",
    border: isActive ? "1px solid #c90000" : "1px solid transparent",
  };

  return (
    <div style={itemStyle} onClick={() => onClick(item.id)}>
      <Icon style={{ marginRight: "10px", fontSize: "1.2em" }} />
      {item.name}
    </div>
  );
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const ActiveComponent = menuItems.find(
    (item) => item.id === activeTab
  )?.component;
  const ActiveTitle = menuItems.find((item) => item.id === activeTab)?.name;

  const navButtonStyle = {
    width: "100%",
    padding: "10px 15px",
    margin: "10px 0",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
  };

  const backButtonStyle = {
    ...navButtonStyle,
    backgroundColor: "#6c757d",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <button style={backButtonStyle} onClick={handleGoBack}>
          <FaArrowLeft style={{ marginRight: "10px" }} />
          Quay lại
        </button>

        <h3
          style={{
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
            marginTop: "20px",
            marginBottom: "15px",
            color: "#333",
          }}
        >
          Quản lý Tài khoản
        </h3>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      <div style={contentStyle}>
        <h2 style={{ marginBottom: "20px", color: "#c90000" }}>
          {ActiveTitle}
        </h2>
        <hr
          style={{
            border: "none",
            borderTop: "1px dashed #ddd",
            marginBottom: "30px",
          }}
        />
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default UserProfile;
