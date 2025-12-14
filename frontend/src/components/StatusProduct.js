import React, { useState, useEffect } from "react";
import axios from "./../utils/axiosConfig";
import { FaTruck, FaTimes, FaCheck, FaShoppingCart } from "react-icons/fa";

const BASE_URL = "http://localhost:3000/api";
const ORDERS_ENDPOINT = "/user/orders";

const OrderProductCard = ({ product, orderStatus, onViewDetail, orderId }) => {
  const styles = {
    card: {
      display: "flex",
      alignItems: "flex-start",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    statusBadge: (status) => {
      let color = "#777";
      let backgroundColor = "#f0f0f0";
      let icon = <FaTruck />;

      if (status === "Thành Công") {
        color = "#0e7a2a";
        backgroundColor = "#e6ffe6";
        icon = <FaCheck />;
      } else if (status === "Đang Vận Chuyển") {
        color = "#0062cc";
        backgroundColor = "#e6f7ff";
        icon = <FaTruck />;
      } else if (status === "Đã Hủy") {
        color = "#a00000";
        backgroundColor = "#ffe6e6";
        icon = <FaTimes />;
      }

      return {
        fontWeight: "bold",
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "0.9em",
        color: color,
        backgroundColor: backgroundColor,
        display: "inline-flex",
        alignItems: "center",
      };
    },
  };

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  const handleCardClick = () => {
    if (typeof onViewDetail === "function") {
      onViewDetail(orderId);
    }
  };

  return (
    <div
      style={styles.card}
      onClick={handleCardClick}
      title={`Xem chi tiết đơn hàng ${orderId}`}
    >
      <div style={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.name} style={styles.image} />
      </div>
      <div style={styles.details}>
        <p style={styles.productName}>
          <strong>Mã Đơn: {orderId}</strong> - {product.name}
        </p>
        <p style={{ fontSize: "0.9em", color: "#555" }}>
          Số lượng: {product.quantity || 1}
        </p>
        <p style={styles.price}>{formattedPrice}</p>
      </div>
      <div style={styles.statusContainer}>
        <p style={styles.statusLabel}>Trạng thái đơn hàng:</p>
        <span style={styles.statusBadge(orderStatus)}>
          {styles.statusBadge(orderStatus).icon} {orderStatus}
        </span>
      </div>
    </div>
  );
};

const StatusProduct = ({ onViewDetail }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${BASE_URL}${ORDERS_ENDPOINT}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      setOrders(response.data);

      console.log("Danh sách đơn hàng tải thành công:", response.data);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
      setError(
        err.response?.data?.message || "Không thể tải danh sách đơn hàng."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetail = (orderId) => {
    alert(`Chuyển đến trang chi tiết đơn hàng: ${orderId}`);
  };

  if (isLoading) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "40px",
          fontSize: "1.1em",
          color: "#007bff",
        }}
      >
        Đang tải danh sách đơn hàng...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", padding: "40px" }}>
        Lỗi: {error}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#777",
          border: "1px dashed #ccc",
          margin: "20px auto",
          maxWidth: "900px",
          borderRadius: "8px",
        }}
      >
        <FaShoppingCart style={{ fontSize: "2em", marginBottom: "10px" }} />
        <p style={{ fontWeight: "bold" }}>Bạn chưa có đơn hàng nào.</p>
        <p>Hãy bắt đầu mua sắm ngay!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 15px" }}>
      <h3
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        Danh sách Đơn hàng của bạn
      </h3>
      {orders.map((order) => (
        <OrderProductCard
          key={order.id}
          orderId={order.id}
          product={order.product}
          orderStatus={order.status}
          onViewDetail={handleViewDetail}
        />
      ))}
    </div>
  );
};

export default StatusProduct;
