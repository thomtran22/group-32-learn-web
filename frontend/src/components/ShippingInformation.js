import React, { useState, useEffect } from "react";
import axios from "./../utils/axiosConfig";
import { FaMapMarkerAlt, FaPhone, FaTruck, FaClock } from "react-icons/fa";
import OrderTimeline from "./OrderTimeline";

const BASE_URL = "http://localhost:5000/api";
const SHIPPING_INFO_ENDPOINT = "/orders";

const styles = {
  shippingInfoBox: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: "30px",
  },
  shippingInfoTitle: {
    fontSize: "1.3em",
    color: "#333",
    marginBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  shippingDetailGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "15px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 45%",
  },
  fullWidthItem: {
    flex: "1 1 100%",
  },
  icon: {
    fontSize: "1.2em",
    color: "#c90000",
    marginRight: "10px",
  },
  detailContent: {
    display: "flex",
    flexDirection: "column",
  },
  detailLabel: {
    margin: 0,
    fontSize: "0.8em",
    color: "#777",
  },
  detailValue: {
    margin: 0,
    fontSize: "1em",
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    border: "none",
    borderTop: "1px dashed #ccc",
    margin: "10px 0 20px 0",
  },
  trackingNumberLink: {
    fontWeight: "bold",
    color: "#007bff",
    textDecoration: "none",
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
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${BASE_URL}${SHIPPING_INFO_ENDPOINT}/${orderId}/shipping-info`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );

        setShippingData(response.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết vận chuyển:", err);
        setError(
          err.response?.data?.message ||
            "Đã xảy ra lỗi khi tải thông tin vận chuyển."
        );
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

      <OrderTimeline orderId={orderId} />
    </div>
  );
};

export default ShippingInformation;
