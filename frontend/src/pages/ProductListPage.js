import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PRODUCTS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

function ProductListPage() {
    // Lấy slug từ URL (Phải khớp với tên :categorySlug trong App.js)
    const { categorySlug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPageFromUrl = parseInt(queryParams.get('page')) || 1;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(currentPageFromUrl);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);

    const [filters, setFilters] = useState({
        size: queryParams.get('size') || '',
        sort: queryParams.get('sort') || 'newest',
        priceRange: queryParams.get('priceRange') || ''
    });

    // Cập nhật state khi URL thay đổi
    useEffect(() => {
        setPage(currentPageFromUrl);
        setFilters({
            size: queryParams.get('size') || '',
            sort: queryParams.get('sort') || 'newest',
            priceRange: queryParams.get('priceRange') || ''
        });
    }, [location.search, currentPageFromUrl]);

    // Hàm xử lý khi chọn Size
    const handleSizeChange = (size) => {
        const newSize = filters.size === size ? '' : size;
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', '1');
        if (newSize) newSearchParams.set('size', newSize);
        else newSearchParams.delete('size');
        navigate(`?${newSearchParams.toString()}`, { replace: true });
    };

    // Hàm xử lý khi chọn Sắp xếp
    const handleSortChange = (e) => {
        const newSort = e.target.value;
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('sort', newSort);
        navigate(`?${newSearchParams.toString()}`, { replace: true });
    };

    // Hàm xử lý khi chọn khoảng giá
    const handlePriceChange = (range) => {
        const newRange = filters.priceRange === range ? '' : range;
        const newSearchParams = new URLSearchParams(location.search);

        newSearchParams.set('page', '1');
        if (newRange) newSearchParams.set('priceRange', newRange);
        else newSearchParams.delete('priceRange');

        navigate(`?${newSearchParams.toString()}`, { replace: true });
    };
    // Fetch dữ liệu chính
    useEffect(() => {
        const fetchProducts = async () => {
            // Kiểm tra tính hợp lệ của slug
            if (!categorySlug || categorySlug === 'undefined') {
                console.error("LỖI FRONTEND: categorySlug đang bị undefined. Hãy kiểm tra lại App.js");
                return;
            }

            setLoading(true);
            try {
                let url = `http://localhost:4000/api/products?category=${categorySlug}&page=${page}&limit=${PRODUCTS_PER_PAGE}&sort=${filters.sort}&t=${new Date().getTime()}`;

                if (filters.size) {
                    url += `&size=${filters.size}`;
                }
                if (filters.priceRange) {
                    url += `&priceRange=${filters.priceRange}`;
                }

                const { data } = await axios.get(url);

                if (data && data.products) {
                    setProducts(data.products);
                    setCount(data.count || 0);
                    setPages(data.pages || 1);
                } else {
                    console.warn("Backend trả về dữ liệu không đúng định dạng mong đợi");
                    setProducts([]);
                }
            } catch (error) {
                console.error("LỖI KHI TẢI SẢN PHẨM:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categorySlug, page, filters]);

    const categoryMapping = {
        'ao-nam': 'ÁO NAM',
        'quan-nam': 'QUẦN NAM',
        'ao-khoac': 'ÁO KHOÁC',
        'phu-kien': 'PHỤ KIỆN',
    };
    // Tiêu đề trang
    const pageTitle = categoryMapping[categorySlug] || (categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'SẢN PHẨM');
    return (
        <div className="container mx-auto max-w-[1280px] px-4 py-8">
            <h1 className="text-4xl font-bold mt-5 mb-10 tracking-wider text-center uppercase">
                {pageTitle}
            </h1>

            <div className="flex gap-8">
                {/* BỘ LỌC BÊN TRÁI */}
                <aside className="w-1/4 min-w-[250px] space-y-6">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">BỘ LỌC</h3>

                    <div className="border-b pb-4">
                        <h4 className="font-medium mb-3">SIZE</h4>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeChange(size)}
                                    className={`border w-10 h-10 text-sm transition-all duration-200 ${filters.size === size
                                        ? 'bg-black text-white border-black font-bold'
                                        : 'hover:bg-gray-100 border-gray-300'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">KHOẢNG GIÁ</h4>
                        <div className="text-sm space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={filters.priceRange === 'under500'}
                                    onChange={() => handlePriceChange('under500')}
                                />
                                Dưới 500.000₫
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={filters.priceRange === '500-1000'}
                                    onChange={() => handlePriceChange('500-1000')}
                                />
                                500.000₫ - 1.000.000₫
                            </label>
                        </div>
                    </div>
                </aside>

                {/* DANH SÁCH SẢN PHẨM BÊN PHẢI */}
                <main className="w-3/4">
                    <div className="flex justify-between items-center mb-6 pb-2 border-b">
                        <span className="text-sm text-gray-500 font-medium">
                            {loading ? 'Đang đếm...' : `${count} sản phẩm được tìm thấy`}
                        </span>
                        <select
                            className="border border-gray-300 p-2 text-sm rounded outline-none focus:border-black"
                            value={filters.sort}
                            onChange={handleSortChange}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 italic text-lg">Không tìm thấy sản phẩm nào cho danh mục này.</p>
                            <button
                                onClick={() => navigate('/category/ao-nam')}
                                className="mt-4 text-black underline hover:font-bold"
                            >
                                Quay lại tất cả sản phẩm
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map(item => (
                                <div key={item.sku} className="group">
                                    <Link to={`/products/${item.sku}`} className="block overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={item.images && item.images.length > 0 ? item.images[0] : PLACEHOLDER_IMAGE}
                                            alt={item.name}
                                            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-sm font-medium uppercase tracking-tight h-[40px] overflow-hidden line-clamp-2 px-2">
                                            <Link to={`/products/${item.sku}`} className="hover:text-red-600 transition-colors">
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <div className="text-lg font-bold text-[#EE1010] mt-1">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ProductListPage;