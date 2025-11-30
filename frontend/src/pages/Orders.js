import React, { useEffect, useState } from 'react';
import { apiViewOrders } from '../services/orderApi';
import OrderTabs from '../components/Order/OrderTabs';
import OrderSearch from '../components/Order/OrderSearch';
import OrderCard from '../components/Order/OrderCard';
import EmptyState from '../components/Order/EmptyState';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

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
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Logic lọc đơn hàng theo Tab
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Pending') return ['Pending', 'Confirmed'].includes(order.status);
        if (activeTab === 'Shipping') return ['Processing', 'Shipping'].includes(order.status);
        return order.status === activeTab;
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="order-page-container">
            <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="order-container">
                <OrderSearch />

                {filteredOrders.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="order-list">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;