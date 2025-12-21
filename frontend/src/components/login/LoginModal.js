import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword"; 
import axios from "axios";

function LoginModal({ closeModal }) {
  const [mode, setMode] = useState("login"); 
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "auto";
    };
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "Female",
    dateOfBirth: "",
    role: "customer",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (mode === "login") {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.role || "");
        localStorage.setItem("fullName", response.data.user?.fullName || "");

        alert("Đăng nhập thành công!");
        window.location.href = "/";
      }

      if (mode === "register") {
        await axios.post("http://localhost:3000/api/auth/register", formData);
        alert("Đăng ký thành công!");
        setMode("login"); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const toggleForm = (shouldBeLogin) => {
    if (shouldBeLogin) setMode("login");
    else setMode("register");

    setFormData({
      fullName: "",
      email: "",
      password: "",
      gender: "Female",
      dateOfBirth: "",
      role: "customer",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 px-3 sm:px-4 overflow-y-auto"
      onClick={closeModal}
    >
      <div className="min-h-[100dvh] flex items-center justify-center py-6">
        <div
          className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl
                     max-h-[calc(100dvh-3rem)] overflow-y-auto
                     p-4 sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center
                       rounded-full text-gray-500 hover:bg-black hover:text-white transition"
            aria-label="Close"
          >
            ✕
          </button>

          {mode === "login" && (
            <LoginForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
              goForgotPassword={() => setMode("forgot")} 
            />
          )}

          {mode === "register" && (
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
            />
          )}

          {mode === "forgot" && (
            <ForgotPassword toggleBack={() => setMode("login")} /> 
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
