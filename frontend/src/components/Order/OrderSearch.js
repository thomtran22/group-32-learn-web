import React from 'react';

const OrderSearch = () => {
    return (
        <div className="search-container">
            <input 
                type="text" 
                className="search-input" 
                placeholder="Bạn có thể tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm" 
            />
        </div>
    );
};

export default OrderSearch;