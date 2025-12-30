import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import { toast } from 'react-toastify';

function LoginModal({ closeModal, onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

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
        try {
          // Đăng nhập để lấy token
          const loginResponse = await axios.post(
            "http://localhost:4000/api/auth/login",
            {
              email: formData.email,
              password: formData.password,
            }
          );

          // Chỉ nhận token từ response (theo đúng sửa đổi của bạn ở backend)
          const { token } = loginResponse.data;

          // Lưu token vào LocalStorage
          localStorage.setItem("token", token);

          // Dùng token để hỏi Server: "Tôi là ai?"
          // Server sẽ verify token này hợp lệ không và trả về thông tin user (bao gồm role)
          const userResponse = await axios.get("http://localhost:4000/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token kèm header
            },
          });

          const userData = userResponse.data;
          const userRole = userData.role; // Lấy role từ database trả về

          toast.success(`Xin chào, ${userData.fullName}!`);
          if (onLoginSuccess) onLoginSuccess(userData);
          closeModal?.();

          // Chuyển hướng dựa trên role thực tế từ Server
          switch (userRole) {
            case "admin":
              navigate("/admin");
              break;
            case "shipper":
              navigate("/shipper");
              break;
            default:
              navigate("/");
              break;
          }

        } catch (error) {
          console.error("Login process error:", error);
          // Xử lý lỗi chi tiết hơn
          if (error.response) {
            // Lỗi từ server trả về (400, 401, 500...)
            if (error.response.status === 401) {
              toast.error("Sai email hoặc mật khẩu!");
            } else {
              // Lấy message lỗi cụ thể từ Backend gửi lên (nếu có)
              toast.error(error.response.data.message || "Đăng nhập thất bại!");
            }
          } else if (error.request) {
            // Lỗi không gọi được server (mất mạng, server tắt)
            toast.error("Không thể kết nối đến Server!");
          } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
          }
        }
      }

      if (mode === "register") {
        await axios.post(
          "http://localhost:4000/api/auth/register",
          formData
        );

        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setMode("login");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Đăng ký thất bại";
      toast.error(msg);
    }
  };

  const toggleForm = (shouldBeLogin) => {
    setMode(shouldBeLogin ? "login" : "register");
    setFormData(prev => ({ ...prev, email: "", password: "" }));
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