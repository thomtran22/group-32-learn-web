import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import StatusProduct from "../components/StatusProduct";
import ShippingInformation from "../components/ShippingInformation";

const containerStyle = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "0 15px",
  fontFamily: "Arial, sans-serif",
};

const backButtonContainerStyle = {
  padding: "10px 0",
  marginBottom: "20px",
};

const backButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.3s",
};

const Order = () => {
  const navigate = useNavigate();

  const [view, setView] = useState("list");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedOrderId(null);
  };

  return (
    <div style={containerStyle}>
      <div style={backButtonContainerStyle}>
        <button onClick={handleGoToProfile} style={backButtonStyle}>
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Quay lại Hồ sơ cá nhân
        </button>
      </div>

      <h2
        style={{
          color: "#c90000",
          borderBottom: "2px solid #c90000",
          paddingBottom: "10px",
        }}
      >
        {view === "list"
          ? "Quản lý Đơn hàng"
          : `Chi tiết Đơn hàng ${selectedOrderId}`}
      </h2>

      {view === "list" && <StatusProduct onViewDetail={handleViewDetail} />}

      {view === "detail" && selectedOrderId && (
        <div>
          <button
            onClick={handleBackToList}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              marginBottom: "15px",
              fontWeight: "bold",
            }}
          >
            &lt; Quay lại Danh sách Đơn hàng
          </button>
          <ShippingInformation orderId={selectedOrderId} />
        </div>
      )}
    </div>
  );
};

export default Order;
