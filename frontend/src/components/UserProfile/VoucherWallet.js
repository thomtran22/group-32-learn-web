import React, { useState } from "react";
import {
  FaGift,
  FaTag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// --- Dữ liệu Mock ---
const MOCK_VOUCHERS = [
  {
    id: 101,
    code: "WELCOME10",
    value: 10,
    unit: "%",
    condition: "Đơn hàng trên 500k",
    expiry: "2025-12-31",
    status: "ACTIVE",
  },
  {
    id: 102,
    code: "FREESHIP",
    value: 30,
    unit: "k",
    condition: "Miễn phí vận chuyển",
    expiry: "2025-11-20",
    status: "EXPIRED",
  },
  {
    id: 103,
    code: "VIP2025",
    value: 200,
    unit: "k",
    condition: "Cho khách hàng VIP",
    expiry: "2026-06-30",
    status: "ACTIVE",
  },
  {
    id: 104,
    code: "USED_CODE",
    value: 15,
    unit: "%",
    condition: "Đơn hàng đầu tiên",
    expiry: "2025-10-01",
    status: "USED",
  },
];

const VoucherWallet = () => {
  const [vouchers, setVouchers] = useState(MOCK_VOUCHERS);
  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [filter, setFilter] = useState("ACTIVE");

  const filteredVouchers = vouchers.filter((v) => v.status === filter);

  const handleAddVoucher = () => {
    if (!newVoucherCode.trim()) return;

    // Giả lập kiểm tra và thêm voucher thành công
    alert(`Mã ${newVoucherCode.toUpperCase()} đã được thêm vào ví của bạn!`);
    setNewVoucherCode("");
    // Sau đó thực hiện fetch lại danh sách vouchers
  };

  const formatExpiryDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const buttonStyle = (currentFilter) => ({
    padding: "8px 15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginRight: "10px",
    cursor: "pointer",
    backgroundColor: filter === currentFilter ? "#c90000" : "white",
    color: filter === currentFilter ? "white" : "#333",
    fontWeight: "bold",
  });

  const VoucherCard = ({ voucher }) => {
    let statusText, statusColor;
    if (voucher.status === "ACTIVE") {
      statusText = "Đang hoạt động";
      statusColor = "#28a745";
    } else if (voucher.status === "EXPIRED") {
      statusText = "Đã hết hạn";
      statusColor = "#ffc107";
    } else {
      statusText = "Đã sử dụng";
      statusColor = "#6c757d";
    }

    return (
      <div
        style={{
          display: "flex",
          border: "1px solid #eee",
          marginBottom: "15px",
          borderRadius: "8px",
          overflow: "hidden",
          opacity: voucher.status === "ACTIVE" ? 1 : 0.7,
        }}
      >
        {/* Khu vực giá trị */}
        <div
          style={{
            flex: "0 0 100px",
            backgroundColor: statusColor,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <FaTag style={{ fontSize: "1.5em" }} />
          <p style={{ margin: 0, fontSize: "1.5em", fontWeight: "bold" }}>
            {voucher.value}
            {voucher.unit}
          </p>
        </div>

        {/* Khu vực chi tiết */}
        <div style={{ flexGrow: 1, padding: "15px", position: "relative" }}>
          <p
            style={{
              margin: "0 0 5px 0",
              fontWeight: "bold",
              fontSize: "1.1em",
              color: "#c90000",
            }}
          >
            Mã: {voucher.code}
          </p>
          <p style={{ margin: "0 0 5px 0", color: "#555", fontSize: "0.9em" }}>
            Điều kiện: {voucher.condition}
          </p>
          <p style={{ margin: "0", color: "#777", fontSize: "0.8em" }}>
            <FaClock style={{ marginRight: "5px" }} /> Hết hạn:{" "}
            {formatExpiryDate(voucher.expiry)}
          </p>

          {/* Status badge */}
          <span
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              fontSize: "0.9em",
              color: statusColor,
              fontWeight: "bold",
            }}
          >
            {statusText}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Thanh nhập mã voucher */}
      <div
        style={{
          display: "flex",
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          type="text"
          placeholder="Nhập mã voucher của bạn"
          value={newVoucherCode}
          onChange={(e) => setNewVoucherCode(e.target.value.toUpperCase())}
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px 0 0 4px",
            fontSize: "1em",
          }}
        />
        <button
          onClick={handleAddVoucher}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Áp dụng
        </button>
      </div>

      {/* Thanh lọc */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={buttonStyle("ACTIVE")}
          onClick={() => setFilter("ACTIVE")}
        >
          <FaCheckCircle style={{ marginRight: "5px" }} /> Đang hoạt động
        </button>
        <button
          style={buttonStyle("EXPIRED")}
          onClick={() => setFilter("EXPIRED")}
        >
          <FaClock style={{ marginRight: "5px" }} /> Đã hết hạn
        </button>
        <button style={buttonStyle("USED")} onClick={() => setFilter("USED")}>
          <FaTimesCircle style={{ marginRight: "5px" }} /> Đã sử dụng
        </button>
      </div>

      {/* Danh sách Voucher */}
      <div className="voucher-list">
        {filteredVouchers.length > 0 ? (
          filteredVouchers.map((v) => <VoucherCard key={v.id} voucher={v} />)
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            Không có voucher nào trong danh sách này.
          </p>
        )}
      </div>
    </div>
  );
};

export default VoucherWallet;
