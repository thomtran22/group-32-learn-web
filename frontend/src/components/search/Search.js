import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Hàm reset trạng thái tìm kiếm về ban đầu
  const resetSearch = () => {
    setSearchTerm(""); // Xóa nội dung ô input
    setResults([]);    // Xóa kết quả tìm kiếm hiện tại
    setIsOpen(false);  // Đóng dropdown
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:4000/api/products/search?q=${searchTerm}`);
          setResults(response.data);
          setIsOpen(true);
        } catch (error) {
          console.error("Lỗi search API:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      resetSearch(); // Gọi reset ở đây khi nhấn Enter
    }
  };

  return (
    <div className="w-full relative group" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length > 1 && setIsOpen(true)}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-200 border rounded-full py-2.5 px-6 pl-12 outline-none text-sm transition-all duration-300 shadow-sm"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          {loading ? (
            <FaSpinner className="animate-spin text-red-600" />
          ) : (
            <FaSearch className="text-gray-400 group-focus-within:text-red-600 transition-colors" />
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl rounded-xl overflow-hidden border border-gray-100 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[400px] overflow-y-auto">
            {results.length > 0 ? (
              <>
                <div className="bg-gray-50 px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b">
                  Sản phẩm gợi ý ({results.length})
                </div>
                
                {results.map((product) => (
                  <Link 
                    key={product.sku} 
                    to={`/products/${product.sku}`}
                    className="flex items-center gap-4 p-3 hover:bg-red-50/50 transition-colors border-b border-gray-50 last:border-none group/item"
                    onClick={resetSearch}
                  >
                    <div className="w-14 h-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 border">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-semibold text-gray-800 line-clamp-1 group-hover/item:text-red-600 transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[11px] text-gray-400 uppercase">{product.sku}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-red-600 font-bold text-[14px]">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <button 
                  onClick={handleSearchSubmit}
                  className="w-full py-3 text-center text-[12px] text-blue-600 hover:text-red-600 hover:bg-gray-50 font-bold border-t border-gray-100 transition-all uppercase"
                >
                  Xem tất cả kết quả cho "{searchTerm}"
                </button>
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm">Không tìm thấy sản phẩm "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;