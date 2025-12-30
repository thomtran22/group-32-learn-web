import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { 
    apiViewOrders, 
    apiGetOrderDetail, 
    apiCancelOrder, 
    apiReceiveOrder,
    apiCreatePaymentUrl
} from "../../services/orderApi";

import { apiAddToCart } from "../../services/cartApi";
import OrderTabs from "../order/OrderTabs";
import OrderSearch from "../order/OrderSearch";
import OrderCard from "../order/OrderCard";
import EmptyState from "../order/EmptyState";
import ShippingInformation from "./ShippingInformation";
import "../../assets/css/userprofile.css";

import { toast } from 'react-toastify'; // Thông báo góc màn hình
import 'react-toastify/dist/ReactToastify.css'; // CSS cho toast
import Swal from 'sweetalert2';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const [view, setView] = useState("list");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
        text: 'Hành động này không thể hoàn tác.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hủy đơn',
        cancelButtonText: 'Bỏ qua'
      });

      if (!result.isConfirmed) return;

      await apiCancelOrder(orderId);
      toast.success('Hủy đơn hàng thành công!');
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || 'Không thể hủy đơn hàng lúc này.'
      );
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
    try {
      const result = await Swal.fire({
        title: 'Xác nhận đã nhận hàng',
        text: 'Bạn xác nhận đã nhận được hàng và muốn hoàn thành đơn hàng này?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d'
      });

      if (!result.isConfirmed) return;

      await apiReceiveOrder(orderId);
      toast.success('Cập nhật trạng thái Hoàn thành thành công!');
      await fetchOrders();
      setActiveTab('COMPLETED');
    } catch (err) {
      console.error('Lỗi khi xác nhận nhận hàng:', err);
      toast.error(
        err.response?.data?.message || 'Không thể cập nhật trạng thái đơn hàng.'
      );
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

  const handlePayNow = async (order) => {
    const toastId = toast.loading("Đang kết nối cổng thanh toán VNPAY...");
    
    try {
        const vnpayData = {
            orderId: order._id,
            amount: order.totalPrice, // Lấy tổng tiền từ đơn hàng cũ
            language: 'vn'
        };

        const res = await apiCreatePaymentUrl(vnpayData);
        if (res.success && res.url) {
            window.location.href = res.url; 
        } else {
            // Nếu thất bại
            toast.update(toastId, { 
                render: "Không thể tạo liên kết thanh toán.", 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    } catch (error) {
        console.error(error);
        toast.update(toastId, { 
            render: "Lỗi kết nối server.", 
            type: "error", 
            isLoading: false, 
            autoClose: 3000 
        });
      }
  };
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
                        // Truyền các hàm xử lý
                        onCancelOrder={handleCancelOrder}
                        onConfirmReceived={handleConfirmReceived}
                        // Truyền hàm này để chặn navigate mặc định
                        onOrderClick={handleViewDetail} 
                        onPayNow={handlePayNow}
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
