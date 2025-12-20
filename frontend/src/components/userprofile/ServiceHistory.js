import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaTicketAlt,
  FaReply,
  FaExchangeAlt,
  FaTimes,
} from "react-icons/fa";
import axiosClient from "../../utils/axiosConfig";

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("/user/service-history");
      setHistory(res.data);
    } catch (err) {
      setError("Không thể tải lịch sử tương tác.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderStatus = (status) => {
    if (status === "COMPLETED" || status === "CLOSED")
      return <span style={{ color: "#28a745" }}>Hoàn thành</span>;
    if (status === "APPROVED")
      return <span style={{ color: "#007bff" }}>Đã duyệt</span>;
    if (status === "PENDING" || status === "PROCESSING")
      return <span style={{ color: "#ffc107" }}>Đang xử lý</span>;
    return <span style={{ color: "#6c757d" }}>Đã đóng</span>;
  };

  const renderIcon = (type) => {
    if (type === "SUPPORT" || type === "TICKET")
      return <FaReply color="#007bff" />;
    if (type === "EXCHANGE" || type === "RETURN")
      return <FaExchangeAlt color="#28a745" />;
    if (type === "CANCELLATION")
      return <FaTimes color="#dc3545" />;
    return <FaTicketAlt />;
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Đang tải lịch sử...</p>;
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        {error}
      </p>
    );
  }

  return (
    <div>
      {history.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Bạn chưa có yêu cầu hỗ trợ hoặc đổi trả.
        </p>
      ) : (
        history.map((item) => (
          <div
            key={item._id || item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "6px",
              marginBottom: "15px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {renderIcon(item.type)} {item.subject}
              </div>
              <div>{renderStatus(item.status)}</div>
            </div>

            <p style={{ fontSize: "0.9em", color: "#555" }}>
              <FaCalendar style={{ marginRight: 5 }} />
              {new Date(item.createdAt || item.date).toLocaleDateString("vi-VN")}
            </p>

            <p style={{ fontSize: "0.9em", color: "#777" }}>
              {item.details}
            </p>

            <button
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#e0e0e0",
                cursor: "pointer",
              }}
            >
              Xem chi tiết / Phản hồi
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceHistory;
