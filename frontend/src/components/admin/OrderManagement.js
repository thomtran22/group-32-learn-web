import React, { useState, useEffect } from 'react';
import { apiGetAllOrders } from '../../services/adminApi';

const OrderManagement = () => {
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
             {/* Header: Mobile xếp dọc, Desktop xếp ngang */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
                
                {/* Ví dụ: Nếu bạn bỏ Search Input vào đây, hãy bọc nó trong div w-full md:w-auto */}
                {/* ... Search Inputs ... */}
             </div>

            {/* Table Container: Thêm border và xử lý cuộn ngang */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                
                {/* --- RESPONSIVE FIX: Thêm div overflow-x-auto --- */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thanh toán</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipper</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 text-sm font-mono font-bold text-blue-600">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900">{order.shippingAddress?.fullName}</div>
                                        <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                                        {/* truncate w-40 giữ nguyên để cắt bớt địa chỉ dài */}
                                        <div className="text-xs text-gray-400 truncate w-40" title={formatAddress(order.shippingAddress)}>
                                            {order.shippingAddress?.city}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="font-bold">{order.totalPrice?.toLocaleString()}đ</div>
                                        <div className="text-xs text-gray-500">{order.paymentMethod}</div>
                                        {order.isPaid ? 
                                            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">Đã TT</span> : 
                                            <span className="text-orange-600 text-xs font-bold bg-orange-50 px-2 py-0.5 rounded-full">Chưa TT</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.shipperId ? (
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium">{order.shipperId.fullName}</span>
                                            </div>
                                        ) : (
                                            <span className="italic text-gray-400 text-xs">Chưa nhận đơn</span>
                                        )}
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Pagination Controls - Nếu có thêm phân trang, hãy wrap nó tương tự header */}
        </div>
    );
};

export default OrderManagement;