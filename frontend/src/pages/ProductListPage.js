import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PRODUCTS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

function ProductListPage() {
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
        sort: queryParams.get('sort') || '',
        priceRange: queryParams.get('priceRange') || ''
    });

    // Cuộn lên đầu trang khi chuyển trang hoặc đổi category
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page, categorySlug]);

    useEffect(() => {
        setPage(currentPageFromUrl);
        setFilters({
            size: queryParams.get('size') || '',
            sort: queryParams.get('sort') || '',
            priceRange: queryParams.get('priceRange') || ''
        });
    }, [location.search, currentPageFromUrl]);

    // Hàm thay đổi trang chung
    const handlePageChange = (newPage) => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', newPage);
        navigate(`?${newSearchParams.toString()}`);
    };

    const handleSizeChange = (size) => {
        const newSize = filters.size === size ? '' : size;
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', '1');
        if (newSize) newSearchParams.set('size', newSize);
        else newSearchParams.delete('size');
        navigate(`?${newSearchParams.toString()}`);
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('sort', newSort);
        navigate(`?${newSearchParams.toString()}`);
    };

    const handlePriceChange = (range) => {
        const newRange = filters.priceRange === range ? '' : range;
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', '1');
        if (newRange) newSearchParams.set('priceRange', newRange);
        else newSearchParams.delete('priceRange');
        navigate(`?${newSearchParams.toString()}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (!categorySlug || categorySlug === 'undefined') return;
            setLoading(true);
            try {
                let url = `https://group-32-learn-web-8hmv.onrender.com/api/products?category=${categorySlug}&page=${page}&limit=${PRODUCTS_PER_PAGE}&sort=${filters.sort}`;
                if (filters.size) url += `&size=${filters.size}`;
                if (filters.priceRange) url += `&priceRange=${filters.priceRange}`;

                const { data } = await axios.get(url);
                if (data && data.products) {
                    setProducts(data.products);
                    setCount(data.count || 0);
                    setPages(data.pages || 1);
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

    const pageTitle = categoryMapping[categorySlug] || (categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'SẢN PHẨM');

    return (
        <div className="container mx-auto max-w-[1280px] px-4 py-8">
            <h1 className="text-4xl font-bold mt-5 mb-10 tracking-wider text-center uppercase">{pageTitle}</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Bộ lọc bên trái*/}
                <aside className="w-full md:w-1/4 min-w-[250px] space-y-6">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">BỘ LỌC</h3>
                    {/* Size và giá */}
                    <div className="border-b pb-4">
                        <h4 className="font-medium mb-3">SIZE</h4>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button key={size} onClick={() => handleSizeChange(size)}
                                    className={`border w-10 h-10 text-sm transition-all ${filters.size === size ? 'bg-black text-white border-black font-bold' : 'hover:bg-gray-100 border-gray-300'}`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">KHOẢNG GIÁ</h4>
                        <div className="text-sm space-y-2">
                            {['under500', '500-1000'].map(range => (
                                <label key={range} className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="mr-2" checked={filters.priceRange === range} onChange={() => handlePriceChange(range)} />
                                    {range === 'under500' ? 'Dưới 500.000₫' : '500.000₫ - 1.000.000₫'}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Danh sách sản phẩm bên phải*/}
                <main className="w-full md:w-3/4">
                    <div className="flex justify-between items-center mb-6 pb-2 border-b">
                        <span className="text-sm text-gray-500 font-medium">
                            {loading ? 'Đang tải...' : `${count} sản phẩm`}
                        </span>
                        <select
                            className="border border-gray-300 p-2 text-sm rounded outline-none focus:border-black"
                            value={filters.sort}
                            onChange={handleSortChange}
                        >
                            <option value="">Mặc định</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div></div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-lg"><p className="text-gray-500 italic text-lg">Không tìm thấy sản phẩm nào.</p></div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map(item => (
                                    <div key={item.sku} className="group">
                                        <Link to={`/products/${item.sku}`} className="block overflow-hidden rounded-lg bg-gray-100">
                                            <img src={item.images?.[0] || PLACEHOLDER_IMAGE} alt={item.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </Link>
                                        <div className="mt-4 text-center px-2">
                                            <h3 className="text-sm font-medium uppercase truncate"><Link to={`/products/${item.sku}`} className="hover:text-red-600">{item.name}</Link></h3>
                                            <div className="text-lg font-bold text-red-600 mt-1">{item.price.toLocaleString('vi-VN')}₫</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/*Phân trang*/}
                            {pages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12 pb-10">
                                    <button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                        className={`px-4 py-2 border ${page === 1 ? 'text-gray-300 border-gray-100' : 'hover:bg-black hover:text-white border-black'}`}
                                    >
                                        Trước
                                    </button>

                                    {[...Array(pages).keys()].map((num) => (
                                        <button
                                            key={num + 1}
                                            onClick={() => handlePageChange(num + 1)}
                                            className={`w-10 h-10 border transition-all ${page === num + 1 ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}
                                        >
                                            {num + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === pages}
                                        className={`px-4 py-2 border ${page === pages ? 'text-gray-300 border-gray-100' : 'hover:bg-black hover:text-white border-black'}`}
                                    >
                                        Sau
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ProductListPage;