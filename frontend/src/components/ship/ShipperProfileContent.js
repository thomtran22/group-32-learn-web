import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";

const apiBaseUrl = "/shipper";

const ShipperProfileContent = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBaseUrl}/info`);

      const { user, shipperDetails } = response.data;

      setProfile({ user, shipperDetails });

      setFormData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        vehicleType: shipperDetails?.vehicleType || "",
        licensePlate: shipperDetails?.licensePlate || "",
      });
    } catch (err) {
      console.error(
        "Lỗi tải hồ sơ:",
        err.response?.data?.message || err.message
      );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/info`, {
        fullName: formData.fullName,
        phone: formData.phoneNumber,
        vehicleType: formData.vehicleType,
        licensePlate: formData.licensePlate,
      });

      setIsEditing(false);
      fetchProfileData();
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
          <div>
            <h3>Thông tin Cá nhân</h3>
            <label>Tên:</label>{" "}
            <input
              name="fullName"
              value={formData.fullName || ""}
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
              <strong>Họ và Tên:</strong> {user.fullName}{" "}
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
