import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';
import { apiGetAllProductsAdmin, apiCreateProduct, apiDeleteProduct } from '../../services/adminApi';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // Form State khớp với Product Model
    const [formData, setFormData] = useState({
        name: '', 
        sku: '', 
        price: 0, 
        images: '', // Nhập 1 link ảnh đại diện cho đơn giản, khi submit sẽ convert sang array
        description: '', // Nhập text, submit sẽ convert thành array 1 phần tử
        variants: [] 
    });
    
    // State tạm cho việc thêm biến thể
    const [tempVariant, setTempVariant] = useState({ color: '', size: '', quantity: 0 });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await apiGetAllProductsAdmin({ limit: 50 });
            if (res.success) setProducts(res.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProduct = async () => {
        // Validate cơ bản
        if (!formData.name || !formData.sku || formData.variants.length === 0) {
            alert("Vui lòng nhập tên, SKU và ít nhất 1 biến thể");
            return;
        }

        try {
            // Chuẩn bị payload khớp với Schema
            const payload = {
                ...formData,
                images: [formData.images], // Convert string to array
                description: [formData.description] // Convert string to array
            };

            await apiCreateProduct(payload);
            alert("Tạo sản phẩm thành công!");
            setShowModal(false);
            fetchProducts();
            
            // Reset form
            setFormData({ name: '', sku: '', price: 0, images: '', description: '', variants: [] });
        } catch (error) {
            alert("Lỗi khi tạo sản phẩm: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Bạn chắc chắn muốn xóa?")) {
            try {
                await apiDeleteProduct(id);
                fetchProducts();
            } catch (error) {
                alert("Xóa thất bại");
            }
        }
    };

    const addVariant = () => {
        if (!tempVariant.color || !tempVariant.size) return;
        setFormData({
            ...formData, 
            variants: [...formData.variants, tempVariant]
        });
        setTempVariant({ color: '', size: '', quantity: 0 });
    };

    const removeVariant = (index) => {
        const newVariants = [...formData.variants];
        newVariants.splice(index, 1);
        setFormData({ ...formData, variants: newVariants });
    };

    const inputClass = "w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 text-green-700 font-medium rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-800 transition-colors shadow-sm"
                >
                    <div className="bg-green-100 p-1 rounded-md">
                        <FaPlus size={12} />
                    </div>
                    Thêm sản phẩm mới
                </button>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng Tồn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? <tr><td colSpan="5" className="p-4 text-center">Đang tải...</td></tr> :
                        products.map(p => (
                            <tr key={p._id}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={p.images[0] || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded object-cover border" />
                                        <div>
                                            <div className="font-medium text-gray-900">{p.name}</div>
                                            <div className="text-xs text-gray-500">{p.category?.name || 'Chưa phân loại'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{p.sku}</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-800">{p.price?.toLocaleString()}đ</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                                        {/* Tính tổng tồn kho từ mảng variants */}
                                        {p.variants?.reduce((sum, v) => sum + v.quantity, 0) || 0}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Create */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">Thêm sản phẩm mới</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                                <input type="text" className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">SKU (Mã SP)</label>
                                    <input type="text" className={inputClass} value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Giá bán (VNĐ)</label>
                                    <input type="number" className={inputClass} value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Link Ảnh (URL)</label>
                                <input type="text" className={inputClass} value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
                                <textarea className={inputClass} rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                            </div>
                            
                            {/* Variants Section */}
                            <div className="border rounded p-4 bg-gray-50">
                                <label className="block text-sm font-medium mb-3 text-gray-700">Quản lý Biến thể (Màu/Size)</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" placeholder="Màu (VD: Đỏ)" className={`${inputClass} w-1/3`} value={tempVariant.color} onChange={e => setTempVariant({...tempVariant, color: e.target.value})} />
                                    <input type="text" placeholder="Size (VD: L)" className={`${inputClass} w-1/3`} value={tempVariant.size} onChange={e => setTempVariant({...tempVariant, size: e.target.value})} />
                                    <input type="number" placeholder="Số lượng" className={`${inputClass} w-1/3`} value={tempVariant.quantity} onChange={e => setTempVariant({...tempVariant, quantity: Number(e.target.value)})} />
                                    <button onClick={addVariant} className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">+</button>
                                </div>
                                <div className="space-y-2 mt-3">
                                    {formData.variants.map((v, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white p-2 border rounded text-sm">
                                            <span><span className="font-semibold text-gray-700">{v.color}</span> - Size: {v.size} (SL: {v.quantity})</span>
                                            <button onClick={() => removeVariant(i)} className="text-red-500 hover:text-red-700"><FaTimes /></button>
                                        </div>
                                    ))}
                                    {formData.variants.length === 0 && <p className="text-sm text-gray-500 italic">Chưa có biến thể nào.</p>}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Hủy</button>
                            <button onClick={handleCreateProduct} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu sản phẩm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;