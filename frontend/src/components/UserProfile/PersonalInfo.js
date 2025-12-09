import React, { useState } from "react";
import { FaUserEdit, FaLock, FaPhone } from "react-icons/fa";

// --- Dữ liệu Mock ---
const MOCK_USER_INFO = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "0901 234 567",
  dob: "1995-10-20",
};

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Xử lý chỉnh sửa thông tin cá nhân
  const handleInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = () => {
    if (password.new !== password.confirm) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    // Giả lập API gọi đổi mật khẩu
    console.log("Đang đổi mật khẩu...");
    alert("Đổi mật khẩu thành công!");
    setPassword({ current: "", new: "", confirm: "" });
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100%",
  };
  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* 1. THÔNG TIN CƠ BẢN */}
      <div
        style={{
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h4
          style={{
            display: "flex",
            alignItems: "center",
            color: "#333",
            borderBottom: "1px dashed #ddd",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <FaUserEdit style={{ marginRight: "10px" }} /> Chi tiết Tài khoản
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Họ và Tên:
            </label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInfoChange}
              disabled={!isEditing}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              disabled
              style={{ ...inputStyle, backgroundColor: "#f5f5f5" }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Số điện thoại:
            </label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInfoChange}
              disabled={!isEditing}
              style={inputStyle}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Ngày sinh:
            </label>
            <input
              type="date"
              name="dob"
              value={userInfo.dob}
              onChange={handleInfoChange}
              disabled={!isEditing}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          {isEditing ? (
            <>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "#28a745",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={() => setIsEditing(false)}
              >
                Lưu thay đổi
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "#ccc",
                  color: "#333",
                }}
                onClick={() => {
                  setIsEditing(false);
                  setUserInfo(MOCK_USER_INFO);
                }}
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "#007bff",
                color: "white",
              }}
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* 2. QUẢN LÝ MẬT KHẨU */}
      <div
        style={{
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h4
          style={{
            display: "flex",
            alignItems: "center",
            color: "#333",
            borderBottom: "1px dashed #ddd",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <FaLock style={{ marginRight: "10px" }} /> Đổi Mật khẩu
        </h4>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Mật khẩu hiện tại:
            </label>
            <input
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
              style={inputStyle}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Mật khẩu mới:
            </label>
            <input
              type="password"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
              style={inputStyle}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "600",
              }}
            >
              Xác nhận mật khẩu mới:
            </label>
            <input
              type="password"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#c90000",
              color: "white",
            }}
            onClick={handleChangePassword}
            disabled={!password.current || !password.new || !password.confirm}
          >
            Đổi Mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
