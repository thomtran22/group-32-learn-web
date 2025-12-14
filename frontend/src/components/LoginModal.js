import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import axiosClient from "./../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const apiClient = axiosClient;

function LoginModal({ closeModal }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "Female",
    birthDay: "1",
    birthMonth: "12",
    birthYear: new Date().getFullYear().toString(),
    role: "customer",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const res = await apiClient.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { token, role, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("fullName", user?.fullName || "Người dùng");

        alert("Đăng nhập thành công!");
        console.log("Login result:", res.data);

        if (role === "shipper") {
          navigate("/shipper");
        } else if (role === "customer") {
          navigate("/Profile");
        } else {
          navigate("/");
        }
        closeModal();
      } else {
        const res = await apiClient.post("/auth/register", formData);

        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        console.log("Register result:", res.data);

        setIsLogin(true);
        setFormData((prev) => ({
          ...prev,
          email: formData.email,
          password: "",
        }));
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          (isLogin ? "Lỗi đăng nhập" : "Lỗi đăng ký")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = (shouldBeLogin) => {
    setIsLogin(shouldBeLogin);

    setFormData({
      email: formData.email,
      password: "",
      fullName: "",
      gender: "Female",
      birthDay: "1",
      birthMonth: "12",
      birthYear: new Date().getFullYear().toString(),
      role: "customer",
    });
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
           {" "}
      <div
        className={
          isLogin
            ? "login-modal-content login-style"
            : "login-modal-content register-style"
        }
        onClick={(e) => e.stopPropagation()}
      >
               {" "}
        {isLogin ? (
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            toggleForm={toggleForm}
            isSubmitting={isSubmitting}
          />
        ) : (
          <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            toggleForm={toggleForm}
            isSubmitting={isSubmitting}
          />
        )}
             {" "}
      </div>
         {" "}
    </div>
  );
}

export default LoginModal;
