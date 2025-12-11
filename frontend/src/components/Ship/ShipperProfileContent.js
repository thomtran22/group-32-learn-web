// src/components/ship/ShipperProfileContent.js

import React, { useState, useEffect } from "react";
import axios from "axios";

// Đường dẫn cơ sở (Axios Interceptor sẽ lo việc thêm http://localhost:5000)
const apiBaseUrl = "/api/shipper"; 

const ShipperProfileContent = () => {
  // Lưu trữ dữ liệu profile gốc: { user: {...}, shipperDetails: {...} }
  const [profile, setProfile] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Dữ liệu form dùng để chỉnh sửa
  const [formData, setFormData] = useState({}); 

  // 🚀 TẢI DỮ LIỆU BAN ĐẦU
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      // ❌ LOẠI BỎ: Không cần lấy Token và truyền Header thủ công
      
      // Axios Interceptor sẽ tự động đính kèm Token
      const response = await axios.get(`${apiBaseUrl}/info`); 
      
      const { user, shipperDetails } = response.data;
      
      // Lưu trữ toàn bộ dữ liệu gốc
      setProfile({ user, shipperDetails }); 
      
      // Gán dữ liệu cho form chỉnh sửa
      setFormData({
        firstName: user.firstName || "",
        phoneNumber: user.phoneNumber || "",
        // Đảm bảo truy cập an toàn shipperDetails
        vehicleType: shipperDetails?.vehicleType || "", 
        licensePlate: shipperDetails?.licensePlate || "",
      });
    } catch (err) {
      // Interceptor sẽ xử lý lỗi 401/403 (chuyển hướng đăng nhập)
      console.error("Lỗi tải hồ sơ:", err.response?.data?.message || err.message);
      setError("Không thể tải hồ sơ Shipper.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔄 CẬP NHẬT DỮ LIỆU
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Axios Interceptor đã lo việc gửi Token Header
      await axios.put(`${apiBaseUrl}/info`, formData); 

      setIsEditing(false);
      fetchProfileData(); // Tải lại dữ liệu mới nhất
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error(
        "Lỗi cập nhật:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải thông tin tài khoản...</div>;
  if (error) return <div style={{ color: "red" }}>Lỗi: {error}</div>;

  // Lấy dữ liệu an toàn từ state
  const user = profile.user || {};
  const details = profile.shipperDetails || {};

  return (
    <div>
      <h2>👤 Thông Tin Tài Khoản</h2>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Thông tin Cá nhân (User) */}
          <div>
            <h3>Thông tin Cá nhân</h3>
            <label>Tên:</label>{" "}
            <input
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              disabled={loading}
            />
            <label>Điện thoại:</label>{" "}
            <input
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              disabled={loading}
            />
            <p>
              Email: <strong>{user.email}</strong>
            </p>
          </div>

          {/* Thông tin Vận chuyển (Shipper Details) */}
          <div>
            <h3>Thông tin Vận chuyển</h3>
            <label>Loại xe:</label>
            <select
              name="vehicleType"
              value={formData.vehicleType || ""}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Motorbike">Xe máy</option>
              <option value="Car">Ô tô</option>
            </select>
            <label>Biển số xe:</label>{" "}
            <input
              name="licensePlate"
              value={formData.licensePlate || ""}
              onChange={handleChange}
              disabled={loading}
            />
            {/* Sử dụng optional chaining (?.) an toàn */}
            <p>Khu vực hoạt động: {details.workingArea?.join(", ") || "N/A"}</p>
          </div>

          <div style={{ gridColumn: "1 / 3", marginTop: "20px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu Thay Đổi"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={loading}
              style={{ marginLeft: "10px" }}
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <h3>Thông tin Cá nhân</h3>
            <p>
              <strong>Họ và Tên:</strong> {user.firstName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Điện thoại:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Rating TB:</strong> {details.rating || "N/A"} / 5
            </p>
          </div>
          <div>
            <h3>Thông tin Vận chuyển</h3>
            <p>
              <strong>Trạng thái:</strong> {details.status}
            </p>
            <p>
              <strong>Loại xe:</strong> {details.vehicleType}
            </p>
            <p>
              <strong>Biển số xe:</strong> {details.licensePlate}
            </p>
            <p>
              <strong>Khu vực:</strong>{" "}
              {details.workingArea?.join(", ") || "N/A"}
            </p>
          </div>

          <div style={{ gridColumn: "1 / 3", marginTop: "20px" }}>
            <button onClick={() => setIsEditing(true)}>Chỉnh sửa Hồ sơ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipperProfileContent;