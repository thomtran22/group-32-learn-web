import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBoxes, FaShoppingCart, FaUsers, FaExclamationTriangle } from 'react-icons/fa';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
// Import API mới
import { apiGetDashboardStats, apiGetRevenueStats } from '../../services/adminApi';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClass}`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800 my-1">{value}</h2>
            {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [period, setPeriod] = useState('day');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        fetchRevenueData();
    }, [period]);

    const fetchDashboardData = async () => {
        try {
            const res = await apiGetDashboardStats();
            if (res.success) {
                setStats(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRevenueData = async () => {
        try {
            const res = await apiGetRevenueStats(period);
            if (res.success) {
                // Transform data for Recharts based on period
                const chartData = res.data.map(item => {
                    let label = '';
                    const { _id } = item;
                    if (period === 'day') label = `${_id.day}/${_id.month}`;
                    else if (period === 'week') label = `Tuần ${_id.week}`;
                    else if (period === 'month') label = `Tháng ${_id.month}`;
                    else label = `${_id.year}`;

                    return {
                        name: label,
                        revenue: item.totalRevenue,
                        orders: item.orderCount
                    };
                });
                setRevenueData(chartData);
            }
        } catch (error) {
            console.error("Failed to fetch revenue", error);
        }
    };

    const formatCurrency = (val) => val?.toLocaleString('vi-VN') + 'đ';

    if (loading) return <div className="p-10 text-center text-gray-500">Đang tải dữ liệu...</div>;

    // Backend trả về mảng [{_id: 'Status', count: 10}], map lại cho PieChart
    const orderStatusData = stats?.orders?.map(item => ({ name: item._id, value: item.count })) || [];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Doanh thu hôm nay"
                    value={formatCurrency(stats?.revenue?.today)}
                    icon={FaChartLine}
                    colorClass="bg-green-500 shadow-green-200"
                    subtitle={`Tổng: ${formatCurrency(stats?.revenue?.total)}`}
                />
                <StatCard
                    title="Đơn hàng"
                    value={stats?.orders?.reduce((sum, o) => sum + o.count, 0) || 0}
                    icon={FaShoppingCart}
                    colorClass="bg-blue-500 shadow-blue-200"
                />
                <StatCard
                    title="Sản phẩm"
                    value={stats?.products?.total || 0}
                    icon={FaBoxes}
                    colorClass="bg-teal-500 shadow-teal-200"
                />
                <StatCard
                    title="Khách hàng"
                    value={stats?.users?.customers || 0}
                    icon={FaUsers}
                    colorClass="bg-purple-500 shadow-purple-200"
                />
            </div>

            {/* Charts Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-700">Biểu đồ Doanh thu</h3>
                    <div className="flex bg-gray-100 rounded p-1">
                        {['day', 'week', 'month', 'year'].map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-4 py-1.5 text-sm rounded transition-all ${
                                    period === p ? 'bg-white shadow text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {p === 'day' ? 'Ngày' : p === 'week' ? 'Tuần' : p === 'month' ? 'Tháng' : 'Năm'}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                            <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Doanh thu" />
                            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Số đơn" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Trạng thái đơn hàng</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {stats?.products?.lowStock > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg flex items-start gap-4 h-fit">
                        <FaExclamationTriangle className="text-yellow-500 text-3xl flex-shrink-0" />
                        <div>
                            <h3 className="text-yellow-800 font-bold text-lg">Cảnh báo Tồn kho</h3>
                            <p className="text-yellow-700 mt-1">
                                Hiện có <strong className="text-xl">{stats.products.lowStock}</strong> sản phẩm dưới mức tồn kho tối thiểu.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;