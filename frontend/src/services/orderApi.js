import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
};

export const apiCreateOrder = async (orderData) => {
    try {
        const config = getAuthConfig();
        const response = await axios.post(API_URL, orderData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiCreatPaymentUrl = async (data) => {
    try {
        const config = getAuthConfig();
        const response = await axios.post(`${API_URL}/create-payment-url`, data, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiViewOrders = async () => {
    try {
        const config = getAuthConfig();
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiVerifyVnpayReturn = async (queryString) => {
    try {
        const config = getAuthConfig(); // Nếu backend cần token thì để, không thì bỏ
        // Gửi toàn bộ chuỗi query param (?vnp_...) xuống backend xử lý
        const response = await axios.get(`${API_URL}/vnpay-return${queryString}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};