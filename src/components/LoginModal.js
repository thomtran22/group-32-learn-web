import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import axios from "axios";

function LoginModal({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);

  // ---- STATE LƯU FORM DỮ LIỆU ----
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "Female",
    birthDay: "1",
    birthMonth: "12",
    birthYear: new Date().getFullYear().toString(),
    role: "customer",   // ⭐ Mặc định
  });

  // ---- HANDLE CHANGE ----
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // ---- HANDLE SUBMIT (LOGIN / REGISTER) ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // ====== LOGIN ======
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Lưu token + role
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userName", res.data.user.fullName);
         if (res.data.role) {
        localStorage.setItem("userRole", res.data.role);
      }
      if (res.data.user?.fullName) {
        localStorage.setItem("fullName", res.data.user.fullName);
      }

        alert("Đăng nhập thành công!");

        console.log("Login result:", res.data);

        // Redirect theo role
      window.location.href = "/";

      } catch (err) {
        alert(err.response?.data?.message || "Lỗi đăng nhập");
      }

    } else {
      // ====== REGISTER ======
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData
        );

        alert("Đăng ký thành công!");

        console.log("Register result:", res.data);

        // Chuyển sang form login
        setIsLogin(true);

      } catch (err) {
        alert(err.response?.data?.message || "Lỗi đăng ký");
      }
    }
  };

  // ---- CHUYỂN QUA LẠI LOGIN <-> REGISTER ----
  const toggleForm = (shouldBeLogin) => {
    setIsLogin(shouldBeLogin);

    // Reset form
    setFormData({
      email: "",
      password: "",
      fullName: "",
      gender: "Female",
      birthDay: "1",
      birthMonth: "12",
      birthYear: new Date().getFullYear().toString(),
      role: "customer", // ⭐ Reset luôn role
    });
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div
        className={
          isLogin
            ? "login-modal-content login-style"
            : "login-modal-content register-style"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {isLogin ? (
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            toggleForm={toggleForm}
          />
        ) : (
          <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            toggleForm={toggleForm}
          />
        )}
      </div>
    </div>
  );
}

export default LoginModal;
