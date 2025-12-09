import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaTicketAlt,
  FaReply,
  FaExchangeAlt,
  FaTimes,
} from "react-icons/fa";

// --- Dữ liệu Mock ---
const MOCK_SERVICE_HISTORY = [
  {
    id: "TICKET-001",
    type: "SUPPORT",
    subject: "Thắc mắc về size áo",
    status: "COMPLETED",
    date: "2025-11-01",
    details: "Vui lòng tư vấn size L/XL.",
  },
  {
    id: "RTX-001A",
    type: "EXCHANGE",
    subject: "Đổi size M sang L (ORD_P650)",
    status: "APPROVED",
    date: "2025-12-05",
    details: "Muốn đổi size quần tây.",
  },
  {
    id: "CANCEL-003",
    type: "CANCELLATION",
    subject: "Yêu cầu hủy đơn ORD_P990",
    status: "COMPLETED",
    date: "2025-12-01",
    details: "Đã hủy thành công.",
  },
  {
    id: "TICKET-002",
    type: "SUPPORT",
    subject: "Khiếu nại giao hàng chậm",
    status: "PENDING",
    date: "2025-12-06",
    details: "Đã quá ngày dự kiến giao.",
  },
];

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHistory(MOCK_SERVICE_HISTORY);
      setIsLoading(false);
    }, 800);
  }, []);

  const getStatusBadge = (status) => {
    let color, text;
    if (status === "COMPLETED") {
      color = "#28a745";
      text = "Hoàn thành";
    } else if (status === "APPROVED") {
      color = "#007bff";
      text = "Đã duyệt";
    } else if (status === "PENDING") {
      color = "#ffc107";
      text = "Đang chờ xử lý";
    } else {
      color = "#6c757d";
      text = "Đã đóng";
    }

    return <span style={{ color: color, fontWeight: "bold" }}>{text}</span>;
  };

  const getTypeIcon = (type) => {
    if (type === "SUPPORT") return <FaReply style={{ color: "#007bff" }} />;
    if (type === "EXCHANGE")
      return <FaExchangeAlt style={{ color: "#28a745" }} />;
    if (type === "CANCELLATION")
      return <FaTimes style={{ color: "#dc3545" }} />;
    return <FaTicketAlt />;
  };

  if (isLoading)
    return <p style={{ textAlign: "center" }}>Đang tải lịch sử tương tác...</p>;

  return (
    <div>
      {history.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Bạn chưa có yêu cầu hỗ trợ, đổi trả nào.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "6px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {getTypeIcon(item.type)} {item.id} - {item.subject}
                </div>
                <div>{getStatusBadge(item.status)}</div>
              </div>
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "0.9em",
                  color: "#555",
                }}
              >
                <FaCalendar style={{ marginRight: "5px" }} /> Ngày tạo:{" "}
                {new Date(item.date).toLocaleDateString("vi-VN")}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9em",
                  color: "#777",
                  fontStyle: "italic",
                }}
              >
                Chi tiết: {item.details}
              </p>
              {/* Nút xem chi tiết/tương tác thêm (chỉ là giả lập) */}
              <button
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#e0e0e0",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8em",
                }}
              >
                Xem chi tiết / Phản hồi
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;
