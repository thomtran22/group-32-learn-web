import React, { useState, useEffect } from 'react';
import { FaSearch, FaTruck, FaMotorcycle, FaStar, FaCarSide } from 'react-icons/fa';
import { apiGetAllShippers, apiUpdateShipperStatus } from '../../services/adminApi';

const ShipperManagement = () => {
    const [shippers, setShippers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchShippers();
    }, []);

    const fetchShippers = async () => {
        setLoading(true);
        try {
            const res = await apiGetAllShippers();
            setShippers(res.shippers || []);
        } catch (error) {
            console.error('Error fetching shippers:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateShipperStatus = async (shipperId, newStatus) => {
        // Optimistic update
        const originalShippers = [...shippers];
        setShippers(shippers.map(s => 
            s._id === shipperId 
                ? { ...s, info: { ...s.info, status: newStatus } } 
                : s
        ));

        try {
            await apiUpdateShipperStatus(shipperId, newStatus);
        } catch (error) {
            alert('Cập nhật thất bại');
            setShippers(originalShippers);
        }
    };

    // ... (Giữ nguyên các hàm helper calculateSuccessRate, getVehicleIcon, filteredShippers từ file cũ)
    const calculateSuccessRate = (performance) => {
        if (!performance || !performance.totalDeliveries) return 0;
        return ((performance.successfulDeliveries / performance.totalDeliveries) * 100).toFixed(1);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
            case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'BUSY': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getVehicleIcon = (type) => {
        const lowerType = type?.toLowerCase() || '';
        if (lowerType.includes('car') || lowerType.includes('truck') || lowerType.includes('tải')) {
            return <FaCarSide className="text-blue-500" />;
        }
        return <FaMotorcycle className="text-purple-500" />;
    };

    const filteredShippers = shippers.filter(shipper => 
        shipper.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipper.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* UI giữ nguyên như cũ, chỉ thay logic data source */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Shipper</h1>
                {/* ... */}
            </div>
             {/* Search Bar */}
             <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="relative max-w-md">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
                    />
                </div>
            </div>

            {/* Table Rendering Code (Copy từ file cũ, logic map filteredShippers giữ nguyên) */}
             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thông tin</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredShippers.map(shipper => (
                            <tr key={shipper._id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{shipper.fullName}</div>
                                    <div className="text-sm text-gray-500">{shipper.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(shipper.info?.status)}`}>
                                        {shipper.info?.status || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <select
                                        value={shipper.info?.status || 'INACTIVE'}
                                        onChange={(e) => updateShipperStatus(shipper._id, e.target.value)}
                                        className="border rounded p-1 text-sm"
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="BUSY">Busy</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShipperManagement;