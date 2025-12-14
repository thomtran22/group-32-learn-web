import React, { useState, useEffect } from "react";
import axiosClient from "../utils/axiosConfig";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaClock,
  FaStar,
} from "react-icons/fa";

const StatCard = ({ icon, title, value, unit, color }) => {
  const formatValue = (val, unit) => {
    if (unit === "VND") {
      return new Intl.NumberFormat("vi-VN").format(val) + " ₫";
    }
    if (unit === "%") {
      return val + unit;
    }
    return new Intl.NumberFormat("vi-VN").format(val);
  };

  return (
    <div
      style={{
        flex: "1 1 200px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        border: "1px solid #eee",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}
    >
      <div style={{ color, fontSize: "2em", marginBottom: "10px" }}>
        {icon}
      </div>
      <p style={{ margin: 0, fontSize: "1.8em", fontWeight: "bold", color }}>
        {formatValue(value, unit)}
      </p>
      <p style={{ marginTop: "5px", color: "#777" }}>{title}</p>
    </div>
  );
};

const UserStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/user/stats");
      setStats(response.data);
    } catch (err) {
      console.error("Lỗi khi tải thống kê:", err);
      setError(
        err.response?.data?.message || "Không thể tải dữ liệu thống kê."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Đang tải thống kê...</p>;
  }

  if (error || !stats) {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        {error || "Không có dữ liệu thống kê"}
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <h2 style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
        Thống kê Mua sắm Cá nhân
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <StatCard
          icon={<FaShoppingCart />}
          title="Tổng số Đơn hàng"
          value={stats.totalOrders || 0}
          unit="đơn"
          color="#0062cc"
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Tổng tiền đã chi tiêu"
          value={stats.totalSpent || 0}
          unit="VND"
          color="#c90000"
        />
        <StatCard
          icon={<FaClock />}
          title="Đơn hàng đang chờ"
          value={stats.pendingOrders || 0}
          unit="đơn"
          color="#ffc107"
        />
        <StatCard
          icon={<FaStar />}
          title={`Chi tiêu để đạt ${stats.nextTierDiscount || 0}% ưu đãi`}
          value={stats.pointsToNextTier || 0}
          unit="VND"
          color="#28a745"
        />
      </div>
    </div>
  );
};

export default UserStatistics;