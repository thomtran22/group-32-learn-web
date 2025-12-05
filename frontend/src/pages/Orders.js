import React, { useEffect, useState, useMemo } from 'react';
// Import các API cần thiết (giả sử bạn đã viết thêm apiCancelOrder, apiConfirmReceived)
import { apiViewOrders, apiCancelOrder, apiReceiveOrder } from '../services/orderApi';
import OrderTabs from '../components/Order/OrderTabs';
import OrderSearch from '../components/Order/OrderSearch';
import OrderCard from '../components/Order/OrderCard';
import EmptyState from '../components/Order/EmptyState';
// Import constant tab ID để đảm bảo đồng bộ
import { ORDER_TABS } from '../utils/orderHelpers'; 

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ALL'); // Mặc định là 'ALL'
    const [searchText, setSearchText] = useState('');

    // 1. Fetch dữ liệu khi mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await apiViewOrders();
                if (data.success) {
                    // Sắp xếp đơn mới nhất lên đầu
                    const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error("Lỗi tải đơn hàng:", error);
                // Có thể thêm toast error tại đây
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // 2. Xử lý Hủy đơn hàng (Truyền xuống OrderCard)
    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

        try {
            const res = await apiCancelOrder(orderId);
            if (res.success) {
                // Cập nhật state trực tiếp để UI thay đổi ngay lập tức
                setOrders(prevOrders => prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: 'Cancelled' } : order
                ));
                alert("Đã hủy đơn hàng thành công");
            } else {
                alert(res.message || "Hủy đơn thất bại");
            }
        } catch (error) {
            console.error("Lỗi hủy đơn:", error);
            alert("Lỗi kết nối server");
        }
    };

    // 3. Xử lý Xác nhận đã nhận hàng (Truyền xuống OrderCard)
    const handleConfirmReceived = async (orderId) => {
        if (!window.confirm("Bạn xác nhận đã nhận được hàng và hài lòng với sản phẩm?")) return;

        try {
            const res = await apiReceiveOrder(orderId); // API gọi endpoint update status -> Delivered
            if (res.success) {
                setOrders(prevOrders => prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: 'Delivered', isDelivered: true, deliveredAt: Date.now() } : order
                ));
                alert("Xác nhận thành công!");
            }
        } catch (error) {
            console.error("Lỗi xác nhận:", error);
        }
    };

    // 4. Logic Lọc dữ liệu (Dùng useMemo để tối ưu hiệu năng)
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            // A. Lọc theo Tab
            let matchTab = false;
            switch (activeTab) {
                case 'ALL':
                    matchTab = true;
                    break;
                case 'PENDING':
                    // Pending: Chờ xác nhận (hoặc chờ thanh toán VNPay)
                    matchTab = order.status === 'Pending';
                    break;
                case 'PROCESSING':
                    // Tab Vận chuyển bao gồm: Đang chuẩn bị (Processing) + Đang giao (Shipping)
                    matchTab = ['Processing', 'Shipping'].includes(order.status);
                    break;
                case 'DELIVERED':
                    matchTab = order.status === 'Delivered';
                    break;
                case 'CANCELLED':
                    matchTab = order.status === 'Cancelled';
                    break;
                default:
                    matchTab = true;
            }

            // B. Lọc theo Search Text (Mã đơn hoặc Tên sản phẩm)
            let matchSearch = true;
            if (searchText) {
                const keyword = searchText.toLowerCase();
                const orderIdMatch = order._id.toLowerCase().includes(keyword);
                // Tìm trong danh sách item xem có tên sản phẩm nào khớp không
                const productNameMatch = order.orderItems.some(item => 
                    item.name.toLowerCase().includes(keyword)
                );
                matchSearch = orderIdMatch || productNameMatch;
            }

            return matchTab && matchSearch;
        });
    }, [orders, activeTab, searchText]);

    if (loading) {
        return <div className="loading-spinner">Đang tải...</div>; // CSS Spinner của bạn
    }

    return (
        <div className="order-page-container">
            {/* Truyền activeTab và hàm set */}
            <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="order-container">
                {/* Nhận keyword từ Component Search */}
                <OrderSearch onSearch={setSearchText} />

                {filteredOrders.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="order-list">
                        {filteredOrders.map((order) => (
                            <OrderCard 
                                key={order._id} 
                                order={order} 
                                // Truyền hàm xử lý xuống
                                onCancelOrder={handleCancelOrder}
                                onConfirmReceived={handleConfirmReceived}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;