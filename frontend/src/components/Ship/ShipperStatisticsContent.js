import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { FaShippingFast, FaCheckCircle, FaWallet, FaTimesCircle } from "react-icons/fa"; // (Tùy chọn) Thêm icon cho đẹp nếu muốn

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

  // Dữ liệu hiển thị (có giá trị mặc định an toàn)
  const data = stats || {
    activeDeliveryCount: 0,
    successfulDeliveries: 0,
    totalEarnings: 0,
    cancellationRate: 0,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>📊 Thống Kê Hiệu Suất</h2>
      
      {/* Layout Grid 2x2 đối xứng */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", // Chia 2 cột đều nhau
        gap: "20px" // Khoảng cách giữa các ô
      }}>
        
        {/* Ô 1: Đơn đang giao */}
        <StatCard
          title="Đơn Đang Giao"
          value={data.activeDeliveryCount}
          color="#007bff" // Màu xanh dương
          bgColor="#e7f1ff"
        />

        {/* Ô 2: Đơn đã giao */}
        <StatCard
          title="Đơn Đã Giao"
          value={data.successfulDeliveries}
          color="#28a745" // Màu xanh lá
          bgColor="#e6f4ea"
        />

        {/* Ô 3: Doanh thu */}
        <StatCard
          title="Tổng Thu Nhập"
          value={`${data.totalEarnings.toLocaleString("vi-VN")} đ`}
          color="#d4af37" // Màu vàng kim
          bgColor="#fff9e6"
        />

        {/* Ô 4: Tỷ lệ hủy */}
        <StatCard
          title="Tỷ Lệ Hủy Đơn"
          value={`${(data.cancellationRate * 100).toFixed(1)}%`}
          color="#dc3545" // Màu đỏ
          bgColor="#ffe6e6"
        />
        
      </div>
    </div>
  );
};

// Component Card được tùy biến màu sắc
const StatCard = ({ title, value, color, bgColor }) => (
  <div
    style={{
      padding: "25px",
      borderRadius: "12px",
      backgroundColor: bgColor,
      border: `1px solid ${color}40`, // Viền mờ theo màu chủ đạo
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      transition: "transform 0.2s",
    }}
  >
    <h4 style={{ margin: "0 0 10px 0", color: "#555", fontSize: "16px" }}>{title}</h4>
    <p style={{ margin: 0, fontSize: "2em", fontWeight: "bold", color: color }}>
      {value}
    </p>
  </div>
);

export default ShipperStatisticsContent;