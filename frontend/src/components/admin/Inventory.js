import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaBoxOpen } from 'react-icons/fa';
import { apiGetInventoryStatus } from '../../services/adminApi';

const Inventory = () => {
    const [lowStockLimit, setLowStockLimit] = useState(10);
    const [data, setData] = useState({ total: 0, lowStock: 0, products: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [lowStockLimit]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await apiGetInventoryStatus({ lowStock: lowStockLimit });
            if (res.success) setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Cảnh báo Tồn kho</h1>
                <div className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border">
                    <span className="text-sm">Cảnh báo khi SL dưới:</span>
                    <input type="number" value={lowStockLimit} onChange={e => setLowStockLimit(e.target.value)} className="w-16 border rounded text-center" />
                    <button onClick={fetchData} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Lọc</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg flex items-center gap-4">
                    <FaExclamationTriangle className="text-yellow-600 text-3xl" />
                    <div>
                        <p className="text-yellow-800 font-medium">Sản phẩm cần nhập hàng</p>
                        <h2 className="text-3xl font-bold text-yellow-900">{data.total}</h2>
                    </div>
                </div>
                 <div className="bg-red-50 border border-red-200 p-6 rounded-lg flex items-center gap-4">
                    <FaBoxOpen className="text-red-600 text-3xl" />
                    <div>
                        <p className="text-red-800 font-medium">Tổng biến thể thiếu</p>
                        <h2 className="text-3xl font-bold text-red-900">{data.lowStock}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chi tiết biến thể (Thấp / Tổng)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? <tr><td colSpan="3" className="p-4 text-center">Loading...</td></tr> : 
                        data.products.map(p => (
                            <tr key={p._id}>
                                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 text-gray-500">{p.sku}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {p.variants.map((v, i) => (
                                            <span key={i} className={`px-2 py-1 text-xs rounded border ${v.quantity < lowStockLimit ? 'bg-red-100 text-red-700 border-red-200 font-bold' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                                {v.color} - {v.size}: {v.quantity}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Inventory;