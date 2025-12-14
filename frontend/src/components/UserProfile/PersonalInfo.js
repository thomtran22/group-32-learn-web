import React, { useState, useEffect } from "react";
import { FaUserEdit, FaLock } from "react-icons/fa";
import axiosClient from "../../utils/axiosConfig";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get("/user/me");
      const data = res.data;

      if (data.dateOfBirth) {
        data.dateOfBirth = data.dateOfBirth.split("T")[0];
      }

      setUserInfo(data);
      setOriginalUserInfo(data);
    } catch (error) {
      console.error("Lỗi tải thông tin:", error);
      alert("Không thể tải thông tin cá nhân.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  /* ================= UPDATE INFO ================= */
  const handleSaveInfo = async () => {
    if (!userInfo.firstName || !userInfo.phoneNumber) {
      alert("Họ và Tên, Số điện thoại không được để trống.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phoneNumber,
        dateOfBirth: userInfo.dateOfBirth,
      };

      const res = await axiosClient.put("/user/me", payload);
      const updated = res.data;

      if (updated.dateOfBirth) {
        updated.dateOfBirth = updated.dateOfBirth.split("T")[0];
      }

      setUserInfo(updated);
      setOriginalUserInfo(updated);
      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert(error.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      alert("Xác nhận mật khẩu không khớp.");
      return;
    }

    if (password.new.length < 6) {
      alert("Mật khẩu mới phải ≥ 6 ký tự.");
      return;
    }

    setIsLoading(true);
    try {
      await axiosClient.post("/auth/change-password", {
        currentPassword: password.current,
        newPassword: password.new,
      });

      alert("Đổi mật khẩu thành công!");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      alert(error.response?.data?.message || "Mật khẩu hiện tại không đúng.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100%",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* ===== THÔNG TIN CÁ NHÂN ===== */}
      <div
        style={{
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaUserEdit /> Thông tin cá nhân
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <input
            style={inputStyle}
            placeholder="Họ"
            value={userInfo.firstName}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }
          />
          <input
            style={inputStyle}
            placeholder="Tên"
            value={userInfo.lastName}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo({ ...userInfo, lastName: e.target.value })
            }
          />
          <input
            style={{ ...inputStyle, background: "#f5f5f5" }}
            disabled
            value={userInfo.email}
          />
          <input
            style={inputStyle}
            placeholder="Số điện thoại"
            value={userInfo.phoneNumber}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phoneNumber: e.target.value })
            }
          />
          <input
            type="date"
            style={inputStyle}
            value={userInfo.dateOfBirth}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo({ ...userInfo, dateOfBirth: e.target.value })
            }
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          {isEditing ? (
            <>
              <button onClick={handleSaveInfo} disabled={isLoading}>
                Lưu
              </button>
              <button
                onClick={() => {
                  setUserInfo(originalUserInfo);
                  setIsEditing(false);
                }}
              >
                Hủy
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
          )}
        </div>
      </div>

      {/* ===== ĐỔI MẬT KHẨU ===== */}
      <div
        style={{
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaLock /> Đổi mật khẩu
        </h4>

        <input
          type="password"
          style={inputStyle}
          placeholder="Mật khẩu hiện tại"
          value={password.current}
          onChange={(e) =>
            setPassword({ ...password, current: e.target.value })
          }
        />
        <input
          type="password"
          style={inputStyle}
          placeholder="Mật khẩu mới"
          value={password.new}
          onChange={(e) => setPassword({ ...password, new: e.target.value })}
        />
        <input
          type="password"
          style={inputStyle}
          placeholder="Xác nhận mật khẩu"
          value={password.confirm}
          onChange={(e) =>
            setPassword({ ...password, confirm: e.target.value })
          }
        />

        <button
          onClick={handleChangePassword}
          disabled={isLoading || !password.current || !password.new}
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
