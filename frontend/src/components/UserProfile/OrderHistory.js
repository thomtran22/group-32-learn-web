import React, { useState, useEffect, useCallback } from "react";
import axiosClient from "../../utils/axiosConfig";
import StatusProduct from "../StatusProduct";
import ShippingInformation from "../ShippingInformation";
import { FaArrowLeft } from "react-icons/fa";

const OrderHistory = () => {
  const [view, setView] = useState("list");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Không thể tải danh sách đơn hàng."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderDetail = useCallback(async (orderId) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/orders/${orderId}`);
      setSelectedOrder(res.data);
    } catch (err) {
      setError("Không thể tải chi tiết đơn hàng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setView("detail");
    fetchOrderDetail(orderId);
  };

  const handleBack = () => {
    setView("list");
    setSelectedOrder(null);
    setSelectedOrderId(null);
  };

  if (loading && view === "list") {
    return <div style={{ padding: 20 }}>Đang tải lịch sử đơn hàng...</div>;
  }

  if (error) {
    return <div style={{ color: "red", padding: 20 }}>Lỗi: {error}</div>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h2
        style={{
          color: "#c90000",
          borderBottom: "2px solid #c90000",
          paddingBottom: 10,
        }}
      >
        {view === "list"
          ? "Lịch sử Đơn hàng"
          : `Chi tiết Đơn hàng ${selectedOrderId}`}
      </h2>

      {view === "list" && orders.length > 0 && (
        <StatusProduct orders={orders} onViewDetail={handleViewDetail} />
      )}

      {view === "list" && orders.length === 0 && (
        <p style={{ padding: 20 }}>Bạn chưa có đơn hàng nào.</p>
      )}

      {view === "detail" && (
        <div>
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            <FaArrowLeft style={{ marginRight: 5 }} />
            Quay lại Danh sách Đơn hàng
          </button>

          {loading ? (
            <p>Đang tải chi tiết đơn hàng...</p>
          ) : selectedOrder ? (
            <ShippingInformation orderDetail={selectedOrder} />
          ) : (
            <p style={{ color: "red" }}>Không tìm thấy chi tiết đơn hàng.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
