import React from "react";
import { FaTruck, FaTimes, FaCheck } from "react-icons/fa";

// --- OrderProductCard Component (Thẻ Sản phẩm) ---
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
    imageContainer: {
      flexShrink: 0,
      width: "80px",
      height: "80px",
      marginRight: "15px",
      borderRadius: "4px",
      overflow: "hidden",
    },
    image: { width: "100%", height: "100%", objectFit: "cover" },
    details: { flexGrow: 1 },
    productName: {
      fontSize: "1.1em",
      fontWeight: "600",
      color: "#333",
      marginBottom: "5px",
    },
    price: {
      fontSize: "1.2em",
      fontWeight: "bold",
      color: "#c90000",
      marginTop: "8px",
    },
    statusContainer: {
      marginLeft: "auto",
      textAlign: "right",
      paddingLeft: "15px",
    },
    statusLabel: { fontSize: "0.8em", color: "#777", marginBottom: "5px" },
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
          **Mã Đơn: {orderId}** - {product.name}
        </p>
        <p style={styles.price}>{formattedPrice}</p>
      </div>
      <div style={styles.statusContainer}>
        <p style={styles.statusLabel}>Trạng thái đơn hàng:</p>
        <span style={styles.statusBadge(orderStatus)}>{orderStatus}</span>
      </div>
    </div>
  );
};

// --- Component chính: StatusProduct ---
const StatusProduct = ({ orders, onViewDetail }) => {
  if (!orders || orders.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#777" }}>
        Bạn chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 15px" }}>
      {orders.map((order) => (
        <OrderProductCard
          key={order.id}
          orderId={order.id}
          product={order.product}
          orderStatus={order.status}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default StatusProduct;
