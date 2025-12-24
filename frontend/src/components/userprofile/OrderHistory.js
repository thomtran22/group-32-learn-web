import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  apiViewOrders,
  apiGetOrderDetail,
  apiCancelOrder,
  apiReceiveOrder,
} from "../../services/orderApi";

import { apiAddToCart } from "../../services/cartApi";
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
  const navigate = useNavigate();

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      try {
        await apiCancelOrder(orderId);
        toast.success("Hủy đơn hàng thành công!");
        fetchOrders();
      } catch (err) {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Không thể hủy đơn hàng lúc này."
        );
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

  const handleReorder = async (order) => {
    // 1. Hiển thị thông báo đang xử lý (Loading)
    const toastId = toast.loading("Đang thêm sản phẩm vào giỏ hàng...");

    try {
      const items = order.orderItems;

      if (!items || items.length === 0) {
        toast.update(toastId, {
          render: "Đơn hàng không có dữ liệu sản phẩm!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      const cartPromises = items.map((item) =>
        apiAddToCart({
          productId: item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })
      );

      await Promise.all(cartPromises);
      toast.update(toastId, {
        render: "Đã thêm toàn bộ sản phẩm vào giỏ hàng! 🛒",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/cart");
      }, 1500);
    } catch (err) {
      console.error("Lỗi mua lại:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Một số sản phẩm không còn tồn tại hoặc hết hàng.";

      toast.update(toastId, {
        render: `Mua lại thất bại: ${errorMsg}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleConfirmReceived = async (orderId) => {
    if (
      window.confirm(
        "Bạn xác nhận đã nhận được hàng và muốn hoàn thành đơn hàng này?"
      )
    ) {
      try {
        await apiReceiveOrder(orderId);

        toast.success("Cập nhật trạng thái Hoàn thành thành công!");

        await fetchOrders();
        setActiveTab("COMPLETED");
      } catch (err) {
        console.error("Lỗi khi xác nhận nhận hàng:", err);
        toast.error(
          err.response?.data?.message ||
            "Không thể cập nhật trạng thái đơn hàng."
        );
      }
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      let matchTab = false;

      switch (activeTab) {
        case "ALL":
          matchTab = true;
          break;
        case "PENDING":
          matchTab = order.status === "Pending";
          break;
        case "PROCESSING":
          matchTab = order.status === "Processing";
          break;
        case "SHIPPING":
          matchTab =
            order.status === "Shipping" || order.status === "Delivered";
          break;
        case "COMPLETED":
          matchTab = order.status === "Completed";
          break;
        case "CANCELLED":
          matchTab = order.status === "Cancelled";
          break;
        default:
          matchTab = true;
      }

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
                  onConfirmReceived={handleConfirmReceived}
                  onReorder={handleReorder}
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
