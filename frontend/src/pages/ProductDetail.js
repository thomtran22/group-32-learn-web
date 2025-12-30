import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';
import ProductSection from "../components/sections/ProductSection";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { sku } = useParams();
  // Lấy hàm addToCart từ Context
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // State cho hiệu ứng bay
  const [isFlying, setIsFlying] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sku]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://group-32-learn-web-8hmv.onrender.com/api/products/${sku}`);

        const uniqueColors = data.variants ? [...new Set(data.variants.map(v => v.color))] : [];
        const uniqueSizes = data.variants ? [...new Set(data.variants.map(v => v.size))] : [];

        setProduct({
          ...data,
          displayColors: uniqueColors,
          displaySizes: uniqueSizes
        });

        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }

        if (uniqueColors.length > 0) setSelectedColor(uniqueColors[0]);
        if (uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0]);

      } catch (error) {
        console.error(`Lỗi khi fetch sản phẩm ${sku}:`, error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (sku) {
      fetchProduct();
    }
  }, [sku]);

  const handleAddToCart = async () => {
    // Kiểm tra biến thể đã chọn chưa
    if (!selectedColor || !selectedSize) {
      toast.error("Vui lòng chọn màu sắc và kích cỡ!");
      return;
    }

    // Kiểm tra token (Nếu chưa đăng nhập thì dừng animation, để Context mở Modal)
    const token = localStorage.getItem("token");
    if (!token) {
      // Gọi addToCart để nó tự kích hoạt Modal Login bên trong Context
      addToCart({ ...product, color: selectedColor, size: selectedSize, quantity: quantity });
      return; // Dừng hàm tại đây, không chạy animation
    }

    setAdding(true);
    try {
      // Gọi hàm thêm vào giỏ (Chờ server phản hồi OK)
      await addToCart({
        ...product,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
      });

      // Nếu thành công -> Kích hoạt hiệu ứng bay
      setIsFlying(true);

      // Hiển thị Popup thông báo đẹp mắt
      toast.success(
        <div className="flex items-center gap-3">
          <img src={activeImage} alt="product" className="w-12 h-12 object-cover rounded" />
          <div>
            <p className="font-bold text-sm">Đã thêm vào giỏ hàng!</p>
            <p className="text-xs text-gray-500">{product.name} ({selectedSize})</p>
          </div>
        </div>
        , { autoClose: 3000, position: 'top-right' });

      // Reset hiệu ứng bay sau 0.8s
      setTimeout(() => setIsFlying(false), 800);

    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);

    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Đang tải chi tiết sản phẩm...</div>;
  if (!product) return <div className="py-20 text-center text-red-500">Không tìm thấy sản phẩm! (SKU: {sku})</div>;

  return (
    <div className="container mx-auto px-4 py-8 relative" ref={containerRef}>

      <nav className="text-xs text-gray-500 mb-6 uppercase tracking-wider">
        Trang chủ / Sản phẩm / {product.name}
      </nav>

      <div className="flex flex-col md:flex-row gap-10 mb-16">
        {/* Cột 1: Hình ảnh */}
        <div className="w-full md:w-[45%] flex flex-col gap-4">
          <div className="w-full aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-white relative">
            <img
              src={activeImage || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Animation */}
            <AnimatePresence>
              {isFlying && (
                <motion.img
                  src={activeImage}
                  initial={{ top: "20%", left: "20%", opacity: 1, scale: 0.8 }}
                  animate={{
                    top: "-100px",
                    left: "100%",
                    scale: 0.1,
                    opacity: 0,
                    rotate: 45
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute z-[999] w-40 h-40 object-cover rounded-full shadow-2xl pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all 
                                    ${activeImage === img ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Cột 2: Thông tin chi tiết */}
        <div className="w-full md:w-[55%] space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="text-3xl font-bold text-red-600">
            {product.price?.toLocaleString('vi-VN')} VNĐ
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-3">
            <p className="font-semibold uppercase text-sm">Màu Sắc: <span className="text-gray-500">{selectedColor}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.displayColors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm rounded border transition-all ${color === selectedColor ? 'border-black bg-black text-white' : 'border-gray-300 bg-white hover:border-black'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase text-sm">Kích cỡ: <span className="text-gray-500">{selectedSize}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.displaySizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[50px] px-4 py-2 text-sm font-medium border transition-all
                                        ${size === selectedSize ? 'border-black bg-black text-white' : 'border-gray-300 bg-white hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-6">
            <div className="w-full sm:w-auto">
              <p className="font-semibold uppercase text-sm mb-2">Số lượng</p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full sm:w-20 border border-gray-300 p-3 text-center focus:outline-none focus:border-black"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`flex-1 w-full py-4 px-8 font-bold text-white transition-all uppercase tracking-widest relative overflow-hidden
                                ${adding ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 active:scale-95 shadow-lg'}`}
            >
              {adding ? 'Đang xử lý...' : 'Thêm vào giỏ hàng'}
            </button>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h4 className="text-lg font-bold mb-4 uppercase">Mô tả sản phẩm</h4>
            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              {product.description?.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {product.category?.slug ? (
        <ProductSection title="SẢN PHẨM LIÊN QUAN" initialSlug={product.category.slug} />
      ) : (
        <ProductSection title="SẢN PHẨM MỚI" initialSlug="ao-nam" />
      )}
    </div>
  );
}

export default ProductDetail;