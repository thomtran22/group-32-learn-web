import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMotorcycle,
  FaIdCard,
  FaMapMarkerAlt,
  FaStar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCar,
  FaCamera,
} from "react-icons/fa";

const apiBaseUrl = "/shipper";

const ShipperProfileContent = () => {
  // --- State Logic (Giữ nguyên) ---
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
        vehicleType: shipperDetails?.vehicleType || "Motorbike",
        licensePlate: shipperDetails?.licensePlate || "",
      });
    } catch (err) {
      console.error("Lỗi tải hồ sơ:", err);
      setError("Không thể tải hồ sơ Shipper.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError(err.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  // --- Helper Render Stars ---
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i <= (rating || 5) ? "#ffc107" : "#e4e5e9"}
          size={18}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  if (loading && !profile.user)
    return <div style={styles.loading}>Đang tải hồ sơ...</div>;
  if (error) return <div style={styles.error}>Lỗi: {error}</div>;

  const user = profile.user || {};
  const details = profile.shipperDetails || {};

  return (
    <div style={styles.container}>
      {/* Header Profile Card */}
      <div style={styles.profileHeader}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatarPlaceholder}>
            <FaUser size={40} color="#fff" />
          </div>
          {/* Nút giả lập đổi avatar */}
          <button style={styles.cameraBtn} title="Đổi ảnh đại diện">
            <FaCamera size={14} />
          </button>
        </div>
        <div style={styles.headerInfo}>
          <h2 style={styles.userName}>{user.fullName}</h2>
          <div style={styles.ratingBox}>
            {renderStars(details.rating)}
            <span style={styles.ratingText}>({details.rating || 5} / 5)</span>
          </div>
          <span
            style={{
              ...styles.statusBadge,
              backgroundColor:
                details.status === "Active" ? "#28a745" : "#6c757d",
            }}
          >
            {details.status || "Offline"}
          </span>
        </div>
      </div>

      {/* Main Form / Info Section */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Thông Tin Chi Tiết</h3>
          {!isEditing && (
            <button style={styles.editBtn} onClick={() => setIsEditing(true)}>
              <FaEdit style={{ marginRight: "5px" }} /> Chỉnh sửa
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.gridContainer}>
            {/* Cột 1: Cá nhân */}
            <div style={styles.column}>
              <h4 style={styles.sectionTitle}>Cá nhân</h4>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaUser style={styles.icon} /> Họ và Tên
                </label>
                {isEditing ? (
                  <input
                    style={styles.input}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                ) : (
                  <p style={styles.textDisplay}>{user.fullName}</p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaEnvelope style={styles.icon} /> Email
                </label>
                <p style={{ ...styles.textDisplay, color: "#666" }}>
                  {user.email}
                </p>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaPhone style={styles.icon} /> Số điện thoại
                </label>
                {isEditing ? (
                  <input
                    style={styles.input}
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <p style={styles.textDisplay}>{user.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Cột 2: Phương tiện & Công việc */}
            <div style={styles.column}>
              <h4 style={styles.sectionTitle}>Phương tiện & Công việc</h4>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  {formData.vehicleType === "Car" ? (
                    <FaCar style={styles.icon} />
                  ) : (
                    <FaMotorcycle style={styles.icon} />
                  )}
                  Loại phương tiện
                </label>
                {isEditing ? (
                  <select
                    style={styles.input}
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="Motorbike">Xe máy</option>
                    <option value="Car">Ô tô / Xe tải</option>
                  </select>
                ) : (
                  <p style={styles.textDisplay}>
                    {details.vehicleType === "Car" ? "Ô tô / Xe tải" : "Xe máy"}
                  </p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaIdCard style={styles.icon} /> Biển số xe
                </label>
                {isEditing ? (
                  <input
                    style={styles.input}
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                  />
                ) : (
                  <p style={styles.textDisplay}>{details.licensePlate}</p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaMapMarkerAlt style={styles.icon} /> Khu vực hoạt động
                </label>
                <p style={styles.textDisplay}>
                  {details.workingArea?.join(", ") || "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.saveBtn} disabled={loading}>
                <FaSave style={{ marginRight: "5px" }} /> Lưu thay đổi
              </button>
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                <FaTimes style={{ marginRight: "5px" }} /> Hủy bỏ
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// --- CSS-in-JS Styles ---
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  loading: { textAlign: "center", padding: "40px", color: "#666" },
  error: { color: "red", textAlign: "center", padding: "20px" },

  // Header Styles
  profileHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    marginBottom: "25px",
    background: "linear-gradient(to right, #ffffff, #f8f9fa)",
  },
  avatarContainer: {
    position: "relative",
    marginRight: "30px",
  },
  avatarPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0,123,255,0.3)",
  },
  cameraBtn: {
    position: "absolute",
    bottom: "0",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555",
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    color: "#333",
    fontWeight: "700",
  },
  ratingBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  ratingText: {
    marginLeft: "8px",
    color: "#666",
    fontSize: "14px",
  },
  statusBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  // Main Card Styles
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    padding: "30px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#333",
    fontWeight: "600",
  },
  editBtn: {
    backgroundColor: "transparent",
    border: "1px solid #007bff",
    color: "#007bff",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
  },

  // Form Grid
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "14px",
    textTransform: "uppercase",
    color: "#888",
    letterSpacing: "1px",
    marginBottom: "10px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "5px",
    display: "inline-block",
    width: "100%",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "13px",
    color: "#6c757d",
    marginBottom: "8px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "8px",
    color: "#007bff",
  },
  input: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box", // Quan trọng để padding không làm vỡ layout
  },
  textDisplay: {
    margin: 0,
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
    padding: "10px 0", // Canh chỉnh chiều cao giống input
    borderBottom: "1px dashed #eee",
  },

  // Buttons Footer
  buttonGroup: {
    marginTop: "40px",
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  saveBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0,123,255,0.2)",
  },
  cancelBtn: {
    backgroundColor: "#f8f9fa",
    color: "#333",
    border: "1px solid #ddd",
    padding: "10px 24px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};

export default ShipperProfileContent;
