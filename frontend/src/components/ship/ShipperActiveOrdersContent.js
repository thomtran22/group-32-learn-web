import React, { useState, useEffect, useCallback } from "react";
import axios from "../../utils/axiosConfig";
import {
  FaMapMarkerAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "../../assets/css/shipper.css";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const ShipperActiveOrdersContent = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchActiveOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/shipper/orders/active");
      setActiveOrders(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveOrders();
  }, [fetchActiveOrders]);

  const updateStatus = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: 'Xác nhận cập nhật trạng thái?',
        text: 'Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d'
      });

      if (!result.isConfirmed) return;

      await axios.put(`/shipper/orders/${id}/status`, { newStatus: status });
      fetchActiveOrders();
      toast.success('Cập nhật trạng thái thành công');
    } catch (err) {
      console.error(err);
      toast.error('Lỗi cập nhật');
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>📦 Đơn Hàng Đang Giao</h2>
        <button
          className="btn-ship btn-ship-outline"
          onClick={fetchActiveOrders}
        >
          <FaSyncAlt /> Làm mới
        </button>
      </div>

      {activeOrders.map((order) => (
        <div key={order._id} className="order-accordion-item">
          <div
            className="order-summary-row"
            onClick={() =>
              setExpandedOrderId(
                expandedOrderId === order._id ? null : order._id
              )
            }
          >
            <div>
              <strong>#{order._id.slice(-6)}</strong>
            </div>
            <div className="badge badge-shipping">Đang giao</div>
            <div style={{ fontWeight: "bold" }}>
              {order.totalPrice.toLocaleString()} đ
            </div>
            {expandedOrderId === order._id ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {expandedOrderId === order._id && (
            <div className="order-expanded-body">
              <p>
                <FaMapMarkerAlt /> {order.shippingAddress?.streetAddress},
                {order.shippingAddress?.ward}, {order.shippingAddress?.district}
                , {order.shippingAddress?.city}
              </p>
              <p>
                <FaClock />{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString("vi-VN")
                  : "N/A"}
              </p>
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  className="btn-ship btn-ship-success"
                  onClick={() => updateStatus(order._id, "Delivered")}
                >
                  <FaCheckCircle /> Giao thành công
                </button>
                <button
                  className="btn-ship btn-ship-primary"
                  onClick={() => updateStatus(order._id, "Cancelled")}
                >
                  Giao thất bại / Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShipperActiveOrdersContent;
