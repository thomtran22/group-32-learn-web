import axios from 'axios';
import { toast } from 'react-toastify';

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Check if error has a response from server
    if (error.response) {
      const { status, data } = error.response;

      // 5xx: Server Errors
      if (status >= 500) {
        toast.error("Lỗi Server (500)! Vui lòng thử lại sau.");
      }

      // 401: Unauthorized (Token expired or missing)
      // Avoid duplicated toast for login failure which is usually handled in component
      else if (status === 401 && !error.config.url.includes('/login')) {
        toast.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        // Optional: Redirect to login or clear localStorage?
        // localStorage.removeItem('token');
        // window.location.href = '/'; 
      }

      // 403: Forbidden (Role violation)
      else if (status === 403) {
        toast.error(data.message || "Bạn không có quyền thực hiện hành động này!");
      }

      // 404: Not Found
      // We might not want to toast 404 globally as it might be a logic check (e.g. check if user exists)

    } else if (error.request) {
      // Network failure (Server down, no internet)
      toast.error("Mất kết nối đến Server! Vui lòng kiểm tra mạng.");
    }

    // Always reject promise so components can handle specific cases too
    return Promise.reject(error);
  }
);

export default axios;
