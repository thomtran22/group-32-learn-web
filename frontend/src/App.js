import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios"; // ✅ IMPORT THƯ VIỆN AXIOS

// ===============================================
// CẤU HÌNH AXIOS TOÀN CỤC (GLOBAL INTERCEPTORS)
// PHẢI ĐẶT TRƯỚC HÀM APP NẾU MUỐN CHẠY MỘT LẦN KHI ỨNG DỤNG KHỞI ĐỘNG
// ===============================================

// 1. Cấu hình baseURL và withCredentials
axios.defaults.baseURL = "/"; // Dùng đường dẫn tương đối để tận dụng Proxy (Port 5000)
axios.defaults.withCredentials = true;

// 2. Interceptor: Tự động đính kèm Token vào Header (Request)
axios.interceptors.request.use(
  (config) => {
    // Lấy Token từ Local Storage
    const token = localStorage.getItem("shipper_token");

    // Nếu Token tồn tại, thêm vào Header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor: Xử lý Lỗi 401/403 (Token hết hạn) (Response)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu lỗi 401 (Unauthorized) hoặc 403 (Forbidden)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.error(
        "Token hết hạn hoặc không hợp lệ. Đang chuyển hướng đăng nhập."
      );
      // Xóa token cũ
      localStorage.removeItem("shipper_token");
      // Chuyển hướng về trang đăng nhập
      // Dùng window.location.href để đảm bảo tải lại toàn bộ ứng dụng
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const UserProfile = lazy(() => import("./pages/UserProfile"));
const ShipperMainLayout = lazy(() => import("./pages/ShipperMainLayout"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

function App() {
  return (
    <Suspense fallback={<div>Đang tải giao diện...</div>}>
      <Routes>
        <Route path="/shipper" element={<ShipperMainLayout />} />
        <Route path="/shipper/stats" element={<ShipperMainLayout />} />
        <Route path="/shipper/profile" element={<ShipperMainLayout />} />

        <Route
          path="/"
          element={
            <>
              <Header />
              <UserProfile />
              <Footer />
            </>
          }
        />

        {<Route path="/product/:id" element={<ProductDetail />} />}
      </Routes>
    </Suspense>
  );
}

export default App;
