import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTruck, FaBox, FaClock } from "react-icons/fa";

// --- Dữ liệu Mẫu cho Timeline ---
const MOCK_TIMELINE_DATA = {
  ORD_P420: [
    {
      status: "ORDER_PLACED",
      description: "Đặt hàng thành công",
      timestamp: "2025-12-05T09:00:00Z",
      location: "Hà Nội",
    },
    {
      status: "PAYMENT_CONFIRMED",
      description: "Đã xác nhận thanh toán",
      timestamp: "2025-12-05T09:05:00Z",
      location: "Hà Nội",
    },
    {
      status: "PACKED",
      description: "Kho đã đóng gói sản phẩm",
      timestamp: "2025-12-05T14:30:00Z",
      location: "Kho HN1",
    },
    {
      status: "SHIPPED",
      description: "Đã giao cho đơn vị vận chuyển (GHS)",
      timestamp: "2025-12-06T08:00:00Z",
      location: "Kho GHS - Cầu Giấy",
    },
    {
      status: "IN_TRANSIT",
      description: "Đang trung chuyển tại Hub miền Nam",
      timestamp: "2025-12-07T10:00:00Z",
      location: "Hub HCM",
    },
    {
      status: "DELIVERING",
      description: "Đang trên đường giao đến bạn. Dự kiến: 15/12",
      timestamp: "2025-12-08T07:30:00Z",
      location: "Q.3, TP.HCM",
    },
  ],
  ORD_P650: [
    {
      status: "ORDER_PLACED",
      description: "Đặt hàng thành công",
      timestamp: "2025-12-03T09:00:00Z",
      location: "Hà Nội",
    },
    {
      status: "PACKED",
      description: "Kho đã đóng gói sản phẩm",
      timestamp: "2025-12-03T14:30:00Z",
      location: "Kho HN1",
    },
    {
      status: "SHIPPED",
      description: "Đã giao cho đơn vị vận chuyển (Viettel Post)",
      timestamp: "2025-12-04T08:00:00Z",
      location: "Kho Viettel",
    },
    {
      status: "DELIVERED",
      description: "Giao hàng thành công",
      timestamp: "2025-12-04T15:30:00Z",
      location: "Q.1, TP.HCM",
    },
  ],
};

// --- Component Timeline Item ---
const TimelineItem = ({ event, isLast, isActive }) => {
  const iconMap = {
    ORDER_PLACED: <FaCheckCircle />,
    PAYMENT_CONFIRMED: <FaCheckCircle />,
    PACKED: <FaBox />,
    SHIPPED: <FaTruck />,
    IN_TRANSIT: <FaTruck />,
    DELIVERING: <FaClock />,
    DELIVERED: <FaCheckCircle />,
  };

  const statusColor = isActive ? "#c90000" : "#ccc";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ display: "flex", marginBottom: "15px" }}>
      {/* Cột Icon và Line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <div style={{ color: statusColor, fontSize: "1.2em" }}>
          {iconMap[event.status] || <FaClock />}
        </div>
        {!isLast && (
          <div
            style={{
              width: "2px",
              flexGrow: 1,
              backgroundColor: statusColor,
              margin: "5px 0",
            }}
          ></div>
        )}
      </div>

      {/* Cột Nội dung */}
      <div style={{ flexGrow: 1, padding: "5px 0" }}>
        <p
          style={{
            margin: 0,
            fontWeight: "bold",
            color: isActive ? "#333" : "#777",
          }}
        >
          {event.description}
        </p>
        <p style={{ margin: 0, fontSize: "0.9em", color: "#777" }}>
          {formatDate(event.timestamp)} | {event.location}
        </p>
      </div>
    </div>
  );
};

// --- Component chính: OrderTimeline ---
const OrderTimeline = ({ orderId }) => {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const data = MOCK_TIMELINE_DATA[orderId];
      if (data) {
        setTimeline(data);
      } else {
        setError("Không có thông tin lịch sử vận chuyển cho đơn hàng này.");
      }
      setIsLoading(false);
    }, 800);
  }, [orderId]);

  if (isLoading)
    return (
      <p style={{ padding: "15px", textAlign: "center" }}>
        Đang tải dòng thời gian vận chuyển...
      </p>
    );
  if (error)
    return <p style={{ color: "red", padding: "15px" }}>Lỗi: {error}</p>;
  if (timeline.length === 0)
    return (
      <p style={{ padding: "15px" }}>Chưa có sự kiện nào được ghi nhận.</p>
    );

  const lastIndex = timeline.length - 1;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h4
        style={{
          marginBottom: "20px",
          borderBottom: "1px dashed #ddd",
          paddingBottom: "10px",
        }}
      >
        Lịch sử Vận chuyển
      </h4>

      {timeline.map((event, index) => (
        <TimelineItem
          key={index}
          event={event}
          isLast={index === lastIndex}
          isActive={index === lastIndex}
        />
      ))}
    </div>
  );
};

export default OrderTimeline;
