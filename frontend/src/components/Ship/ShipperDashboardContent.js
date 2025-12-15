import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
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

// URL API
const apiStatsUrl = "/shipper/stats";
const apiOrderUrl = "/orders";

// Helper format tiền
const formatCurrency = (amount) => (amount || 0).toLocaleString("vi-VN") + " đ";

// Helper ghép địa chỉ từ Model của bạn
const formatAddress = (addr) => {
  if (!addr) return "N/A";
  // Ghép: Số nhà, Phường, Quận, TP
  return `${addr.streetAddress}, ${addr.ward}, ${addr.district}, ${addr.city}`;
};

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
        axios.get(apiStatsUrl),
        axios.get(`${apiOrderUrl}/available`),
      ]);
      setStats(statsRes.data);
      setAvailableOrders(ordersRes.data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    if (!window.confirm("Bạn chắc chắn muốn nhận giao đơn hàng này?")) return;
    setProcessingId(orderId);
    try {
      await axios.put(`${apiOrderUrl}/${orderId}/accept`);
      alert("Nhận đơn thành công! Hãy giao hàng ngay nhé.");
      setSelectedOrder(null);
      fetchAllData();
    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi xảy ra.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return (
      <div style={styles.loading}>
        <FaSpinner className="spin" /> Đang tải dữ liệu...
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>👋 Sàn Đơn Hàng</h2>

      {/* --- PHẦN 1: THỐNG KÊ --- */}
      <div style={styles.statsGrid}>
        <div style={{ ...styles.statCard, borderLeft: "5px solid #007bff" }}>
          <div style={styles.iconBoxBlue}>
            <FaTruck size={24} color="#fff" />
          </div>
          <div>
            <p style={styles.statLabel}>Đơn bạn đang giao</p>
            <span style={styles.statNumber}>{stats.activeDeliveryCount}</span>
          </div>
        </div>
        <div style={{ ...styles.statCard, borderLeft: "5px solid #28a745" }}>
          <div style={styles.iconBoxGreen}>
            <FaMoneyBillAlt size={24} color="#fff" />
          </div>
          <div>
            <p style={styles.statLabel}>Tổng giá trị đã giao</p>
            <span style={styles.statNumber}>
              {formatCurrency(stats.totalEarnings)}
            </span>
          </div>
        </div>
      </div>

      {/* --- PHẦN 2: DANH SÁCH ĐƠN (Sửa khớp Model) --- */}
      <div style={styles.listSection}>
        <h3 style={styles.listHeader}>📦 Đơn hàng sẵn sàng chờ nhận</h3>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>STT</th>
                <th style={styles.th}>Khu vực / Địa chỉ</th>
                <th style={styles.th}>Khách Hàng</th>
                <th style={styles.th}>Tổng Tiền</th>
                <th style={styles.th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {availableOrders.length > 0 ? (
                availableOrders.map((order, index) => (
                  <tr key={order._id} style={styles.tr}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>
                      {/* Sửa: Hiển thị địa chỉ ngắn gọn (Quận/TP) */}
                      <div style={{ fontWeight: "bold" }}>
                        {order.shippingAddress?.district}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {order.shippingAddress?.city}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: "bold" }}>
                        {order.shippingAddress?.fullName}
                      </div>
                      {/* Sửa: Hiển thị phone */}
                      <div style={{ fontSize: "12px" }}>
                        <FaPhone size={10} /> {order.shippingAddress?.phone}
                      </div>
                    </td>
                    <td
                      style={{
                        ...styles.td,
                        color: "#28a745",
                        fontWeight: "bold",
                      }}
                    >
                      {/* Sửa: Dùng totalPrice */}
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.detailBtn}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaEye style={{ marginRight: "5px" }} /> Xem & Nhận
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.emptyState}>
                    Hiện tại chưa có đơn hàng nào mới.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PHẦN 3: MODAL CHI TIẾT (Sửa khớp Model) --- */}
      {selectedOrder && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Chi tiết đơn hàng</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setSelectedOrder(null)}
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.infoRow}>
                <strong>Mã đơn:</strong>{" "}
                <span>#{selectedOrder._id.slice(-6).toUpperCase()}</span>
              </div>
              <div style={styles.infoRow}>
                <strong>
                  <FaUser /> Người nhận:
                </strong>{" "}
                <span>{selectedOrder.shippingAddress?.fullName}</span>
              </div>
              <div style={styles.infoRow}>
                <strong>📞 SĐT:</strong>{" "}
                <span>{selectedOrder.shippingAddress?.phone}</span>
              </div>

              {/* Sửa: Hiển thị full địa chỉ */}
              <div style={styles.infoRow}>
                <strong>
                  <FaMapMarkerAlt /> Địa chỉ:
                </strong>
                <span style={{ textAlign: "right", width: "60%" }}>
                  {formatAddress(selectedOrder.shippingAddress)}
                </span>
              </div>

              <div style={styles.infoRow}>
                <strong>Phương thức TT:</strong>
                <span
                  style={{
                    color:
                      selectedOrder.paymentMethod === "COD"
                        ? "#e67e22"
                        : "#2980b9",
                    fontWeight: "bold",
                  }}
                >
                  {selectedOrder.paymentMethod}
                </span>
              </div>

              <hr style={styles.divider} />

              <h4 style={{ margin: "10px 0" }}>Sản phẩm cần giao:</h4>
              <ul style={styles.productList}>
                {/* Sửa: Dùng orderItems thay vì items */}
                {selectedOrder.orderItems?.map((item, idx) => (
                  <li key={idx} style={styles.productItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <FaBox color="#666" />
                      )}
                      <div>
                        {/* Sửa: Dùng item.name */}
                        <div style={{ fontWeight: "bold" }}>{item.name}</div>
                        <div style={{ fontSize: "12px", color: "#777" }}>
                          Màu: {item.color} | Size: {item.size}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div>x{item.quantity}</div>
                      {/* Sửa: Dùng item.price */}
                      <div style={{ fontSize: "13px" }}>
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={styles.totalRow}>
                <span>Tổng thu (Gồm ship):</span>
                {/* Sửa: Dùng totalPrice */}
                <span style={{ color: "#c90000", fontSize: "1.4em" }}>
                  {formatCurrency(selectedOrder.totalPrice)}
                </span>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.acceptBtn}
                onClick={() => handleAcceptOrder(selectedOrder._id)}
                disabled={processingId === selectedOrder._id}
              >
                {processingId === selectedOrder._id ? (
                  <>Đang xử lý...</>
                ) : (
                  <>
                    <FaCheckCircle style={{ marginRight: "8px" }} /> NHẬN GIAO
                    ĐƠN NÀY
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Giữ nguyên phần styles như cũ (hoặc copy lại từ câu trả lời trước)
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  header: { marginBottom: "20px", color: "#333" },
  loading: { textAlign: "center", padding: "50px", color: "#007bff" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  iconBoxBlue: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    backgroundColor: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxGreen: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    backgroundColor: "#28a745",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    margin: "0 0 5px 0",
    color: "#6c757d",
    fontSize: "14px",
    fontWeight: "600",
  },
  statNumber: { fontSize: "24px", fontWeight: "bold", color: "#333" },
  listSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  listHeader: {
    marginTop: 0,
    marginBottom: "15px",
    color: "#333",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "10px",
  },
  tableContainer: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
  tableHeaderRow: { backgroundColor: "#f8f9fa", textAlign: "left" },
  th: {
    padding: "12px 15px",
    borderBottom: "2px solid #dee2e6",
    color: "#495057",
  },
  tr: { borderBottom: "1px solid #dee2e6" },
  td: { padding: "12px 15px", color: "#333", verticalAlign: "middle" },
  emptyState: { padding: "20px", textAlign: "center", color: "#6c757d" },
  detailBtn: {
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    maxWidth: "500px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
  },
  modalHeader: {
    padding: "15px 20px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
  },
  modalBody: { padding: "20px", overflowY: "auto" },
  modalFooter: {
    padding: "15px 20px",
    borderTop: "1px solid #eee",
    backgroundColor: "#f8f9fa",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    textAlign: "center",
  },
  infoRow: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },
  divider: { border: "none", borderTop: "1px dashed #ddd", margin: "15px 0" },
  productList: { listStyle: "none", padding: 0, margin: 0 },
  productItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    borderTop: "2px solid #eee",
    paddingTop: "10px",
  },
  acceptBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s",
    boxShadow: "0 4px 6px rgba(40, 167, 69, 0.3)",
  },
};

export default ShipperDashboardContent;
