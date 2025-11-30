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

};