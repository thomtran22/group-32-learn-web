// src/components/ship/ShipperStatisticsContent.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = "/api/shipper";

const ShipperStatisticsContent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return { Authorization: `Bearer ${token}` };
  };

  // 🚀 TẢI DỮ LIỆU THỐNG KÊ
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // GET /api/shipper/stats
        const response = await axios.get(`${apiBaseUrl}/stats`, {
          headers: getAuthHeaders(),
        });
        setStats(response.data);
      } catch (err) {
        console.error("Lỗi tải thống kê:", err);
        setError("Không thể tải dữ liệu thống kê.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Đang tải thống kê hiệu suất...</div>;
  if (error) return <div style={{ color: "red" }}>Lỗi: {error}</div>;
  if (!stats) return <div>Chưa có dữ liệu thống kê nào được ghi nhận.</div>;

  return (
    <div>
      <h2>📊 Thống Kê Hiệu Suất</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <StatCard
          title="Tổng Đơn Hàng Hoàn Thành"
          value={stats.successfulDeliveries}
        />
        <StatCard
          title="Tổng Thu Nhập (Ship Fee)"
          value={`${stats.totalEarnings.toLocaleString()} VND`}
          isCurrency={true}
        />
        <StatCard
          title="Thời Gian Giao Hàng TB"
          value={`${stats.avgDeliveryTime || 0} phút`}
        />
        <StatCard
          title="Tỷ Lệ Hủy"
          value={`${(stats.cancellationRate * 100).toFixed(2)}%`}
        />
      </div>
      {/*  - Thêm biểu đồ khi cần */}
    </div>
  );
};

// Component con hiển thị thẻ thống kê
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
