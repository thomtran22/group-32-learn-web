import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import StatusProduct from "../components/StatusProduct";
import ShippingInformation from "../components/ShippingInformation";

// --- Dữ liệu Mẫu (Mock API) ---
const MOCK_ORDERS = [
  {
    id: "ORD_P420",
    status: "Đang Vận Chuyển",
    product: {
      imageUrl: "https://via.placeholder.com/80/0000FF/FFFFFF?text=P1",
      name: "Áo thun Polo cao cấp (Size L)",
      price: 420000,
    },
  },
  {
    id: "ORD_P650",
    status: "Thành Công",
    product: {
      imageUrl: "https://via.placeholder.com/80/FF0000/FFFFFF?text=P2",
      name: "Quần tây công sở Slim Fit",
      price: 650000,
    },
  },
  {
    id: "ORD_P990",
    status: "Đã Hủy",
    product: {
      imageUrl: "https://via.placeholder.com/80/00FF00/FFFFFF?text=P3",
      name: "Giày Sneaker Classic Trắng",
      price: 990000,
    },
  },
];

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
  backgroundColor: "#6c757d", // Màu xám trung tính
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

  const [view, setView] = useState("list"); // 'list' hoặc 'detail'
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders] = useState(MOCK_ORDERS);

  // Tìm đơn hàng đang được chọn (dùng để truyền dữ liệu đầy đủ nếu cần)
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const handleGoToProfile = () => {
    // Chuyển hướng đến trang Hồ sơ cá nhân
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
      {/* NÚT QUAY LẠI HỒ SƠ CÁ NHÂN */}
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

      {view === "list" && (
        // Truyền hàm handleViewDetail xuống StatusProduct
        <StatusProduct orders={orders} onViewDetail={handleViewDetail} />
      )}

      {view === "detail" && selectedOrder && (
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
          {/* Giả lập component ShippingInformation nhận orderId */}
          <ShippingInformation orderId={selectedOrderId} />
        </div>
      )}
    </div>
  );
};

export default Order;
