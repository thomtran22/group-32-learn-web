import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaClock,
  FaStar,
} from "react-icons/fa";

// --- Dữ liệu Mẫu ---
const MOCK_STATS_DATA = {
  totalOrders: 25,
  completedOrders: 20,
  pendingOrders: 5,
  totalSpent: 15750000, // 15,750,000 VND
  nextTierDiscount: 15, // Giảm 15%
  pointsToNextTier: 2500000, // 2,500,000 VND nữa
};

// --- Component Statistic Card ---
const StatCard = ({ icon, title, value, unit, color }) => {
  const formatValue = (val, unit) => {
    if (unit === "VND" || unit === "%") {
      return (
        new Intl.NumberFormat("vi-VN").format(val) +
        (unit === "VND" ? " ₫" : unit)
      );
    }
    return val;
  };

  return (
    <div
      style={{
        flex: "1 1 200px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        border: "1px solid #eee",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
      }}
    >
      <div style={{ color: color, fontSize: "2em", marginBottom: "10px" }}>
        {icon}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "1.8em",
          fontWeight: "bold",
          color: color,
        }}
      >
        {formatValue(value, unit)}
      </p>
      <p style={{ margin: "5px 0 0 0", color: "#777", fontSize: "0.9em" }}>
        {title}
      </p>
    </div>
  );
};

// --- Component chính: UserStatistics ---
const UserStatistics = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setStats(MOCK_STATS_DATA);
      setIsLoading(false);
    }, 600);
  }, []);

  if (isLoading)
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Đang tải thống kê cá nhân...
      </p>
    );
  if (!stats)
    return (
      <p style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Không thể tải dữ liệu thống kê.
      </p>
    );

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 15px" }}>
      <h2
        style={{
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "25px",
        }}
      >
        Thống kê Mua sắm Cá nhân
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <StatCard
          icon={<FaShoppingCart />}
          title="Tổng số Đơn hàng"
          value={stats.totalOrders}
          unit="đơn"
          color="#0062cc"
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Tổng tiền đã chi tiêu"
          value={stats.totalSpent}
          unit="VND"
          color="#c90000"
        />
        <StatCard
          icon={<FaClock />}
          title="Đơn hàng đang chờ"
          value={stats.pendingOrders}
          unit="đơn"
          color="#ffc107"
        />
        <StatCard
          icon={<FaStar />}
          title={`Chi tiêu để đạt ${stats.nextTierDiscount}% ưu đãi`}
          value={stats.pointsToNextTier}
          unit="VND"
          color="#28a745"
        />
      </div>
    </div>
  );
};

export default UserStatistics;
