import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { 
    apiViewOrders, 
    apiGetOrderDetail, 
    apiCancelOrder, 
    apiReceiveOrder 
} from "../../services/orderApi";
import OrderTabs from "../order/OrderTabs";     
import OrderSearch from "../order/OrderSearch";
import OrderCard from "../order/OrderCard";
import EmptyState from "../order/EmptyState";
import ShippingInformation from "../ShippingInformation"; 

const OrderHistory = () => {
  // --- STATE QUẢN LÝ LIST & FILTER (Từ Orders.js) ---
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  
  // --- STATE QUẢN LÝ VIEW (Từ OrderHistory.js cũ) ---
  const [view, setView] = useState("list"); // 'list' | 'detail'
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // --- STATE CHUNG ---
  const [loading, setLoading] = useState(true);
  
  // 1. Tải danh sách đơn hàng
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiViewOrders();
      if (data.success || Array.isArray(data)) { // Tuỳ API trả về object hay array
        // Nếu API trả về { success: true, orders: [] } thì dùng data.orders
        // Nếu API trả về luôn mảng [] thì dùng data
        const list = data.orders || data; 
        // Sắp xếp mới nhất lên đầu
        setOrders(list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error("Lỗi tải đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 2. Logic Filter & Search (Từ Orders.js)
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
        // Lọc theo Tab
        let matchTab = false;
        switch (activeTab) {
            case 'ALL': matchTab = true; break;
            case 'PENDING': matchTab = order.status === 'Pending'; break;
            case 'PROCESSING': matchTab = ['Processing', 'Shipping'].includes(order.status); break;
            case 'DELIVERED': matchTab = order.status === 'Delivered'; break;
            case 'CANCELLED': matchTab = order.status === 'Cancelled'; break;
            default: matchTab = true;
        }

        // Lọc theo Search
        let matchSearch = true;
        if (searchText) {
            const keyword = searchText.toLowerCase();
            const orderIdMatch = order._id.toLowerCase().includes(keyword);
            const productNameMatch = order.orderItems.some(item => 
                item.name.toLowerCase().includes(keyword)
            );
            matchSearch = orderIdMatch || productNameMatch;
        }
        return matchTab && matchSearch;
    });
  }, [orders, activeTab, searchText]);

  // Các hành động (Cancel, Receive)
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
    try {
        const res = await apiCancelOrder(orderId);
        // Giả sử API trả về success
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'Cancelled' } : o));
        alert("Đã hủy đơn hàng.");
    } catch (error) {
        alert("Lỗi hủy đơn: " + (error.message || "Lỗi server"));
    }
  };

  const handleConfirmReceived = async (orderId) => {
    if (!window.confirm("Xác nhận đã nhận được hàng?")) return;
    try {
        const res = await apiReceiveOrder(orderId);
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'Delivered' } : o));
        alert("Xác nhận thành công!");
    } catch (error) {
        console.error(error);
    }
  };

  // Xử lý Xem chi tiết
  const handleViewDetail = async (orderId) => {
    // Chuyển sang view detail ngay lập tức để UI phản hồi nhanh
    setView("detail");
    setLoading(true); 
    try {
      const data = await apiGetOrderDetail(orderId);
      setSelectedOrder(data);
    } catch (err) {
      alert("Không thể tải chi tiết đơn hàng");
      setView("list"); // Quay lại nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedOrder(null);
  };

  if (loading && view === 'list' && orders.length === 0) {
      return <div style={{padding: 20}}>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="order-history-container" style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER: Tiêu đề thay đổi dựa trên View */}
      <h2 style={{ color: "#c90000", borderBottom: "2px solid #c90000", paddingBottom: 10 }}>
        {view === "list" ? "Lịch sử Đơn hàng" : `Chi tiết Đơn hàng`}
      </h2>

      {view === "list" && (
        <>
          {/* Tabs */}
          <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Search */}
          <div style={{ marginTop: 15, marginBottom: 15 }}>
            <OrderSearch onSearch={setSearchText} />
          </div>

          {/* List Cards */}
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
                    />
                ))}
            </div>
          )}
        </>
      )}

      {view === "detail" && (
        <div className="order-detail-view">
            <button
                onClick={handleBackToList}
                style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                marginBottom: 15,
                fontWeight: "bold",
                display: "flex", alignItems: "center"
                }}
            >
                <FaArrowLeft style={{ marginRight: 5 }} />
                Quay lại Danh sách
            </button>

            {loading ? (
                <p>Đang tải chi tiết...</p>
            ) : selectedOrder ? (
                <ShippingInformation orderDetail={selectedOrder} />
            ) : (
                <p style={{ color: "red" }}>Không tìm thấy thông tin đơn hàng.</p>
            )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;