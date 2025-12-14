import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";

const apiBaseUrl = "/shipper";

const ShipperStatisticsContent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiBaseUrl}/stats`);

        setStats(response.data);
      } catch (err) {
        console.error(
          "Lỗi tải thống kê:",
          err.response?.data?.message || err.message
        );
        setError("Không thể tải dữ liệu thống kê.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Đang tải thống kê hiệu suất...</div>;
  if (error) return <div style={{ color: "red" }}>Lỗi: {error}</div>;

  const displayStats = stats || {
    successfulDeliveries: 0,
    totalEarnings: 0,
    avgDeliveryTime: 0,
    cancellationRate: 0,
  };

  return (
    <div>
      <h2>📊 Thống Kê Hiệu Suất</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <StatCard
          title="Tổng Đơn Hàng Hoàn Thành"
          value={displayStats.successfulDeliveries}
        />
        <StatCard
          title="Tổng Thu Nhập (Ship Fee)"
          value={`${(displayStats.totalEarnings || 0).toLocaleString(
            "vi-VN"
          )} VND`}
          isCurrency={true}
        />
        <StatCard
          title="Thời Gian Giao Hàng TB"
          value={`${displayStats.avgDeliveryTime || 0} phút`}
        />
        <StatCard
          title="Tỷ Lệ Hủy"
          value={`${((displayStats.cancellationRate || 0) * 100).toFixed(2)}%`}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, isCurrency }) => (
  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      minWidth: "200px",
      backgroundColor: "#fff0f0",
    }}
  >
    <h4 style={{ margin: "0 0 10px 0", color: "#c90000" }}>{title}</h4>
    <p style={{ margin: 0, fontSize: "1.8em", fontWeight: "bold" }}>{value}</p>
  </div>
);

export default ShipperStatisticsContent;
