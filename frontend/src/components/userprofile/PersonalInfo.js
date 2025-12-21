import React, { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaLock,
  FaUser,
  FaEnvelope,
  FaTransgender,
  FaBirthdayCake,
  FaTimes,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axiosClient from "../../utils/axiosConfig";
import "../../assets/css/userprofile.css";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const res = await axiosClient.get("/user/me");
        setUserInfo(res.data);
        setOriginalUserInfo(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // Chuyển đổi Day/Month/Year từ state sang định dạng YYYY-MM-DD cho input date
  const getFormattedDate = () => {
    if (!userInfo.birthYear || !userInfo.birthMonth || !userInfo.birthDay)
      return "";
    const y = userInfo.birthYear;
    const m = String(userInfo.birthMonth).padStart(2, "0");
    const d = String(userInfo.birthDay).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Cập nhật lại 3 trường ngày, tháng, năm khi người dùng chọn ngày
  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // YYYY-MM-DD
    if (!selectedDate) return;
    const [year, month, day] = selectedDate.split("-");
    setUserInfo({
      ...userInfo,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
    });
  };

  const handleSaveInfo = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.put("/user/me", userInfo);

      if (res.data.user) {
        setUserInfo(res.data.user);
        setOriginalUserInfo(res.data.user);
      } else {
        setOriginalUserInfo(userInfo);
      }
      setIsEditing(false);
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Luu that bai", error);
      alert(error.response?.data?.message || "Cập nhật thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (password.new !== password.confirm) return alert("Mật khẩu không khớp");
    setIsLoading(true);
    try {
      await axiosClient.put("/user/change-password", {
        currentPassword: password.current,
        newPassword: password.new,
      });
      alert("Đổi mật khẩu thành công!");
      setIsPasswordModalOpen(false);
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      alert("Lỗi!");
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordModal = () =>
    isPasswordModalOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button
            onClick={() => setIsPasswordModalOpen(false)}
            className="modal-close"
          >
            <FaTimes color="#999" />
          </button>
          <h3 className="content-title">Đổi mật khẩu</h3>

          {/* Mật khẩu hiện tại */}
          <div className="input-group">
            <label className="input-label">Mật khẩu hiện tại</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword.current ? "text" : "password"}
                className="profile-input"
                style={{ paddingRight: "40px" }} // Tránh chữ đè lên icon
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div className="input-group">
            <label className="input-label">Mật khẩu mới</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword.new ? "text" : "password"}
                className="profile-input"
                style={{ paddingRight: "40px" }}
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="input-group">
            <label className="input-label">Xác nhận mật khẩu</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword.confirm ? "text" : "password"}
                className="profile-input"
                style={{ paddingRight: "40px" }}
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="btn btn-secondary"
              style={{ marginRight: "10px" }}
            >
              Hủy
            </button>
            <button
              onClick={handleChangePassword}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <div className="info-card" style={{ padding: "25px" }}>
        <h4
          className="input-label"
          style={{ color: "var(--primary-color)", marginBottom: "25px" }}
        >
          <FaUserEdit /> Thông tin tài khoản
        </h4>
        <div className="profile-grid">
          <div className="input-group">
            <label className="input-label">
              <FaUser /> Họ và Tên
            </label>
            <input
              className="profile-input"
              value={userInfo.fullName || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setUserInfo({ ...userInfo, fullName: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label className="input-label">
              <FaEnvelope /> Email
            </label>
            <input
              className="profile-input"
              value={userInfo.email || ""}
              disabled
            />
          </div>
          <div className="input-group">
            <label className="input-label">
              <FaTransgender /> Giới tính
            </label>
            <select
              className="profile-input"
              value={userInfo.gender || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setUserInfo({ ...userInfo, gender: e.target.value })
              }
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">
              <FaBirthdayCake /> Ngày sinh
            </label>
            <input
              type="date"
              className="profile-input"
              value={getFormattedDate()}
              disabled={!isEditing}
              max={today} // Chặn không cho chọn ngày tương lai
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            textAlign: "right",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
          }}
        >
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="btn-link"
          >
            <FaLock /> Đổi mật khẩu đăng nhập?
          </button>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Chỉnh sửa thông tin
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUserInfo(originalUserInfo);
                }}
                className="btn btn-secondary"
              >
                Hủy
              </button>
              <button onClick={handleSaveInfo} className="btn btn-success">
                Lưu lại
              </button>
            </div>
          )}
        </div>
      </div>
      <PasswordModal />
    </div>
  );
};

export default PersonalInfo;
