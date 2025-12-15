import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    };
};

// Lấy chi tiết sản phẩm theo ID
export const apiGetProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Lấy danh sách sản phẩm bán chạy
export const apiGetBestSellers = async (excludeId = null) => {
    try {
        const url = excludeId 
            ? `${API_URL}/best-sellers?excludeId=${excludeId}`
            : `${API_URL}/best-sellers`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Lấy danh sách sản phẩm (có thể thêm filter, pagination sau)
export const apiGetProducts = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/products`, { params });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

