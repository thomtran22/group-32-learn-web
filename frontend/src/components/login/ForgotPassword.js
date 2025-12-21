import React, { useState } from "react";
import axios from "axios";

function ForgotPassword({ toggleBack }) {
  const inputClassName =
    "mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-lg font-medium " +
    "outline-none ring-1 ring-gray-200 focus:bg-white focus:ring-black transition";

  // underline hover giống LoginForm
  const fancyLinkClassName =
    "relative inline-block font-semibold text-gray-800 px-1 rounded-[4px] " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] " +
    "after:bg-black after:transition-all after:duration-300 after:origin-left after:z-0 " +
    "hover:after:bottom-[2px] hover:after:h-full hover:text-white " +
    "active:opacity-80 transition";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/auth/forgot-password", {
        email,
      });

      // ❗ message trung tính – không lộ email
      setMessage("Nếu email tồn tại, link khôi phục đã được gửi.");
    } catch (error) {
      setMessage("Nếu email tồn tại, link khôi phục đã được gửi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Khôi phục mật khẩu</h2>

      <p className="text-center text-gray-600 text-base">
        Nhập email để nhận link đặt lại mật khẩu
      </p>

      <div className="form-group">
        <label className="text-xl font-bold">Email*</label>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black py-3 text-lg font-bold text-white tracking-wide
                   hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                   disabled:opacity-60
                   active:scale-[0.98] transition"
      >
        {loading ? "Đang gửi..." : "Gửi link khôi phục"}
      </button>

      {message && (
        <p className="text-center text-base text-gray-700">{message}</p>
      )}

      <div className="text-center text-lg">
        <button
          type="button"
          className={fancyLinkClassName}
          onClick={toggleBack}
        >
          <span className="relative z-10">Quay lại đăng nhập</span>
        </button>
      </div>
    </form>
  );
}

export default ForgotPassword;
