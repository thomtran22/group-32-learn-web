import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { FaTruck, FaBoxOpen, FaMoneyBillAlt, FaSpinner } from "react-icons/fa";

const apiBaseUrl = "/shipper";

const formatCurrency = (amount) => (amount || 0).toLocaleString("vi-VN");

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const ShipperDashboardContent = () => {
  // Lấy kích thước màn hình
  const windowWidth = useWindowWidth();

  const [stats, setStats] = useState({
    totalDeliveries: 0,
    successfulDeliveries: 0,
    totalEarnings: 0,
    rating: 5,
    awaitingPickupCount: 0,
    activeDeliveryCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/stats`);
        setStats(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu thống kê.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dynamicStatsGridStyle = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns:
      windowWidth > 992
        ? "repeat(3, 1fr)"
        : "repeat(auto-fit, minmax(200px, 1fr))",
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <FaSpinner className="spin" /> Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return <div style={styles.error}>Lỗi: {error}</div>;
  }

  return (
    <div style={styles.container}>
            <h2 style={styles.header}>👋 Chào mừng, Shipper</h2>         {" "}
      <div style={dynamicStatsGridStyle}>
               {" "}
        <div style={{ ...styles.statCard, borderLeft: "4px solid #007bff" }}>
                    <p style={styles.statLabel}>Đơn hàng chờ lấy</p>         {" "}
          <div style={styles.statValueGroup}>
                       {" "}
            <span style={styles.statNumber}>{stats.awaitingPickupCount}</span>
                        <FaBoxOpen size={30} color="#007bff" />         {" "}
          </div>
                 {" "}
        </div>
             {" "}
        <div style={{ ...styles.statCard, borderLeft: "4px solid #ffc107" }}>
                    <p style={styles.statLabel}>Đơn hàng đang giao</p>         {" "}
          <div style={styles.statValueGroup}>
                       {" "}
            <span style={styles.statNumber}>{stats.activeDeliveryCount}</span>
                        <FaTruck size={30} color="#ffc107" />         {" "}
          </div>
                 {" "}
        </div>
           {" "}
        <div style={{ ...styles.statCard, borderLeft: "4px solid #28a745" }}>
                    <p style={styles.statLabel}>Tổng thu nhập</p>         {" "}
          <div style={styles.statValueGroup}>
                       {" "}
            <span style={styles.statNumber}>
              {formatCurrency(stats.totalEarnings)}
            </span>
                        <FaMoneyBillAlt size={30} color="#28a745" />         {" "}
          </div>
                    <span style={styles.unit}>VND</span>       {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    paddingTop: "60px",
  },
  header: {
    fontSize: "1.8em",
    marginBottom: "30px",
    color: "#343a40",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "120px",
  },
  statLabel: {
    margin: 0,
    fontSize: "0.9em",
    color: "#6c757d",
    fontWeight: 600,
  },
  statValueGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  statNumber: {
    fontSize: "2.2em",
    fontWeight: 700,
    color: "#343a40",
  },
  unit: {
    fontSize: "0.9em",
    fontWeight: 600,
    color: "#28a745",
    textAlign: "right",
    marginTop: "-10px",
  },
  loading: {
    fontSize: "1.2em",
    color: "#007bff",
    textAlign: "center",
    padding: "50px 0",
  },
  error: {
    color: "red",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    padding: "15px",
    borderRadius: "5px",
  },
};

export default ShipperDashboardContent;
