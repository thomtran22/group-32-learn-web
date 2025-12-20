import React, { useEffect, useState, useMemo } from 'react';
import { apiViewOrders, apiCancelOrder, apiReceiveOrder } from '../services/orderApi';
import OrderTabs from '../components/order/OrderTabs';
import OrderSearch from '../components/order/OrderSearch';
import OrderCard from '../components/order/OrderCard';
import EmptyState from '../components/order/EmptyState';
import { ORDER_TABS } from '../utils/orderHelpers'; 

// 1. Import thư viện mới
import Swal from 'sweetalert2'; // Popup xác nhận đẹp
import { toast, ToastContainer } from 'react-toastify'; // Thông báo góc màn hình
import 'react-toastify/dist/ReactToastify.css'; // CSS cho toast

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ALL'); 
    const [searchText, setSearchText] = useState('');

    // Fetch dữ liệu khi mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await apiViewOrders();
                if (data.success) {
                    const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error("Lỗi tải đơn hàng:", error);
                // Thay thế console log bằng Toast báo lỗi nhẹ nhàng
                toast.error("Không thể tải danh sách đơn hàng.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Xử lý Hủy đơn hàng (Dùng SweetAlert2)
    const handleCancelOrder = async (orderId) => {
        // Thay window.confirm bằng Swal.fire
        const result = await Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn muốn hủy đơn hàng này? Hành động này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Màu đỏ cho nút hủy
            cancelButtonColor: '#3085d6', // Màu xanh cho nút đóng
            confirmButtonText: 'Đúng, hủy đơn!',
            cancelButtonText: 'Không, giữ lại'
        });

        if (!result.isConfirmed) return; // Nếu người dùng bấm Cancel thì thoát

        try {
            const res = await apiCancelOrder(orderId);
            if (res.success) {
                setOrders(prevOrders => prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: 'Cancelled' } : order
                ));
                
                // Thay alert bằng SweetAlert success hoặc Toast
                Swal.fire(
                    'Đã hủy!',
                    'Đơn hàng của bạn đã được hủy thành công.',
                    'success'
                );
            } else {
                toast.error(res.message || "Hủy đơn thất bại");
            }
        } catch (error) {
            console.error("Lỗi hủy đơn:", error);
            toast.error("Lỗi kết nối server, vui lòng thử lại.");
        }
    };

    // Xử lý Xác nhận đã nhận hàng (Dùng SweetAlert2)
    const handleConfirmReceived = async (orderId) => {
        const result = await Swal.fire({
            title: 'Xác nhận đã nhận hàng?',
            text: "Bạn xác nhận đã nhận được sản phẩm và hài lòng với chất lượng?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745', // Màu xanh lá uy tín
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận đã nhận',
            cancelButtonText: 'Chưa nhận được'
        });

        if (!result.isConfirmed) return;

        try {
            const res = await apiReceiveOrder(orderId);
            if (res.success) {
                setOrders(prevOrders => prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: 'Delivered', isDelivered: true, deliveredAt: Date.now() } : order
                ));
                
                // Báo thành công bằng Toast cho gọn (hoặc Swal tùy ý)
                toast.success("Cảm ơn bạn đã mua sắm! 🎉");
            } else {
                toast.error(res.message || "Xác nhận thất bại");
            }
        } catch (error) {
            console.error("Lỗi xác nhận:", error);
            toast.error("Có lỗi xảy ra.");
        }
    };

    // Logic Lọc dữ liệu (Giữ nguyên)
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            let matchTab = false;
            switch (activeTab) {
                case 'ALL': matchTab = true; break;
                case 'PENDING': matchTab = order.status === 'Pending'; break;
                case 'PROCESSING': matchTab = ['Processing', 'Shipping'].includes(order.status); break;
                case 'DELIVERED': matchTab = order.status === 'Delivered'; break;
                case 'CANCELLED': matchTab = order.status === 'Cancelled'; break;
                default: matchTab = true;
            }

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

    if (loading) {
        return <div className="loading-spinner">Đang tải...</div>;
    }

    return (
        <div className="order-page-container">
            {/* 2. Đặt ToastContainer ở đây để nó hiển thị được */}
            <ToastContainer position="top-right" autoClose={3000} />

            <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="order-container">
                <OrderSearch onSearch={setSearchText} />

                {filteredOrders.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="order-list">
                        {filteredOrders.map((order) => (
                            <OrderCard 
                                key={order._id} 
                                order={order} 
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