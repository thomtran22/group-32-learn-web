import React, { useState } from "react";
import "../assets/css/style.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    setSent(true);
  };

  return (
    <div className="fp-container">
      <h1 className="fp-title">Quên mật khẩu</h1>
      <p className="fp-subtitle">
        Nhập email của bạn và chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu.
      </p>

      {!sent ? (
        <form onSubmit={handleSubmit}>
          <label className="fp-label">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn…"
            className="fp-input"
          />

          <button type="submit" disabled={loading} className="fp-btn">
            {loading ? "Đang gửi…" : "Gửi link khôi phục"}
          </button>
        </form>
      ) : (
        <div className="fp-success">
          Link khôi phục mật khẩu đã được gửi đến{" "}
          <span className="fp-email">{email}</span>. <br />
          Vui lòng kiểm tra hộp thư của bạn.
        </div>
      )}
    </div>
  );
}
