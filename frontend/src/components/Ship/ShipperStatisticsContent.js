// src/components/ship/ShipperStatisticsContent.js

import React, { useState, useEffect } from "react";
import axios from "axios"; // Sử dụng Axios đã được cấu hình Interceptor

const apiBaseUrl = "/api/shipper";

const ShipperStatisticsContent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ❌ XÓA HÀM getAuthHeaders: Logic này đã được chuyển sang Axios Interceptor.
  // const getAuthHeaders = () => { ... };

  // 🚀 TẢI DỮ LIỆU THỐNG KÊ
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // ❌ LOẠI BỎ: Không cần lấy Token và truyền Header thủ công

        // GỌI API BÌNH THƯỜNG: Interceptor sẽ tự động đính kèm Token
        const response = await axios.get(`${apiBaseUrl}/stats`);

        // Backend đã đảm bảo trả về dữ liệu mặc định nếu chưa có stats
        setStats(response.data);
      } catch (err) {
        // Interceptor sẽ xử lý lỗi 401/403 (chuyển hướng đăng nhập)
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

  // Xử lý dữ liệu không tồn tại an toàn
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
          value={`${displayStats.totalEarnings.toLocaleString()} VND`}
          isCurrency={true}
        />
        <StatCard
          title="Thời Gian Giao Hàng TB"
          value={`${displayStats.avgDeliveryTime || 0} phút`}
        />
        <StatCard
          title="Tỷ Lệ Hủy"
          // Đảm bảo cancellationRate là số trước khi tính toán
          value={`${((displayStats.cancellationRate || 0) * 100).toFixed(2)}%`}
        />
      </div>
      {/*  - Thêm biểu đồ khi cần */}
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
