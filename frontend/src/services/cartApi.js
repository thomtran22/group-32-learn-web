import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
};

export const apiAddToCart = async (data) => {
    const response = await axios.post(API_URL, data, getAuthConfig());
    return response.data;
};

export const apiViewCart = async () => {
    const response = await axios.get(API_URL, getAuthConfig());
    return response.data;
};

// API Sync/Cập nhật toàn bộ giỏ (dùng khi tăng/giảm số lượng)
export const apiUpdateCart = async (items) => {
    const response = await axios.put(API_URL, { items }, getAuthConfig());
    return response.data;
};

// API Xóa 1 item
export const apiRemoveItem = async (itemId) => {
    const response = await axios.delete(`${API_URL}/${itemId}`, getAuthConfig());
    return response.data;
};

// API xoa tat ca
export const apiClearCart = async () => {
    const response = await axios.delete(API_URL, getAuthConfig());
    return response.data;
};
