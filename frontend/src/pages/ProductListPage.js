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
        sort: queryParams.get('sort') || 'newest'
    });

    useEffect(() => {
        setPage(currentPageFromUrl);
        setFilters(prev => ({
            ...prev,
            size: queryParams.get('size') || '',
            sort: queryParams.get('sort') || 'newest',
        }));
    }, [location.search, currentPageFromUrl]);
    
    const handleSizeChange = (size) => {
        const newSize = filters.size === size ? '' : size;
        
        setFilters(prev => ({ ...prev, size: newSize }));
        if (page !== 1) {
            setPage(1);
        }
        
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', '1');
        if (newSize) {
             newSearchParams.set('size', newSize);
        } else {
             newSearchParams.delete('size');
        }
        newSearchParams.set('sort', filters.sort);
        navigate(`?${newSearchParams.toString()}`, { replace: true });
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setFilters(prev => ({ ...prev, sort: newSort }));
        
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('sort', newSort);
        if (filters.size) {
            newSearchParams.set('size', filters.size);
        }
        navigate(`?${newSearchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let query = `category=${categorySlug}&page=${page}&limit=${PRODUCTS_PER_PAGE}`;
            if (filters.size) {
                query += `&size=${filters.size}`;
            }
            if (filters.sort) {
                query += `&sort=${filters.sort}`;
            }

            const apiUrl = `http://localhost:4000/api/products?${query}`;

            try {
                const { data } = await axios.get(apiUrl);
                let productList = [];
                let totalPages = 1;
                let totalCount = 0;

                if (data && Array.isArray(data.products)) {
                    productList = data.products;
                    totalCount = data.count || 0;
                    totalPages = data.pages || 1;
                } else if (Array.isArray(data)) {
                    productList = data;
                    totalCount = data.length;
                }
                
                setProducts(productList);
                setPages(totalPages);
                setCount(totalCount);
                
            } catch (error) {
                console.error(`Lỗi khi tải sản phẩm cho ${categorySlug}:`, error);
                setProducts([]);
                setPages(1);
                setCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categorySlug, page, filters]); 

    const pageTitle = categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'SẢN PHẨM';
    
    const renderPaginationButtons = () => {
        if (pages <= 1) return null;

        const pageNumbers = [...Array(pages).keys()].map(i => i + 1);
        const currentPath = `/products/${categorySlug}`;

        const createPaginationUrl = (newPage) => ({
            pathname: currentPath,
            search: new URLSearchParams({ 
                ...Object.fromEntries(new URLSearchParams(location.search)),
                page: newPage 
            }).toString()
        });

        return (
            <div className="flex justify-center mt-12 space-x-2">
                {/* Nút Previous */}
                <Link
                    to={createPaginationUrl(page > 1 ? page - 1 : 1)}
                    className={`px-4 py-2 border rounded ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    Trước
                </Link>

                {/* Các nút số */}
                {pageNumbers.map((p) => (
                    <Link
                        key={p}
                        to={createPaginationUrl(p)}
                        className={`px-4 py-2 border rounded ${p === page ? 'bg-black text-white font-bold' : 'hover:bg-gray-100'}`}
                    >
                        {p}
                    </Link>
                ))}
                
                {/* Nút Next */}
                <Link
                    to={createPaginationUrl(page < pages ? page + 1 : pages)}
                    className={`px-4 py-2 border rounded ${page === pages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    Sau
                </Link>
            </div>
        );
    };


    return (
        <div className="container mx-auto max-w-[1280px] px-4 py-8">
            <h1 className="text-4xl font-bold mt-5 mb-10 tracking-wider text-center">
                {pageTitle}
            </h1>

            <div className="flex gap-8">
                
                {/* CỘT 1: BỘ LỌC*/}
                <aside className="w-1/4 min-w-[250px] space-y-6">
                    <h3 className="text-xl font-semibold mb-4">BỘ LỌC</h3>
                    
                    {/* KHỐI LỌC 1: Lọc theo Size*/}
                    <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">SIZE</h4>
                        <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button 
                                    key={size} 
                                    onClick={() => handleSizeChange(size)}
                                    className={`border px-3 py-1 text-sm transition-colors duration-150 ${
                                        filters.size === size 
                                        ? 'bg-black text-white border-black' 
                                        : 'hover:bg-gray-100'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* KHỐI LỌC 2: Lọc theo Giá*/}
                    <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">KHOẢNG GIÁ</h4>
                        <div className="text-sm">
                            <label className="block"><input type="checkbox" className="mr-2" /> Dưới 500.000₫</label>
                            <label className="block"><input type="checkbox" className="mr-2" /> 500.000₫ - 1.000.000₫</label>
                        </div>
                    </div>
                </aside>

                {/* CỘT 2: DANH SÁCH SẢN PHẨM */}
                <main className="w-3/4">
                    
                    {/* THANH SẮP XẾP VÀ ĐẾM SẢN PHẨM */}
                    <div className="flex justify-between items-center mb-6 pb-2 border-b">
                        <span className="text-sm text-gray-600">
                            {count} sản phẩm
                        </span>
                        <select 
                            className="border p-2 text-sm" 
                            value={filters.sort}
                            onChange={handleSortChange}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                        </select>
                    </div>

                    {/* HIỂN THỊ LƯỚI SẢN PHẨM */}
                    {loading ? (
                        <p className="text-center py-10">Đang tải sản phẩm...</p>
                    ) : products.length === 0 ? (
                        <p className="text-center py-10">Không tìm thấy sản phẩm nào cho danh mục này.</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-8">
                            {products.map(item => (
                                <div key={item.sku} className="product-card text-center group">
                                    <Link to={`/product/${item.sku}`} className="block overflow-hidden">
                                        <img 
                                            src={item.images && item.images.length > 0 ? item.images[0] : PLACEHOLDER_IMAGE} 
                                            alt={item.name} 
                                            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        /> 
                                    </Link>
                                    <h3 className="text-base font-normal mt-3 leading-snug">
                                        <Link to={`/product/${item.sku}`} className="hover:text-red-600">{item.name}</Link>
                                    </h3>
                                    <div className="text-base font-bold text-[#EE1010] mt-1">
                                        {item.price.toLocaleString('vi-VN')}₫
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* HIỂN THỊ PHÂN TRANG */}
                    {renderPaginationButtons()}
                </main>
            </div>
        </div>
        
    );
}

export default ProductListPage;