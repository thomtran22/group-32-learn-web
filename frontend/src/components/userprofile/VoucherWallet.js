import React, { useState, useEffect, useCallback } from "react";
import { FaTag, FaClock, FaCheckCircle } from "react-icons/fa";
import axiosClient from "../../utils/axiosConfig";
import "../../assets/css/userprofile.css";

const VoucherWallet = () => {
  const [vouchers, setVouchers] = useState([]);
  const [code, setCode] = useState("");
  const [filter, setFilter] = useState("ACTIVE");
  const [loading, setLoading] = useState(true);

  const fetchVouchers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/vouchers/my-wallet");
      setVouchers(
        res.data.map((v) => ({
          ...v,
          value: v.discountValue,
          unit: v.discountType === "percentage" ? "%" : "₫",
          expiry: v.endDate,
          status: "ACTIVE",
        }))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Nhập mã voucher"
          className="profile-input"
          style={{ flex: 1 }}
        />
        <button
          onClick={async () => {
            await axiosClient.post("/vouchers/add", { code: code.trim() });
            fetchVouchers();
          }}
          className="btn btn-blue"
        >
          Áp dụng
        </button>
      </div>

      <div className="tab-container">
        <button
          className={`tab-btn ${filter === "ACTIVE" ? "active" : ""}`}
          onClick={() => setFilter("ACTIVE")}
        >
          <FaCheckCircle /> Đang dùng
        </button>
        <button
          className={`tab-btn ${filter === "EXPIRED" ? "active" : ""}`}
          onClick={() => setFilter("EXPIRED")}
        >
          <FaClock /> Hết hạn
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        vouchers
          .filter((v) => v.status === filter)
          .map((v) => (
            <div key={v._id} className="info-card">
              <p className="input-label">
                <FaTag /> {v.code}
              </p>
              <p>
                Giá trị:{" "}
                <strong>
                  {v.value}
                  {v.unit}
                </strong>
              </p>
              <p style={{ fontSize: "0.85em", color: "#666" }}>
                Hết hạn: {new Date(v.expiry).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))
      )}
    </div>
  );
};

export default VoucherWallet;
