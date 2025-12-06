import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const BASE_URL = 'http://localhost:5000'; 


function ProductDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProductsData, setRelatedProductsData] = useState([]); 
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/api/products/${id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json(); 
                
                setProduct(data);
                if (data.colors && data.colors.length > 0) {
                    setSelectedColor(data.colors[0].name); 
                }
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]); 
                }
                
                setRelatedProductsData([]); 

            } catch (error) {
                console.error("Lỗi khi fetch API chi tiết sản phẩm:", error);
                setProduct(null); 
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product && selectedColor && selectedSize && quantity > 0) {
            console.log(`Thêm vào giỏ hàng: ${product.name}, Màu: ${selectedColor}, Size: ${selectedSize}, SL: ${quantity}`);
            alert(`Đã thêm ${product.name} vào giỏ hàng!`);
            // TODO: GỌI API POST /api/cart/add ĐỂ THÊM VÀO GIỎ HÀNG THẬT SỰ
        } else {
            alert("Vui lòng chọn màu, size và số lượng hợp lệ.");
        }
    };

    if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Đang tải sản phẩm...</div>;
    if (!product) return <div style={{padding: '50px', textAlign: 'center'}}>Không tìm thấy sản phẩm.</div>;

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="breadcrumb">
                    <a href="/">Trang chủ</a> / <a href="/products">Sản phẩm</a> / <span>{product.name}</span>
                </div>

                <div className="detail-main-wrap">
                    {/* Cột 1: Ảnh sản phẩm */}
                    <div className="detail-images">
                        <div className="main-image">
                            <img src={product.images[0]} alt={product.name} /> 
                        </div>
                        <div className="thumb-images">
                            {product.images.map((img, index) => (
                                <img key={index} src={img} alt={`Thumb ${index}`} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Cột 2: Thông tin và Tùy chọn */}
                    <div className="detail-info">
                        <h1 className="product-name">{product.name}</h1>
                        <div className="product-price">{product.price} VNĐ</div>

                        <div className="option-group">
                            <h3 className="option-title">Màu Sắc</h3>
                            <div className="color-options">
                                {product.colors.map(color => (
                                    <div 
                                        key={color.name}
                                        className={`color-item ${selectedColor === color.name ? 'selected' : ''}`}
                                        onClick={() => setSelectedColor(color.name)}
                                    >
                                        <img src={color.image} alt={color.name} />
                                        <span>{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <h3 className="option-title">Cỡ</h3>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <div 
                                        key={size}
                                        className={`size-item ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="purchase-actions">
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
                                <input type="number" value={quantity} readOnly min="1" />
                                <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                            </div>
                            <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                <i className="icon-cart"></i> THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>

                        <div className="product-description">
                            <h3 className="description-title">Mô tả</h3>
                            <p>{product.description}</p>
                            <h3 className="description-title">Hướng dẫn chọn size</h3>
                            <p>Phom REGULAR. Size: M, L, XL.</p>
                        </div>
                    </div>
                </div>

                <div className="related-products">
                    <h2 className="section-title">SẢN PHẨM BÁN CHẠY</h2>
                    <div className="product-list-wrap">
                        {relatedProductsData.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;