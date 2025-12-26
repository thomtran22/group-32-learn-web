import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; 

export const ProductSection = ({ title, initialSlug, parentSlug }) => {
    const [categories, setCategories] = useState([]); 
    const [products, setProducts] = useState([]);
    const [activeSlug, setActiveSlug] = useState(initialSlug || null); 
    const [loading, setLoading] = useState(true);
    
    const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

    // Fetch danh mục và lọc các danh mục con dựa trên parentSlug
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/categories');
                
                // Tìm danh mục cha (ví dụ: "ao-nam")
                const parentCat = data.find(cat => cat.slug === parentSlug);

                if (parentCat) {
                    // Lọc các danh mục có trường parent trùng với _id của danh mục cha
                    const childCategories = data.filter(cat => 
                        cat.parent && cat.parent.toString() === parentCat._id.toString()
                    );
                    
                    setCategories(childCategories);
                    
                    // Nếu không có initialSlug, lấy slug của danh mục con đầu tiên làm mặc định
                    if (!activeSlug && childCategories.length > 0) {
                        setActiveSlug(childCategories[0].slug);
                    }
                } else if (parentSlug) {
                    console.warn(`[Section ${title}]: Không tìm thấy danh mục gốc có slug: ${parentSlug}`);
                }
                
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            }
        };
        fetchCategories();
    }, [parentSlug, title]); 

    // Fetch sản phẩm dựa trên activeSlug (danh mục con đang được chọn)
    useEffect(() => {
        if (!activeSlug) return;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Gọi API lấy sản phẩm theo category con
                const { data } = await axios.get(`http://localhost:4000/api/products?category=${activeSlug}&limit=8`);
                
                let productList = [];
                if (data && data.products) {
                    productList = data.products;
                } else if (Array.isArray(data)) {
                    productList = data;
                }
                
                setProducts(productList.slice(0, 8)); 
            } catch (error) {
                console.error(`Lỗi tải sản phẩm cho ${activeSlug}:`, error);
                setProducts([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeSlug]);

    if (loading && products.length === 0 && categories.length === 0) { 
        return <div className="text-center py-10">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="mt-[50px]">
            <div className="container mx-auto max-w-[1180px] p-4">
                <h2 className="text-center text-[36px] font-bold mt-4 mb-3 uppercase">
                    {title} 
                </h2>

                {/* Tab điều hướng danh mục con */}
                <div className="flex justify-center gap-[30px] mb-10 border-b border-gray-300 overflow-x-auto scrollbar-hide">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <div 
                                key={category.slug}
                                onClick={() => setActiveSlug(category.slug)} 
                                className={`cursor-pointer px-4 py-[10px] text-base font-medium transition-all duration-200 whitespace-nowrap
                                    ${activeSlug === category.slug 
                                        ? 'text-black border-b-[2px] border-black font-bold' 
                                        : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {category.name}
                            </div>
                        ))
                    ) : (
                        !loading && products.length > 0 ? null :(
                        <div className="py-2 text-gray-400 italic text-sm text-center w-full">
                            Đang cập nhật danh mục...
                        </div>)
                    )}
                </div>
                
                {/* Lưới hiển thị sản phẩm */}
                {loading ? (
                    <div className="text-center py-10">Đang cập nhật sản phẩm...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 italic">
                        Không có sản phẩm nào trong mục này.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                        {products.map((item) => (
                            <div className="bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center" key={item.sku}> 
                                <Link to={`/products/${item.sku}`} className="block rounded-lg overflow-hidden bg-gray-100">
                                    <img 
                                        src={item.images?.[0] || PLACEHOLDER_IMAGE} 
                                        alt={item.name} 
                                        className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                                    /> 
                                </Link>
                                <div className="mt-3 px-2">
                                    <h3 className="text-sm font-medium h-[40px] overflow-hidden leading-tight line-clamp-2">
                                        <Link to={`/products/${item.sku}`} className="hover:text-red-600 transition-colors">
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <div className="text-base font-bold text-[#EE1010] mt-2 mb-2">
                                        {item.price?.toLocaleString('vi-VN')}₫
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductSection;