import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; 

export const ProductSection = ({ title, initialSlug }) => {
    const [categories, setCategories] = useState([]); 
    const [products, setProducts] = useState([]);
    const [activeSlug, setActiveSlug] = useState(initialSlug || null); 
    const [loading, setLoading] = useState(true);
    
    const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/categories');
                setCategories(data);
                
                if (data.length > 0) {
                    const slugToSet = initialSlug || data[0].slug;
                    if (activeSlug !== slugToSet) {
                         setActiveSlug(slugToSet); 
                    }
                } else {
                    setLoading(false); 
                }
                
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
                setLoading(false);
            }
        };
        fetchCategories();
    }, [initialSlug]); 

    useEffect(() => {
        if (!activeSlug) {
             setProducts([]); 
             setLoading(false);
             return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/api/products?category=${activeSlug}&limit=4`);
                let productList = [];
                if (response.data && Array.isArray(response.data.products)) {
                    productList = response.data.products;
                } else if (Array.isArray(response.data)) {
                    productList = response.data;
                }

                setProducts(productList.slice(0, 4)); 
            } catch (error) {
                console.error(`Lỗi khi tải sản phẩm cho ${activeSlug}:`, error);
                setProducts([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeSlug]);

    if (loading && products.length === 0) { 
        return (
            <div className="mt-[50px]">
                <div className="container mx-auto max-w-[1180px] px-[15px] py-[50px] text-center">
                    Đang tải sản phẩm...
                </div>
            </div>
        );
    }

    return (
        <div className="mt-[50px]">
            <div className="container mx-auto max-w-[1180px] p-4">
                
                <h2 className="text-center text-[36px] font-bold mt-[50px] mb-5 tracking-wider">
                    {title || 'SẢN PHẨM'} 
                </h2>

                <div className="flex justify-center gap-[30px] mb-10 border-b border-gray-300">
                    {categories.map((category) => (
                        <div 
                            key={category.slug}
                            onClick={() => setActiveSlug(category.slug)} 
                            className={`cursor-pointer px-0 py-[10px] text-base font-medium transition-all duration-200 
                                ${activeSlug === category.slug 
                                    ? 'text-black border-b-[2px] border-black' 
                                    : 'text-gray-600'
                                }`}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                    {products.length === 0 && !loading ? (
                                <div className="col-span-full text-center py-[50px]">
                                    Không có sản phẩm nào cho danh mục này.
                                </div>
                    ) : (
                        products.map((item) => (
                            <div className="bg-white p-2 rounded-xl shadow-lg shadow-gray-300/50 text-center transition-transform duration-200 hover:-translate-y-[2px]" 
                                key={item.sku}> 
                                <Link to={`/product/${item.sku}`} className="block rounded-lg overflow-hidden">
                                    <img 
                                        src={item.images && item.images.length > 0 ? item.images[0] : PLACEHOLDER_IMAGE} 
                                        alt={item.name} 
                                        className="w-full aspect-square object-cover"/> 
                                </Link>
                                
                                <div className="mt-2 text-center">
                                    <h3 className="text-base font-normal text-gray-800 leading-snug">
                                        <Link to={`/product/${item.sku}`} className="hover:text-red-600 transition-colors">{item.name}</Link>
                                    </h3>
                                    <div className="text-base font-normal text-[#EE1010] mt-1">
                                        {item.price.toLocaleString('vi-VN')}₫
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductSection;