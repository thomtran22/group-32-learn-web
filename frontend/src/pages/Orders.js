// src/pages/MyOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/orders/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setOrders(data.orders);
            }
        };
        fetchOrders();
    }, []);

    // Hàm hiển thị màu sắc trạng thái
    const getStatusBadge = (isPaid, status) => {
        if (status === 'Cancelled') return <span className="badge bg-danger">Đã hủy</span>;
        if (isPaid) return <span className="badge bg-success">Đã thanh toán</span>;
        return <span className="badge bg-warning text-dark">Chưa thanh toán</span>;
    };

    return (
        <div className="container mt-5">
            <h2>Lịch sử đơn hàng</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Thanh toán</th>
                        <th>Vận chuyển</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                            <td>{order.totalPrice.toLocaleString('vi-VN')} đ</td>
                            
                            {/* Trạng thái thanh toán */}
                            <td>
                                {order.paymentMethod === 'COD' 
                                    ? 'Thanh toán khi nhận hàng' 
                                    : getStatusBadge(order.isPaid, order.status)
                                }
                            </td>

                            {/* Trạng thái vận chuyển */}
                            <td>{order.status}</td>
                            
                            <td>
                                <Link to={`/orders/${order._id}`} className="btn btn-sm btn-info">Xem</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;