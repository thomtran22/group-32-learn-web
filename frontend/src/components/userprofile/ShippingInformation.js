import React, { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosConfig";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaTruck,
  FaClock,
  FaUser,
  FaBoxOpen,
} from "react-icons/fa";
import { getStatusInfo, formatMoney } from "../../utils/orderHelpers";
import "../../assets/css/userprofile.css"; // Đảm bảo import css

const ShippingInformation = ({ orderId }) => {
  const [shippingData, setShippingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      if (!orderId) return;
      setIsLoading(true);
      try {
        const response = await axiosClient.get(
          `/orders/${orderId}/shipping-info`
        );
        setShippingData(response.data);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchShippingInfo();
  }, [orderId]);

  if (!orderId) return <p>Đang xác thực mã đơn hàng...</p>;
  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error || !shippingData)
    return <p style={{ color: "red" }}>{error || "Lỗi tải dữ liệu"}</p>;

  const statusDisplay = getStatusInfo(shippingData.status);

  return (
    <div className="ship-info-container">
      <h3 className="ship-info-header">
        <FaTruck /> Chi tiết vận chuyển & Đơn hàng
      </h3>

      <div className="ship-info-grid">
        {/* THÔNG TIN NGƯỜI NHẬN */}
        <div>
          <p className="ship-info-section-title">Thông tin người nhận</p>
          <div className="ship-info-detail-item">
            <FaUser className="ship-info-icon" />
            <div>
              <p className="ship-info-label">Họ tên</p>
              <p className="ship-info-value">{shippingData.recipientName}</p>
            </div>
          </div>
          <div className="ship-info-detail-item">
            <FaPhone className="ship-info-icon" />
            <div>
              <p className="ship-info-label">Điện thoại</p>
              <p className="ship-info-value">{shippingData.recipientPhone}</p>
            </div>
          </div>
          <div className="ship-info-detail-item">
            <FaMapMarkerAlt className="ship-info-icon" />
            <div>
              <p className="ship-info-label">Địa chỉ giao hàng</p>
              <p className="ship-info-value">{shippingData.address}</p>
            </div>
          </div>
        </div>

        {/* THÔNG TIN VẬN CHUYỂN */}
        <div>
          <p className="ship-info-section-title">Trạng thái vận chuyển</p>
          <div className="ship-info-detail-item">
            <FaTruck className="ship-info-icon" />
            <div>
              <p className="ship-info-label">Nhân viên giao hàng</p>
              <p className="ship-info-value">
                {shippingData.shipperName || "Chưa có shipper nhận đơn"}
              </p>
            </div>
          </div>
          {shippingData.shipperPhone && (
            <div className="ship-info-detail-item">
              <FaPhone className="ship-info-icon" />
              <div>
                <p className="ship-info-label">SĐT Shipper</p>
                <p className="ship-info-value">{shippingData.shipperPhone}</p>
              </div>
            </div>
          )}
          <div className="ship-info-detail-item">
            <FaClock className="ship-info-icon" />
            <div>
              <p className="ship-info-label">Trạng thái đơn hàng</p>
              <p
                className="ship-info-value"
                style={{ color: statusDisplay.color }}
              >
                {statusDisplay.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="ship-info-product-list">
        <p className="ship-info-section-title">
          <FaBoxOpen /> Sản phẩm trong đơn
        </p>
        {shippingData.orderItems?.map((item, index) => (
          <div key={index} className="ship-info-product-item">
            <div className="ship-info-product-detail">
              <img
                src={item.image}
                alt={item.name}
                className="ship-info-product-img"
              />
              <div>
                <p className="ship-info-value" style={{ fontSize: "0.9em" }}>
                  {item.name}
                </p>
                <p className="ship-info-label">
                  Phân loại: {item.color}, {item.size} | x{item.quantity}
                </p>
              </div>
            </div>
            <p className="ship-info-value">{formatMoney(item.price)}</p>
          </div>
        ))}
      </div>

      {/* TỔNG TIỀN */}
      <div className="ship-info-total-section">
        <span className="ship-info-total-label">Tổng thanh toán:</span>
        <span className="ship-info-total-price">
          {formatMoney(shippingData.totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default ShippingInformation;
