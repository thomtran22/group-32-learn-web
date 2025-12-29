import axios from 'axios';

// Giả sử server chạy port 4000 và prefix là /api/admin
const API_URL = 'http://localhost:4000/api/admin';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
};

// --- DASHBOARD ---
export const apiGetDashboardStats = async () => {
    const response = await axios.get(`${API_URL}/dashboard`, getAuthConfig());
    return response.data;
};

export const apiGetRevenueStats = async ({ startDate, endDate }) => {
    // startDate và endDate phải là chuỗi format YYYY-MM-DD
    const response = await axios.get(`${API_URL}/revenue`, {
        ...getAuthConfig(),
        params: { 
            from: startDate,
            to: endDate
        }
    });
    return response.data;
};

// --- ORDERS ---
export const apiGetAllOrders = async (params) => {
    // params: { page, limit, status, search, startDate, endDate }
    const response = await axios.get(`${API_URL}/orders`, {
        ...getAuthConfig(),
        params
    });
    return response.data;
};

export const apiUpdateOrderStatus = async (orderId, status, note) => {
    const response = await axios.put(`${API_URL}/orders/${orderId}/status`, { status, note }, getAuthConfig());
    return response.data;
};

// --- PRODUCTS ---
export const apiGetAllProductsAdmin = async (params) => {
    // params: { page, limit, search, category }
    const response = await axios.get(`${API_URL}/products`, {
        ...getAuthConfig(),
        params
    });
    return response.data;
};

export const apiCreateProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/products`, productData, getAuthConfig());
    return response.data;
};

export const apiUpdateProduct = async (productId, productData) => {
    const response = await axios.put(`${API_URL}/products/${productId}`, productData, getAuthConfig());
    return response.data;
};

export const apiDeleteProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}/products/${productId}`, getAuthConfig());
    return response.data;
};

// --- SHIPPERS ---
export const apiGetAllShippers = async () => {
    const response = await axios.get(`${API_URL}/shippers`, getAuthConfig());
    return response.data;
};

// --- USERS ---
export const apiGetAllUsers = async (params) => {
    // params: { page, limit, search, role }
    const response = await axios.get(`${API_URL}/users`, {
        ...getAuthConfig(),
        params
    });
    return response.data;
};


