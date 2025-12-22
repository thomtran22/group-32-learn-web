import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  apiViewOrders,
  apiGetOrderDetail,
  apiCancelOrder,
  apiReceiveOrder,
} from "../../services/orderApi";
import OrderTabs from "../order/OrderTabs";
import OrderSearch from "../order/OrderSearch";
import OrderCard from "../order/OrderCard";
import EmptyState from "../order/EmptyState";
import ShippingInformation from "./ShippingInformation";
import "../../assets/css/userprofile.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const [view, setView] = useState("list");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      try {
        await apiCancelOrder(orderId);
        alert("Hủy đơn hàng thành công!");
        fetchOrders();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Không thể hủy đơn hàng lúc này.");
      }
    }
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiViewOrders();
      const list = data.orders || data;
      setOrders(
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      let matchTab =
        activeTab === "ALL" ||
        (activeTab === "PENDING" && order.status === "Pending") ||
        (activeTab === "PROCESSING" && order.status === "Processing") ||
        (activeTab === "SHIPPING" && order.status === "Shipping") ||
        (activeTab === "DELIVERED" && order.status === "Delivered") ||
        (activeTab === "CANCELLED" && order.status === "Cancelled");
      let matchSearch =
        !searchText ||
        order._id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.orderItems.some((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, searchText]);

  const handleViewDetail = async (orderId) => {
    setView("detail");
    setLoading(true);
    try {
      const res = await apiGetOrderDetail(orderId);

      setSelectedOrder(res.order || res);
    } catch (err) {
      console.error("Lỗi lấy chi tiết đơn:", err);
      setView("list");
    } finally {
      setLoading(false);
    }
  };

  if (loading && view === "list" && orders.length === 0)
    return <div className="user-profile-content">Đang tải dữ liệu...</div>;

  return (
    <div className="order-history-container">
      {view === "list" ? (
        <>
          <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div style={{ margin: "15px 0" }}>
            <OrderSearch onSearch={setSearchText} />
          </div>
          {filteredOrders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="order-list">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onOrderClick={handleViewDetail}
                  onCancelOrder={handleCancelOrder}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="order-detail-view">
          <button
            onClick={() => setView("list")}
            className="btn-link"
            style={{ marginBottom: 15 }}
          >
            <FaArrowLeft /> Quay lại Danh sách
          </button>
          {loading ? (
            <p>Đang tải chi tiết...</p>
          ) : selectedOrder ? (
            <ShippingInformation orderId={selectedOrder?._id} />
          ) : (
            <p className="status-badge status-error">Lỗi dữ liệu.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
