import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://group-32-learn-web-8hmv.onrender.com/api';

// REQUEST INTERCEPTOR
// Lấy token gắn vào header
axios.interceptors.request.use(
  function (config) {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token'); 
    
    // Nếu có token thì gắn vào header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
// Xử lý lỗi chung (401, 403, 500...)
axios.interceptors.response.use(
  function (response) {
    // Nếu thành công (2xx), trả về response như bình thường
    return response;
  },
  function (error) {
    // Nếu có lỗi (4xx, 5xx)
    if (error.response) {
      const { status, data } = error.response;

      // 5xx: Server Errors
      if (status >= 500) {
        toast.error("Lỗi Server (500)! Vui lòng thử lại sau.");
      }

      // 401: Unauthorized (Token hết hạn hoặc không đúng)
      else if (status === 401 && !error.config.url.includes('/login')) {
        toast.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        // Gợi ý: Xóa token cũ đi để app biết là user đã logout
        localStorage.removeItem('token');
      }

      // 403: Forbidden (Không có quyền)
      else if (status === 403) {
        toast.error(data.message || "Bạn không có quyền thực hiện hành động này!");
      }

      // 404: Not Found (Tùy logic mà có toast hay không)

    } else if (error.request) {
      // Mất mạng hoặc Server chết hẳn
      toast.error("Mất kết nối đến Server! Vui lòng kiểm tra mạng.");
    }

    return Promise.reject(error);
  }
);

export default axios;