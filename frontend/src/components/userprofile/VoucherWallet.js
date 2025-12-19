import React, { useState, useEffect, useCallback } from "react";
import {
  FaTag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axiosClient from "../../utils/axiosConfig";

const VoucherWallet = () => {
  const [vouchers, setVouchers] = useState([]);
  const [code, setCode] = useState("");
  const [filter, setFilter] = useState("ACTIVE");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVouchers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/vouchers/my-wallet");

      const mapped = res.data.map((v) => ({
        ...v,
        value: v.discountValue,
        unit: v.discountType === "percentage" ? "%" : "₫",
        expiry: v.endDate,
        status: "ACTIVE",
      }));

      setVouchers(mapped);
    } catch (e) {
      setError("Không thể tải voucher");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  const addVoucher = async () => {
    if (!code.trim()) return;

    try {
      await axiosClient.post("/vouchers/add", {
        code: code.trim().toUpperCase(),
      });

      setCode("");
      fetchVouchers();
    } catch (e) {
      alert(e.response?.data?.message || "Thêm voucher thất bại");
    }
  };

  const filtered = vouchers.filter((v) => v.status === filter);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Nhập mã voucher"
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={addVoucher} style={{ padding: "10px 20px" }}>
          Áp dụng
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setFilter("ACTIVE")}>
          <FaCheckCircle /> Đang dùng
        </button>
        <button onClick={() => setFilter("EXPIRED")}>
          <FaClock /> Hết hạn
        </button>
        <button onClick={() => setFilter("USED")}>
          <FaTimesCircle /> Đã dùng
        </button>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        filtered.map((v) => (
          <div
            key={v._id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 10,
            }}
          >
            <p>
              <FaTag /> {v.code}
            </p>
            <p>
              Giá trị: {v.value}
              {v.unit}
            </p>
            <p>Hết hạn: {new Date(v.expiry).toLocaleDateString("vi-VN")}</p>
          </div>
        ))}
    </div>
  );
};

export default VoucherWallet;
