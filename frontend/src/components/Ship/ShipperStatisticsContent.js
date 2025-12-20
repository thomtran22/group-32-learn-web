import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import "../../assets/css/shipper.css";

const ShipperStatisticsContent = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/shipper/stats");
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const data = stats || {
    activeDeliveryCount: 0,
    successfulDeliveries: 0,
    totalEarnings: 0,
    cancellationRate: 0,
  };

  return (
    <div>
      <h2 style={{ marginBottom: "25px" }}>📊 Thống Kê Hiệu Suất</h2>
      <div className="stats-grid">
        <div
          className="stat-card"
          style={{ borderTop: "4px solid var(--ship-blue)" }}
        >
          <div style={{ textAlign: "center", width: "100%" }}>
            <div style={{ color: "#666" }}>Đơn Đang Giao</div>
            <div
              style={{
                fontSize: "2.2em",
                fontWeight: "bold",
                color: "var(--ship-blue)",
              }}
            >
              {data.activeDeliveryCount}
            </div>
          </div>
        </div>
        <div
          className="stat-card"
          style={{ borderTop: "4px solid var(--ship-green)" }}
        >
          <div style={{ textAlign: "center", width: "100%" }}>
            <div style={{ color: "#666" }}>Đơn Đã Giao</div>
            <div
              style={{
                fontSize: "2.2em",
                fontWeight: "bold",
                color: "var(--ship-green)",
              }}
            >
              {data.successfulDeliveries}
            </div>
          </div>
        </div>
        <div className="stat-card" style={{ borderTop: "4px solid #f39c12" }}>
          <div style={{ textAlign: "center", width: "100%" }}>
            <div style={{ color: "#666" }}>Tổng Thu Nhập</div>
            <div
              style={{
                fontSize: "2.2em",
                fontWeight: "bold",
                color: "#f39c12",
              }}
            >
              {data.totalEarnings.toLocaleString()} đ
            </div>
          </div>
        </div>
        <div
          className="stat-card"
          style={{ borderTop: "4px solid var(--ship-primary)" }}
        >
          <div style={{ textAlign: "center", width: "100%" }}>
            <div style={{ color: "#666" }}>Tỷ Lệ Hủy</div>
            <div
              style={{
                fontSize: "2.2em",
                fontWeight: "bold",
                color: "var(--ship-primary)",
              }}
            >
              {(data.cancellationRate * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperStatisticsContent;
