import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaTruck, FaClock } from "react-icons/fa";
import OrderTimeline from "./OrderTimeline";

// --- Styles (Giữ nguyên) ---
const styles = {
  shippingInfoBox: {
    border: "1px solid #e0e0e0",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px",
  },
  shippingInfoTitle: {
    fontSize: "1.25em",
    fontWeight: 600,
    color: "#333",
    marginBottom: "15px",
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
  },
  shippingDetailGroup: { display: "flex", flexWrap: "wrap", gap: "15px" },
  detailItem: { display: "flex", alignItems: "flex-start", width: "48%" },
  fullWidthItem: { width: "100%" },
  icon: {
    color: "#000",
    marginRight: "10px",
    fontSize: "1.2em",
    paddingTop: "3px",
  },
  detailContent: { lineHeight: 1.4 },
  detailLabel: { fontWeight: 400, color: "#777", margin: 0, fontSize: "0.9em" },
  detailValue: { fontWeight: 500, color: "#333", margin: 0 },
  divider: { border: 0, borderTop: "1px dashed #ccc", margin: "20px 0" },
  trackingNumberLink: {
    color: "#c90000",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

// --- Dữ Liệu Mock API ---
const mockApiData = {
  ORD_P420: {
    recipientName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "Số 123, Đường XYZ, Quận 3, TP.HCM",
    carrier: "Giao Hàng Siêu Tốc (GHS)",
    trackingNumber: "GHSVN87654321",
    trackingUrl: "https://mock-tracking-url.com/GHSVN87654321",
    estimatedDeliveryDate: "2025-12-15T00:00:00.000Z",
  },
  ORD_P650: {
    recipientName: "Trần Thị B",
    phone: "0987654321",
    address: "Số 456, Đường ABC, Quận 1, TP.HCM",
    carrier: "Viettel Post",
    trackingNumber: "VTPOST11223344",
    trackingUrl: "https://mock-tracking-url.com/VTPOST11223344",
    estimatedDeliveryDate: "2025-12-10T00:00:00.000Z",
  },
  ORD_P990: {
    recipientName: "Lê Văn C",
    phone: "0912345678",
    address: "Số 789, Đường PQR, Quận 5, TP.HCM",
    carrier: "GHN",
    trackingNumber: "GHN123456789",
    trackingUrl: "https://mock-tracking-url.com/GHN123456789",
    estimatedDeliveryDate: "2025-12-05T00:00:00.000Z",
  },
};

const ShippingInformation = ({ orderId }) => {
  const [shippingData, setShippingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockApiData[orderId];

        if (data) {
          setShippingData(data);
        } else {
          setShippingData(null);
          throw new Error(
            "Không tìm thấy thông tin vận chuyển cho đơn hàng này."
          );
        }
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải thông tin.");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchShippingInfo();
    } else {
      setIsLoading(false);
      setError("Vui lòng cung cấp Order ID.");
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div style={styles.shippingInfoBox}>
        <h3 style={styles.shippingInfoTitle}>📦 Thông tin Vận chuyển</h3>
        <p>Đang tải thông tin vận chuyển...</p>
      </div>
    );
  }

  if (error || !shippingData) {
    return (
      <div style={styles.shippingInfoBox}>
        <h3 style={styles.shippingInfoTitle}>📦 Thông tin Vận chuyển</h3>
        <p style={{ color: "red" }}>
          Lỗi: {error || "Không có dữ liệu vận chuyển."}
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* 1. THÔNG TIN CHUNG VẬN CHUYỂN */}
      <div style={styles.shippingInfoBox}>
        <h3 style={styles.shippingInfoTitle}>Thông tin Giao hàng cơ bản</h3>

        <div style={styles.shippingDetailGroup}>
          <div style={styles.detailItem}>
            <FaMapMarkerAlt style={styles.icon} />
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Người nhận:</p>
              <p style={styles.detailValue}>{shippingData.recipientName}</p>
            </div>
          </div>
          <div style={styles.detailItem}>
            <FaPhone style={styles.icon} />
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Số điện thoại:</p>
              <p style={styles.detailValue}>{shippingData.phone}</p>
            </div>
          </div>

          <div style={{ ...styles.detailItem, ...styles.fullWidthItem }}>
            <FaMapMarkerAlt style={styles.icon} />
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Địa chỉ:</p>
              <p style={styles.detailValue}>{shippingData.address}</p>
            </div>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.shippingDetailGroup}>
          <div style={styles.detailItem}>
            <FaTruck style={styles.icon} />
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Đơn vị vận chuyển:</p>
              <p style={styles.detailValue}>{shippingData.carrier}</p>
            </div>
          </div>

          <div style={styles.detailItem}>
            <FaClock style={styles.icon} />
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Dự kiến giao:</p>
              <p style={styles.detailValue}>
                {formatDate(shippingData.estimatedDeliveryDate)}
              </p>
            </div>
          </div>

          <div style={{ ...styles.detailItem, ...styles.fullWidthItem }}>
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Mã vận đơn:</p>
              {shippingData.trackingUrl && shippingData.trackingNumber ? (
                <a
                  href={shippingData.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.trackingNumberLink}
                >
                  **{shippingData.trackingNumber}**
                </a>
              ) : (
                <p style={styles.detailValue}>
                  **{shippingData.trackingNumber || "Chưa có mã"}**
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. DÒNG THỜI GIAN VẬN CHUYỂN CHI TIẾT */}
      <OrderTimeline orderId={orderId} />
    </div>
  );
};

export default ShippingInformation;
