import React, { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaLock,
  FaUser,
  FaEnvelope,
  FaTransgender,
  FaBirthdayCake,
  FaTimes,
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

  const handleSaveInfo = async () => {
    setIsLoading(true);
    try {
      await axiosClient.put("/user/me", userInfo);
      setOriginalUserInfo(userInfo);
      setIsEditing(false);
      alert("Thành công!");
    } catch (error) {
      alert("Thất bại!");
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
          <div className="input-group">
            <label className="input-label">Mật khẩu hiện tại</label>
            <input
              type="password"
              className="profile-input"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label className="input-label">Mật khẩu mới</label>
            <input
              type="password"
              className="profile-input"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label className="input-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="profile-input"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
            />
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
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                placeholder="Ngày"
                className="profile-input"
                value={userInfo.birthDay || ""}
                disabled={!isEditing}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, birthDay: e.target.value })
                }
              />
              <input
                placeholder="Tháng"
                className="profile-input"
                value={userInfo.birthMonth || ""}
                disabled={!isEditing}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, birthMonth: e.target.value })
                }
              />
              <input
                placeholder="Năm"
                className="profile-input"
                value={userInfo.birthYear || ""}
                disabled={!isEditing}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, birthYear: e.target.value })
                }
              />
            </div>
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
