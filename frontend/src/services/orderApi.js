import axios from 'axios';

// Cấu hình thông minh: Tự động detect API URL
// - Dev local: http://localhost:5000
// - Dev với ngrok: Sẽ lấy từ REACT_APP_API_URL (hoặc tự detect từ origin)
const getApiBaseUrl = () => {
    // Nếu đã set REACT_APP_API_URL (từ file .env.local của React)
    if (process.env.REACT_APP_API_URL) {
        return `${process.env.REACT_APP_API_URL}/api/order`;
    }
    
    // Dev local - đơn giản nhất
    return 'http://localhost:5000/api/order';
};

const API_BASE_URL = getApiBaseUrl(); 

const orderApi = {
    // 1. Hàm tạo URL thanh toán VNPay
    createPaymentUrl: async (data) => {
        try {
            // data gửi lên gồm: { amount: 100000, language: 'vn', bankCode: '' (tùy chọn) }
            const response = await axios.post(`${API_BASE_URL}/create_payment_url`, data);
            return response.data; // Kết quả trả về sẽ chứa link thanh toán (vnpUrl)
        } catch (error) {
            sole.error("Lỗi khi tạo URL thanh toán:", error);
            throw error;
        }
    },

    // Dùng khi VNPay chuyển hướng về Frontend, Frontend lấy query params gửi xuống Backend check lại
    verifyReturnUrl: async (queryString) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/vnpay_return${queryString}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi xác minh giao dịch:", error);
            throw error;
        }
    }
};

export default orderApi;