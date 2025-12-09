// src/components/ship/ShipperDashboardContent.js

import React, { useEffect, useState } from "react";
// import axios from 'axios'; // Giả định bạn dùng axios

const Card = ({ title, value, icon, color }) => (
  <div
    style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderLeft: `5px solid ${color}`,
    }}
  >
    <div>
      <div style={{ fontSize: "0.8em", color: "#6c757d", fontWeight: "bold" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: "1.8em",
          fontWeight: "bolder",
          color: "#333",
          marginTop: "5px",
        }}
      >
        {value}
      </div>
    </div>
    <div style={{ fontSize: "2.5em", color: color }}>{icon}</div>
  </div>
);

const ShipperDashboardContent = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dữ liệu giả định cho thẻ thống kê nhanh
  const mockStats = {
    totalNew: 5,
    totalActive: 12,
    totalEarnings: "5,000,000 VND",
  };

  // useEffect(() => {
  //     const fetchNewOrders = async () => {
  //         try {
  //             // Thay thế bằng endpoint thực tế
  //             const response = await axios.get('/api/shipper/orders/new');
  //             setNewOrders(response.data);
  //             setIsLoading(false);
  //         } catch (error) {
  //             console.error("Lỗi khi tải đơn hàng mới:", error);
  //             setIsLoading(false);
  //         }
  //     };
  //     fetchNewOrders();
  // }, []);

  // Dữ liệu đơn hàng giả định để hiển thị
  const mockOrders = [
    {
      id: 1,
      code: "ORD001",
      address: "123 Phố Huế, Hà Nội",
      total: "150,000 VND",
    },
    {
      id: 2,
      code: "ORD002",
      address: "456 Đường Láng, Hà Nội",
      total: "240,000 VND",
    },
    {
      id: 3,
      code: "ORD003",
      address: "789 Trần Duy Hưng, Hà Nội",
      total: "99,000 VND",
    },
  ];

  return (
    <div>
      <h2>👋 Chào mừng, Nguyễn Văn A</h2>

      {/* 1. Thẻ Thống kê Nhanh */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          title="Đơn hàng chờ lấy"
          value={mockStats.totalNew}
          icon={<FaClipboardList />}
          color="#007bff"
        />
        <Card
          title="Đơn hàng đang giao"
          value={mockStats.totalActive}
          icon={<FaTruck />}
          color="#ffc107"
        />
        <Card
          title="Tổng thu nhập"
          value={mockStats.totalEarnings}
          icon={<FaChartLine />}
          color="#28a745"
        />
      </div>

      {/* 2. Danh sách Đơn hàng Mới (Cần lấy) */}
      <h3>Đơn hàng mới cần lấy ({mockOrders.length})</h3>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "15px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        {isLoading ? (
          <p>Đang tải đơn hàng...</p>
        ) : mockOrders.length === 0 ? (
          <p>Hiện không có đơn hàng mới nào cần bạn xử lý.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {mockOrders.map((order) => (
              <li
                key={order.id}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong style={{ color: "#007bff" }}>{order.code}</strong> -{" "}
                  {order.address}
                </div>
                <div>
                  <span style={{ marginRight: "15px", fontWeight: "bold" }}>
                    {order.total}
                  </span>
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => alert(`Đã nhận đơn ${order.code}`)}
                  >
                    Nhận đơn
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShipperDashboardContent;
