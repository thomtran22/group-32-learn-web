import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Không tìm thấy trang</h2>
            <p className="text-gray-500 mt-2 mb-8 max-w-md">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            >
                Về Trang Chủ
            </Link>
        </div>
    );
};

export default NotFound;
