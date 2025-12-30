import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBoxes, FaShoppingCart, FaUsers, FaExclamationTriangle } from 'react-icons/fa';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
// Import API mới
import { apiGetDashboardStats, apiGetRevenueStats } from '../../services/adminApi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays, startOfMonth, endOfMonth, startOfToday, endOfToday, format, eachDayOfInterval, eachHourOfInterval, eachMonthOfInterval, getYear, getMonth, getDate } from 'date-fns';

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
    const [loading, setLoading] = useState(true);
    const [loadingChart, setLoadingChart] = useState(true);

    // STATE MỚI: Quản lý khoảng thời gian
    const [dateRange, setDateRange] = useState([subDays(new Date(), 6), new Date()]);
    const [startDate, endDate] = dateRange;
    const [activePreset, setActivePreset] = useState('7days');

    const presets = {
        'today': { label: 'Hôm nay', range: [startOfToday(), endOfToday()] },
        'yesterday': { label: 'Hôm qua', range: [subDays(startOfToday(), 1), subDays(endOfToday(), 1)] },
        '7days': { label: '7 ngày qua', range: [subDays(new Date(), 6), new Date()] },
        '30days': { label: '30 ngày qua', range: [subDays(new Date(), 29), new Date()] },
        'thisMonth': { label: 'Tháng này', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            fetchRevenueData();
        }
    }, [dateRange]); // Chạy lại khi dateRange thay đổi

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
        setLoadingChart(true);
        try {
            const res = await apiGetRevenueStats({
                startDate: format(startDate, 'yyyy-MM-dd'),
                endDate: format(endDate, 'yyyy-MM-dd')
            });

            if (res.success) {
                // LOGIC "ZERO-FILLING" ĐỂ LẤP ĐẦY DỮ LIỆU TRỐNG
                const daysDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
                let templateData = [];

                if (daysDiff <= 1) { // Group theo giờ
                    templateData = eachHourOfInterval({ start: startDate, end: endDate }).map(d => ({
                        name: format(d, 'HH:mm'),
                        key: format(d, 'yyyy-MM-dd\'T\'HH:00:00.000Z')
                    }));
                } else if (daysDiff <= 90) { // Group theo ngày
                    templateData = eachDayOfInterval({ start: startDate, end: endDate }).map(d => ({
                        name: format(d, 'dd/MM'),
                        key: format(d, 'yyyy-MM-dd')
                    }));
                } else { // Group theo tháng
                    templateData = eachMonthOfInterval({ start: startDate, end: endDate }).map(d => ({
                        name: `T${format(d, 'M')}/${format(d, 'yy')}`,
                        key: format(d, 'yyyy-MM')
                    }));
                }

                const apiDataMap = new Map(res.data.map(item => [item._id, item]));

                const chartData = templateData.map(template => {
                    const apiData = apiDataMap.get(template.key);
                    return {
                        name: template.name,
                        revenue: apiData ? apiData.totalRevenue : 0,
                        orders: apiData ? apiData.orderCount : 0,
                    };
                });
                
                setRevenueData(chartData);
            }
        } catch (error) {
            console.error("Failed to fetch revenue", error);
            setRevenueData([]); // Xóa dữ liệu cũ nếu lỗi
        } finally {
            setLoadingChart(false);
        }
    };
    
    const handlePresetClick = (key) => {
        setActivePreset(key);
        setDateRange(presets[key].range);
    }
    
    const handleDateChange = (update) => {
        setDateRange(update);
        if (update[1]) { // Chỉ bỏ active preset khi đã chọn xong cả 2 ngày
            setActivePreset(null);
        }
    }

    const formatCurrency = (val) => val?.toLocaleString('vi-VN') + 'đ';
    if (loading) return <div className="p-10 text-center text-gray-500">Đang tải dữ liệu...</div>;
    const orderStatusData = stats?.orders?.map(item => ({ name: item._id, value: item.count })) || [];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Stats Cards - Grid này đã ổn: 1 cột mobile, 2 cột tablet, 4 cột desktop */}
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
                {/* Header: Mobile xếp dọc, Desktop xếp ngang */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold text-gray-700">Biểu đồ Doanh thu</h3>
                    
                    {/* Container bộ lọc: Mobile full width */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {Object.entries(presets).map(([key, { label }]) => (
                             <button
                                key={key}
                                onClick={() => handlePresetClick(key)}
                                className={`flex-1 md:flex-none px-3 py-1.5 text-xs md:text-sm rounded transition-all whitespace-nowrap ${
                                    activePreset === key 
                                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                        
                        {/* DatePicker: Mobile full width (w-full), Desktop cố định (md:w-56) */}
                        <div className="w-full md:w-auto mt-2 md:mt-0">
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="w-full md:w-56 text-sm border-gray-300 rounded-md shadow-sm p-1.5 text-center focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Chart Container: Mobile cao 300px, Desktop cao 400px */}
                <div className="h-[300px] md:h-[400px] w-full min-w-0">
                    {loadingChart ? <div className="text-center pt-20">Đang tải biểu đồ...</div> : 
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tickFormatter={val => new Intl.NumberFormat('vi-VN').format(val)} />
                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} allowDecimals={false} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                                formatter={(value, name) => [name === 'Doanh thu' ? formatCurrency(value) : value, name]}
                            />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Doanh thu" />
                            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Số đơn" />
                        </LineChart>
                    </ResponsiveContainer>}
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Trạng thái đơn hàng</h3>
                    <div className="h-[300px] w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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