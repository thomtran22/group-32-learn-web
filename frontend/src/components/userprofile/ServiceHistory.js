import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaTicketAlt
} from "react-icons/fa";
import axiosClient from "../../utils/axiosConfig";
import "../../assets/css/userprofile.css";

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get("/user/service-history");
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getStatusClass = (status) => {
    if (["COMPLETED", "CLOSED"].includes(status)) return "status-completed";
    if (["PENDING", "PROCESSING"].includes(status)) return "status-pending";
    return "";
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      {history.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Trống.</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="info-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div className="input-label">
                <FaTicketAlt /> {item.subject}
              </div>
              <div className={`status-badge ${getStatusClass(item.status)}`}>
                {item.status}
              </div>
            </div>
            <p style={{ fontSize: "0.85em", color: "#666" }}>
              <FaCalendar />{" "}
              {new Date(item.createdAt).toLocaleDateString("vi-VN")}
            </p>
            <p style={{ margin: "10px 0" }}>{item.details}</p>
            <button
              className="btn btn-secondary"
              style={{ padding: "5px 10px", fontSize: "0.8em" }}
            >
              Phản hồi
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceHistory;
