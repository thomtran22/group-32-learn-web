import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { apiGetAllProductsAdmin, apiCreateProduct, apiDeleteProduct, apiUpdateProduct } from '../../services/adminApi';
import { toast } from 'react-toastify'; // Thông báo góc màn hình
import 'react-toastify/dist/ReactToastify.css'; // CSS cho toast
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 1
    });

    // --- 1. MỚI: State lưu danh sách danh mục và edit id ---
    const [categories, setCategories] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        images: [],
        description: '',
        category: '', // --- 2. MỚI: Thêm trường category vào form ---
        variants: []
    });

    const [tempVariant, setTempVariant] = useState({ color: '', size: '', quantity: '' });

    useEffect(() => {
        fetchProducts();
    }, [pagination.page]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await apiGetAllProductsAdmin({
                limit: pagination.limit,
                page: pagination.page
            });
            if (res.success) {
                setProducts(res.products);
                if (res.pagination) {
                    setPagination(prev => ({ ...prev, ...res.pagination }));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    // --- 4. MỚI: Hàm lấy danh mục từ API public ---
    const fetchCategories = async () => {
        try {
            // Gọi vào route có sẵn: /api/categories
            const res = await axios.get('https://group-32-learn-web-8hmv.onrender.com/api/categories');

            // Tùy vào cấu trúc trả về của controller getCategories
            // Nếu trả về { success: true, categories: [...] } hoặc mảng trực tiếp
            if (res.data.success) {
                setCategories(res.data.categories || []);
            } else if (Array.isArray(res.data)) {
                setCategories(res.data);
            } else {
                // Fallback nếu API trả về data nằm thẳng trong res.data (tùy controller viết thế nào)
                setCategories(res.data.categories || res.data || []);
            }
        } catch (error) {
            console.error("Lỗi lấy danh mục:", error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const token = localStorage.getItem('token');
            const signatureRes = await axios.get('https://group-32-learn-web-8hmv.onrender.com/api/admin/sign-cloudinary', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { timestamp, signature, apiKey, cloudName, folder } = signatureRes.data.data;

            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('api_key', apiKey);
            uploadData.append('timestamp', timestamp);
            uploadData.append('signature', signature);
            uploadData.append('folder', folder);

            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                uploadData
            );

            const imageUrl = res.data.secure_url;
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, imageUrl]
            }));

        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            toast.error("Upload thất bại! Kiểm tra lại quyền Admin hoặc Server.");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProduct = async () => {
        let finalVariants = [...formData.variants];

        if (tempVariant.color && tempVariant.size) {
            finalVariants.push(tempVariant);
        }

        // --- 5. Validate thêm category ---
        if (!formData.name || !formData.sku || finalVariants.length === 0) {
            toast.error("Vui lòng nhập tên, SKU và ít nhất 1 biến thể");
            return;
        }

        try {
            const payload = {
                ...formData,
                variants: finalVariants,
                images: formData.images,
                description: [formData.description], // API mong đợi mảng
                category: formData.category
            };

            let res;
            if (editingProductId) {
                // Update
                res = await apiUpdateProduct(editingProductId, payload);
            } else {
                // Create
                res = await apiCreateProduct(payload);
            }

            if (res.success) {
                toast.success(res.message || (editingProductId ? "Cập nhật thành công!" : "Tạo mới thành công!"));
                closeModal();
                fetchProducts();
            }
        } catch (error) {
            toast.error("Lỗi: " + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (product) => {
        setEditingProductId(product._id);
        setFormData({
            name: product.name,
            sku: product.sku,
            price: product.price,
            images: product.images || [],
            // Nếu description lưu mảng thì lấy phần tử đầu, nếu không thì lấy chính nó
            description: Array.isArray(product.description) ? product.description[0] : (product.description || ''),
            category: product.category?._id || product.category || '',
            variants: product.variants || []
        });
        setTempVariant({ color: '', size: '', quantity: 0 });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProductId(null);
        setFormData({ name: '', sku: '', price: '', images: [], description: '', category: '', variants: [] });
        setTempVariant({ color: '', size: '', quantity: '' });
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Bạn chắc chắn muốn xóa?',
                text: 'Hành động này sẽ xóa sản phẩm vĩnh viễn.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            await apiDeleteProduct(id);
            toast.success('Xóa sản phẩm thành công!');
            fetchProducts();
        } catch (error) {
            toast.error('Xóa thất bại');
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
                    onClick={() => {
                        setEditingProductId(null);
                        setFormData({ name: '', sku: '', price: '', images: [], description: '', category: '', variants: [] });
                        setTempVariant({ color: '', size: '', quantity: '' });
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 text-green-700 font-medium rounded-lg hover:bg-green-50 shadow-sm"
                >
                    <div className="bg-green-100 p-1 rounded-md"><FaPlus size={12} /></div>
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
                                                {/* Hiển thị tên danh mục nếu có */}
                                                <div className="text-xs text-gray-500">{p.category?.name || 'Chưa phân loại'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{p.sku}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{p.price?.toLocaleString()}đ</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                                            {p.variants?.reduce((sum, v) => sum + v.quantity, 0) || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(p)} className="text-blue-600 hover:bg-blue-50 p-2 rounded mr-2"><FaEdit /></button>
                                        <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-4 px-2">
                    {/* <div className="text-sm text-gray-500">
                        Hiển thị {products.length} / {pagination.total} sản phẩm
                    </div> */}
                    <div className="flex gap-2 items-center">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => handlePageChange(pagination.page - 1)}
                            className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trước
                        </button>
                        <span className="text-sm font-medium">
                            Trang {pagination.page} / {pagination.pages}
                        </span>
                        <button
                            disabled={pagination.page === pagination.pages}
                            onClick={() => handlePageChange(pagination.page + 1)}
                            className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Create */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">{editingProductId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                                <input type="text" className={inputClass} placeholder="Nhập tên sản phẩm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>

                            {/* --- 6. MỚI: Dropdown chọn Danh mục --- */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Danh mục</label>
                                <select
                                    className={inputClass}
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* ------------------------------------- */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">SKU (Mã SP)</label>
                                    <input type="text" className={inputClass} placeholder="VD: SKU-001" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Giá bán (VNĐ)</label>
                                    <input type="number" className={inputClass} placeholder="Nhập giá bán" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : '' })} />
                                </div>
                            </div>

                            {/* --- UPLOAD ẢNH --- */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Hình ảnh sản phẩm</label>
                                <div className="flex flex-wrap items-center gap-4">
                                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition h-16">
                                        <FaCloudUploadAlt className="text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">Thêm ảnh</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                    </label>

                                    {uploading && <div className="flex items-center text-blue-600"><FaSpinner className="animate-spin mr-2" /> Đang tải...</div>}

                                    {formData.images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img src={img} alt="Preview" className="w-16 h-16 object-cover rounded border border-gray-300" />
                                            <button
                                                onClick={() => {
                                                    const newImages = formData.images.filter((_, i) => i !== index);
                                                    setFormData({ ...formData, images: newImages });
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                            >
                                                <FaTimes size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {formData.images.length === 0 && !uploading && <p className="text-xs text-gray-400 mt-1">Chưa có ảnh nào được chọn.</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
                                <textarea className={inputClass} rows="2" placeholder="Nhập mô tả sản phẩm..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>

                            {/* Variants Section */}
                            <div className="border rounded p-4 bg-gray-50">
                                <label className="block text-sm font-medium mb-3 text-gray-700">Quản lý Biến thể (Màu/Size)</label>
                                <div className="flex flex-col md:flex-row gap-2 mb-2">
                                    <input type="text" placeholder="Màu (VD: Đỏ)" className={`${inputClass} w-1/3`} value={tempVariant.color} onChange={e => setTempVariant({ ...tempVariant, color: e.target.value })} />
                                    <input type="text" placeholder="Size (VD: L)" className={`${inputClass} w-1/3`} value={tempVariant.size} onChange={e => setTempVariant({ ...tempVariant, size: e.target.value })} />
                                    <input type="number" placeholder="Số lượng" className={`${inputClass} w-1/3`} value={tempVariant.quantity} onChange={e => setTempVariant({ ...tempVariant, quantity: e.target.value ? Number(e.target.value) : '' })} />
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
                            <button onClick={closeModal} className="px-4 py-2 border rounded hover:bg-gray-100">Hủy</button>
                            <button
                                onClick={handleSaveProduct}
                                disabled={uploading}
                                className={`px-4 py-2 text-white rounded ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {editingProductId ? 'Cập nhật' : 'Lưu sản phẩm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;