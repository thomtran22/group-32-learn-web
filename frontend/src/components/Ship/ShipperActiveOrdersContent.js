import React, { useState, useEffect, useCallback } from "react";
import axios from "../../utils/axiosConfig";
import {
  FaMapMarkerAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaCog,
  FaMoneyBillAlt,
  FaClock,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
  FaBoxOpen,
} from "react-icons/fa";

const apiBaseUrl = "/shipper";

const formatCurrency = (amount) =>
  (amount || 0).toLocaleString("vi-VN") + " VND";

const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return (
      date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " " +
      date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      })
    );
  } catch (e) {
    return "Invalid Date";
  }
};

const STATUS_OPTIONS = {
  PICKED_UP: "Đã lấy hàng",
  OUT_FOR_DELIVERY: "Đang giao",
  FAILED_ATTEMPT: "Thất bại (Giao lại)",
  FAILED_ATTEMPT: "Đã hủy",
};

const ShipperActiveOrdersContent = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchActiveOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBaseUrl}/orders/active`);
      setActiveOrders(response.data);
    } catch (err) {
      const message =
        "Không thể tải danh sách đơn hàng đang giao. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveOrders();
  }, [fetchActiveOrders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    setIsUpdating(orderId);
    try {
      await axios.put(`${apiBaseUrl}/orders/${orderId}/status`, {
        newStatus: newStatus,
      });

      alert(
        `Đơn hàng #${orderId.slice(-6)} đã được cập nhật trạng thái thành: ${
          STATUS_OPTIONS[newStatus] || newStatus
        }!`
      );
      fetchActiveOrders();
      setExpandedOrderId(null);
    } catch (err) {
      console.error(
        "Lỗi cập nhật trạng thái:",
        err.response?.data?.message || err.message
      );
      alert(
        `Cập nhật thất bại: ${
          err.response?.data?.message || "Lỗi mạng hoặc Server."
        }`
      );
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeliverySuccess = (orderId) => {
    if (
      !window.confirm(
        `Xác nhận ĐÃ GIAO THÀNH CÔNG đơn hàng #${orderId.slice(-6)}?`
      )
    ) {
      return;
    }
    updateOrderStatus(orderId, "DELIVERED");
  };

  const handleChangeStatus = (orderId) => {
    const statusKeys = Object.keys(STATUS_OPTIONS);
    const statusList = statusKeys
      .map((key, index) => `${index + 1}. ${STATUS_OPTIONS[key]}`)
      .join("\n");

    const promptMessage = `Chọn trạng thái mới cho đơn hàng #${orderId.slice(
      -6
    )}:\n\n${statusList}\n\nNhập số tương ứng:`;

    const selection = window.prompt(promptMessage);

    if (selection === null) return;

    const selectedIndex = parseInt(selection) - 1;

    if (selectedIndex >= 0 && selectedIndex < statusKeys.length) {
      const newStatus = statusKeys[selectedIndex];
      if (
        window.confirm(
          `Bạn muốn chuyển trạng thái sang "${STATUS_OPTIONS[newStatus]}"?`
        )
      ) {
        updateOrderStatus(orderId, newStatus);
      }
    } else {
      alert(
        "Lựa chọn không hợp lệ. Vui lòng nhập số từ 1 đến " + statusKeys.length
      );
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusDisplay = (status) => {
    let color = "#6c757d";
    let text = "Đã nhận";
    switch (status) {
      case "PICKED_UP":
        color = "#ffc107";
        text = "Lấy Hàng";
        break;
      case "OUT_FOR_DELIVERY":
        color = "#007bff";
        text = "Đang Giao";
        break;
      case "DELIVERED":
        color = "#28a745";
        text = "Đã Giao";
        break;
      case "FAILED_ATTEMPT":
        color = "#dc3545";
        text = "Đã Hủy";
        break;
      default:
        color = "#dc3545";
        text = "Lỗi";
    }
    return (
      <span style={{ color, fontWeight: "bold", whiteSpace: "nowrap" }}>
        {text}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={styles.loading}>
                <FaSpinner className="spin" /> Đang tải đơn hàng...      {" "}
      </div>
    );
  }

  if (error) {
    return <div style={styles.error}>Lỗi: {error}</div>;
  }

  if (activeOrders.length === 0) {
    return (
      <div style={styles.noData}>
                <h3>🎉 Bạn không có đơn hàng nào đang giao.</h3>     {" "}
      </div>
    );
  }

  return (
    <div style={styles.container}>
           {" "}
      <h2 style={styles.header}>
                📦 Đơn Hàng Đang Giao ({activeOrders.length})      {" "}
      </h2>
           {" "}
      <button
        onClick={fetchActiveOrders}
        style={styles.refreshButton}
        disabled={loading || isUpdating}
      >
                <FaSyncAlt style={{ marginRight: "5px" }} /> Cập nhật danh sách
             {" "}
      </button>
                 {" "}
      <div style={styles.listContainer}>
               {" "}
        {activeOrders.map((order) => {
          const isCurrentOrderUpdating = isUpdating === order._id;
          const isExpanded = expandedOrderId === order._id;
          return (
            <div key={order._id} style={styles.listItem}>
                                       {" "}
              <div
                style={styles.summaryRow}
                onClick={() => toggleExpand(order._id)}
              >
                                             {" "}
                <div style={{ minWidth: 100, fontWeight: "bold" }}>
                                    #{order._id.slice(-6)}               {" "}
                </div>
                               {" "}
                <div style={{ minWidth: 100 }}>
                                    {getStatusDisplay(order.status)}           
                     {" "}
                </div>
                                {" "}
                <div
                  style={{
                    color: "#28a745",
                    fontWeight: "bold",
                    minWidth: 120,
                    textAlign: "right",
                  }}
                >
                                    {formatCurrency(order.totalAmount)}         
                       {" "}
                </div>
                   {" "}
                <div style={{ marginLeft: 10, color: "#6c757d" }}>
                                   {" "}
                  {isExpanded ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                                 {" "}
                </div>
                             {" "}
              </div>
                           {" "}
              {isExpanded && (
                <div style={styles.expandedContent}>
                                                     {" "}
                  <p style={styles.detailRow}>
                                       {" "}
                    <FaMapMarkerAlt style={styles.detailIcon} />               
                        **Địa chỉ giao:**{" "}
                    {order.shippingDetails?.address || "N/A"}                 {" "}
                  </p>
                                   {" "}
                  <p style={styles.detailRow}>
                                        <FaClock style={styles.detailIcon} />   
                                    **Thời gian tạo:**{" "}
                    {formatDateTime(order.createdAt)}                 {" "}
                  </p>
                                                           {" "}
                  <div style={styles.productList}>
                                        <FaBoxOpen style={styles.detailIcon} />{" "}
                    **Sản phẩm ({order.products?.length || 0}):**              
                         {" "}
                    <ul>
                                           {" "}
                      {order.products?.map((item, index) => (
                        <li
                          key={index}
                          style={{ marginBottom: 3, fontSize: "0.9em" }}
                        >
                                                   {" "}
                          {item.productId?.name ||
                            `ID: ${item.productId || "Sản phẩm không rõ"}`}{" "}
                          (SL: {item.quantity})                        {" "}
                        </li>
                      ))}
                                         {" "}
                    </ul>
                                     {" "}
                  </div>
                               {" "}
                  <div style={styles.actionGroup}>
                                       {" "}
                    <button
                      style={{
                        ...styles.actionButton,
                        backgroundColor: isCurrentOrderUpdating
                          ? "#6c757d"
                          : "#28a745",
                      }}
                      onClick={() => handleDeliverySuccess(order._id)}
                      disabled={isCurrentOrderUpdating}
                    >
                                           {" "}
                      {isCurrentOrderUpdating ? (
                        <>
                          <FaSpinner className="spin" size={12} /> Đang Xử Lý...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle size={12} /> Đã Giao Thành Công
                        </>
                      )}
                                         {" "}
                    </button>
                                                         {" "}
                    <button
                      style={{
                        ...styles.actionButton,
                        backgroundColor: "#007bff",
                        marginLeft: 10,
                      }}
                      onClick={() => handleChangeStatus(order._id)}
                      disabled={isCurrentOrderUpdating}
                    >
                                           {" "}
                      <FaCog size={11} style={{ marginRight: 4 }} /> Trạng thái
                      khác                    {" "}
                    </button>
                                     {" "}
                  </div>
                                 {" "}
                </div>
              )}
                         {" "}
            </div>
          );
        })}
             {" "}
      </div>
         {" "}
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    paddingTop: "60px",
  },
  header: {
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "15px",
    color: "#343a40",
    fontSize: "1.4em",
    fontWeight: "600",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  listItem: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    fontSize: "0.9em",
    overflow: "hidden",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #eee",
  },
  expandedContent: {
    padding: "10px 12px 12px 12px",
    borderTop: "1px solid #eee",
    backgroundColor: "#fff",
  },
  detailRow: {
    margin: "5px 0",
    display: "flex",
    alignItems: "flex-start",
    fontWeight: "500",
  },
  detailIcon: {
    marginRight: "6px",
    color: "#6c757d",
    minWidth: "15px",
  },
  productList: {
    marginTop: "10px",
    borderTop: "1px dashed #eee",
    paddingTop: "8px",
    paddingLeft: "15px",
  },
  actionGroup: {
    display: "flex",
    marginTop: "15px",
  },
  actionButton: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9em",
    whiteSpace: "nowrap",
  },
  refreshButton: {
    padding: "7px 10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "12px",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.9em",
  },
  loading: {
    fontSize: "1.2em",
    color: "#007bff",
    textAlign: "center",
    padding: "50px 0",
  },
  error: {
    color: "red",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    padding: "10px",
    borderRadius: "5px",
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#e9f7ef",
    borderRadius: "8px",
    border: "1px solid #c3e6cb",
  },
};

export default ShipperActiveOrdersContent;
