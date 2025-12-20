import React, { useState, useEffect } from 'react';

const OrderSearch = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    // Debounce search: Chỉ gọi hàm search sau khi ngưng gõ 500ms
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(keyword);
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword, onSearch]);

    return (
        <div className="search-container">
            <div className="search-icon">🔍</div>
            <input 
                type="text" 
                className="search-input" 
                placeholder="Tìm đơn hàng theo Mã đơn, Tên sản phẩm..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    );
};

export default OrderSearch;