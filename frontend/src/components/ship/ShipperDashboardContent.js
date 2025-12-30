import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import {
  FaTruck,
  FaMoneyBillAlt,
  FaSpinner,
  FaEye,
  FaTimes,
  FaUser,
  FaMapMarkerAlt,
  FaBox,
  FaCheckCircle,
  FaPhone,
} from "react-icons/fa";
import "../../assets/css/shipper.css";
import Swal from 'sweetalert2';

const ShipperDashboardContent = () => {
  const [stats, setStats] = useState({
    activeDeliveryCount: 0,
    totalEarnings: 0,
  });
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchAllData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        axios.get("/shipper/stats"),
        axios.get("/orders/available"),
      ]);
      setStats(statsRes.data);
      setAvailableOrders(ordersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn chắc chắn muốn nhận giao đơn hàng này?',
        text: 'Xác nhận nhận đơn để xử lý giao hàng.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Nhận đơn',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d'
      });

      if (!result.isConfirmed) return;

      setProcessingId(orderId);
      try {
        await axios.put(`/orders/${orderId}/accept`);
        toast.success('Nhận đơn thành công!');
        setSelectedOrder(null);
        fetchAllData();
      } catch (error) {
        toast.error('Lỗi xảy ra!');
      } finally {
        setProcessingId(null);
      }
    } catch (err) {
      console.error('Confirmation dialog error:', err);
    }
  };

  if (loading)
    return (
      <div className="loading-state">
        <FaSpinner className="spin" /> Đang tải dữ liệu...
      </div>
    );

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>👋 Sàn Đơn Hàng</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: "var(--ship-blue)" }}
          >
            <FaTruck size={24} />
          </div>
          <div>
            <div style={{ color: "#666", fontSize: "0.9em" }}>
              Đơn bạn đang giao
            </div>
            <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {stats.activeDeliveryCount}
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: "var(--ship-green)" }}
          >
            <FaMoneyBillAlt size={24} />
          </div>
          <div>
            <div style={{ color: "#666", fontSize: "0.9em" }}>
              Doanh thu dự tính
            </div>
            <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {stats.totalEarnings.toLocaleString()} đ
            </div>
          </div>
        </div>
      </div>

      <div className="shipper-table-container">
        <h3>📦 Đơn hàng chờ nhận</h3>
        <table className="shipper-table">
          <thead>
            <tr>
              <th>Địa chỉ / Quận</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {availableOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <strong>{order.shippingAddress?.district}</strong>
                  <div style={{ fontSize: "0.8em", color: "#666" }}>
                    {order.shippingAddress?.streetAddress}
                  </div>
                </td>
                <td>{order.shippingAddress?.fullName}</td>
                <td style={{ color: "var(--ship-green)", fontWeight: "bold" }}>
                  {order.totalPrice.toLocaleString()} đ
                </td>
                <td>
                  <button
                    className="btn-ship btn-ship-blue"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <FaEye /> Xem & Nhận
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal-ship-overlay">
          <div className="modal-ship-content">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3>Chi tiết đơn hàng</h3>
              <FaTimes
                onClick={() => setSelectedOrder(null)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="modal-body">
              <p>
                <FaUser /> {selectedOrder.shippingAddress?.fullName} -{" "}
                {selectedOrder.shippingAddress?.phone}
              </p>
              <p>
                <FaMapMarkerAlt />{" "}
                {selectedOrder.shippingAddress?.streetAddress},{" "}
                {selectedOrder.shippingAddress?.ward}
              </p>
              <hr />
              <button
                className="btn-ship btn-ship-success"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={() => handleAcceptOrder(selectedOrder._id)}
                disabled={processingId}
              >
                {processingId ? "Đang nhận..." : "NHẬN GIAO ĐƠN NÀY"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipperDashboardContent;
