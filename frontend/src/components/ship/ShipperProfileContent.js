import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaStar,
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaTransgender,
  FaBirthdayCake,
} from "react-icons/fa";
import "../../assets/css/shipper.css";

const ShipperProfileContent = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Quản lý popup

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    vehicleType: "",
    licensePlate: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/shipper/info");
      const { user, shipperDetails } = response.data;
      setProfile({ user, shipperDetails });
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
        phoneNumber: shipperDetails?.phoneNumber || "",
        vehicleType: shipperDetails?.vehicleType || "Motorbike",
        licensePlate: shipperDetails?.licensePlate || "",
      });
    } catch (err) {
      console.error("Lỗi tải hồ sơ:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("/shipper/info", {
        fullName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phoneNumber,
        vehicleType: formData.vehicleType,
        licensePlate: formData.licensePlate,
      });
      setIsEditing(false);
      fetchProfileData();
      toast.success("Cập nhật hồ sơ thành công!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      return toast.info("Mật khẩu mới và xác nhận không khớp!");
    }
    if (password.new.length < 6) {
      return toast.info("Mật khẩu mới phải từ 6 ký tự trở lên.");
    }

    try {
      await axios.put("/user/change-password", {
        currentPassword: password.current,
        newPassword: password.new,
      });
      toast.success("Đổi mật khẩu thành công!");
      setIsPasswordModalOpen(false);
      setPassword({ current: "", new: "", confirm: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Mật khẩu hiện tại không đúng."
      );
    }
  };

  if (loading && !isEditing)
    return <div className="shipper-content">Đang tải dữ liệu...</div>;

  const details = profile.shipperDetails || {};

  return (
    <div className="shipper-profile-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0 }}>Hồ Sơ Shipper</h2>
        {!isEditing && (
          <button
            className="btn-ship btn-ship-primary"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Chỉnh sửa hồ sơ
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="stats-grid">
          {/* CỘT 1: THÔNG TIN CÁ NHÂN */}
          <div
            className="stat-card"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              display: "block",
            }}
          >
            <h4 className="profile-card-header">
              <FaUser /> Thông tin định danh
            </h4>
            <div className="profile-input-group">
              <label className="profile-input-label">
                <FaIdCard /> Họ và Tên
              </label>
              <input
                className="ship-input"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                disabled={!isEditing}
                required
              />
            </div>
            <div className="profile-input-group">
              <label className="profile-input-label">
                <FaEnvelope /> Địa chỉ Email
              </label>
              <input
                type="email"
                className="ship-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
                required
              />
            </div>
            {/* giới tính */}
            <div className="profile-input-group">
              <label className="profile-input-label">
                <FaTransgender /> Giới tính
              </label>
              <select
                className="ship-input"
                value={formData.gender}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            {/* ngày sinh */}
            <div className="profile-input-group">
              <label className="profile-input-label">
                <FaBirthdayCake /> Ngày sinh
              </label>
              <input
                type="date"
                className="ship-input"
                value={formatDateForInput(formData.dateOfBirth)}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
              />
            </div>
            <div className="profile-input-group">
              <label className="profile-input-label">
                <FaPhone /> Số điện thoại liên lạc
              </label>
              <input
                className="ship-input"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* CỘT 2: THÔNG TIN VẬN CHUYỂN */}
          <div
            className="stat-card"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              display: "block",
            }}
          >
            <h4 className="profile-card-header">
              <FaMotorcycle /> Thông tin vận chuyển
            </h4>
            <div className="profile-input-group">
              <label className="profile-input-label">Loại phương tiện</label>
              <select
                className="ship-input"
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleType: e.target.value })
                }
                disabled={!isEditing}
              >
                <option value="Motorbike">Xe máy</option>
                <option value="Car">Ô tô</option>
              </select>
            </div>
            <div className="profile-input-group">
              <label className="profile-input-label">Biển số xe</label>
              <input
                className="ship-input"
                value={formData.licensePlate}
                onChange={(e) =>
                  setFormData({ ...formData, licensePlate: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="profile-input-group">
              <label className="profile-input-label">
                <FaMapMarkerAlt /> Khu vực đăng ký
              </label>
              <div
                className="ship-input"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                {details.workingArea?.join(", ") || "Toàn quốc"}
              </div>
            </div>
          </div>
        </div>

        {/* NÚT THAY ĐỔI MẬT KHẨU */}
        <div style={{ marginTop: "15px" }}>
          <span
            onClick={() => setIsPasswordModalOpen(true)}
            style={{
              color: "var(--ship-blue)",
              cursor: "pointer",
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.9em",
            }}
          >
            <FaLock size={12} /> Thay đổi mật khẩu?
          </span>
        </div>

        {isEditing && (
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "flex-end",
              marginTop: "30px",
            }}
          >
            <button
              type="button"
              className="btn-ship btn-ship-outline"
              onClick={() => {
                setIsEditing(false);
                fetchProfileData();
              }}
            >
              <FaTimes /> Hủy bỏ
            </button>
            <button
              type="submit"
              className="btn-ship btn-ship-success"
              disabled={loading}
            >
              <FaSave /> {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        )}
      </form>

      {/* MODAL ĐỔI MẬT KHẨU */}
      {isPasswordModalOpen && (
        <div className="modal-ship-overlay">
          <div className="modal-ship-content">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--ship-primary)" }}>
                Đổi mật khẩu
              </h3>
              <FaTimes
                onClick={() => setIsPasswordModalOpen(false)}
                style={{ cursor: "pointer", color: "#666" }}
              />
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label">Mật khẩu hiện tại</label>
              <input
                type="password"
                className="ship-input"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
              />
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label">Mật khẩu mới</label>
              <input
                type="password"
                className="ship-input"
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
              />
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                className="ship-input"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
              <button
                className="btn-ship btn-ship-outline"
                style={{ flex: 1 }}
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="btn-ship btn-ship-primary"
                style={{ flex: 1 }}
                onClick={handleChangePassword}
              >
                Xác nhận đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipperProfileContent;
