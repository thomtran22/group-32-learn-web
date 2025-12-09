import React, { useState, useEffect } from "react";
import StatusProduct from "../StatusProduct"; // Danh sách đơn hàng
import ShippingInformation from "../ShippingInformation"; // Chi tiết đơn hàng
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios"; // Giả định sử dụng Axios

const containerStyle = {
  fontFamily: "Arial, sans-serif",
};

const OrderHistory = () => {
  const [view, setView] = useState("list");
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ************* LOGIC TẢI DANH SÁCH ĐƠN HÀNG *************
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Lấy Token
        const response = await axios.get("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  // ********************************************************

  const selectedOrder = orders.find((o) => o._id === selectedOrderId);

  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedOrderId(null);
  };

  if (loading)
    return <div style={{ padding: "20px" }}>Đang tải lịch sử đơn hàng...</div>;
  if (error)
    return <div style={{ color: "red", padding: "20px" }}>Lỗi: {error}</div>;

  return (
    <div style={containerStyle}>
      <h2
        style={{
          color: "#c90000",
          borderBottom: "2px solid #c90000",
          paddingBottom: "10px",
        }}
      >
        {view === "list"
          ? "Lịch sử Đơn hàng"
          : `Chi tiết Đơn hàng ${selectedOrderId}`}
      </h2>

      {view === "list" && (
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
            <FaArrowLeft style={{ marginRight: "5px" }} /> Quay lại Danh sách
            Đơn hàng
          </button>
          {/* Component ShippingInformation sẽ phải gọi API chi tiết riêng */}
          <ShippingInformation orderId={selectedOrderId} />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
