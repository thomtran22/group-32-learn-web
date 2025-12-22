import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import { apiGetAllOrders, apiUpdateOrderStatus } from '../../services/adminApi';

const OrderManagement = () => {
    // ... (State logic giữ nguyên như cũ)
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ page: 1, pages: 1 });

    useEffect(() => {
        fetchOrders();
    }, [statusFilter, pagination.page]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await apiGetAllOrders({
                page: pagination.page,
                limit: 10,
                status: statusFilter,
                search: search
            });
            if (res.success) {
                setOrders(res.orders);
                setPagination(res.pagination);
            }
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    
    // Helper function hiển thị địa chỉ
    const formatAddress = (addr) => {
        if (!addr) return 'N/A';
        return `${addr.streetAddress}, ${addr.ward}, ${addr.district}, ${addr.city}`;
    };

    return (
        <div>
             {/* Header & Filter giữ nguyên */}
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
             </div>
             {/* ... Search Inputs ... */}

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thanh toán</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipper</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 text-sm font-mono font-bold">#{order._id.slice(-6).toUpperCase()}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-gray-900">{order.shippingAddress?.fullName}</div>
                                    <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                                    <div className="text-xs text-gray-400 truncate w-40" title={formatAddress(order.shippingAddress)}>
                                        {order.shippingAddress?.city}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-bold">{order.totalPrice?.toLocaleString()}đ</div>
                                    <div className="text-xs text-gray-500">{order.paymentMethod}</div>
                                    {order.isPaid ? <span className="text-green-600 text-xs font-bold">Đã TT</span> : <span className="text-orange-500 text-xs">Chưa TT</span>}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {order.shipperId ? order.shipperId.fullName : <span className="italic text-gray-400">Chưa gán</span>}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                                        <FaEye /> Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
        </div>
    );
};

export default OrderManagement;