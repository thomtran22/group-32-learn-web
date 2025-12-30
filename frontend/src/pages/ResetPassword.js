import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Link không hợp lệ");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("https://group-32-learn-web-8hmv.onrender.com/api/auth/reset-password", {
        token,
        newPassword,
      });

      setMessage("Đổi mật khẩu thành công. Đang chuyển về đăng nhập...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Link không hợp lệ hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-gray-50">
      <div className="w-full bg-black text-white py-6 text-center">
        <h1 className="text-2xl font-bold tracking-wide">
          Thay đổi mật khẩu
        </h1>
        <p className="mt-1 text-sm opacity-80">
          Bảo mật tài khoản của bạn bằng mật khẩu mới
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <div>
            <label className="block font-semibold mb-1">Mật khẩu mới</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none ring-1 ring-gray-200 focus:bg-white focus:ring-black transition"
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none ring-1 ring-gray-200 focus:bg-white focus:ring-black transition"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 text-lg font-bold text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black disabled:opacity-60 transition"
          >
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>

          {message && (
            <p className="text-center text-gray-700 text-base">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;