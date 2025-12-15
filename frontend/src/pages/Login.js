// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import * as authApi from "../services/authApi";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ fullName: "", email: "", password: "", role: "user" });

  const toggleForm = (showLogin) => {
    setMessage(null);
    setIsLogin(showLogin);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((s) => ({ ...s, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegData((s) => ({ ...s, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await authApi.login(loginData);
      // store token (fake or real) and basic user info
      if (res.token) localStorage.setItem('token', res.token);
      if (res.user) localStorage.setItem('user', JSON.stringify(res.user));
      setMessage(res.message || 'Đăng nhập thành công');
      setTimeout(() => navigate('/'), 700);
    } catch (err) {
      setMessage(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await authApi.register(regData);
      setMessage(res.message || 'Đăng ký thành công');
      // after register, switch to login
      setIsLogin(true);
      setLoginData({ email: regData.email, password: '' });
    } catch (err) {
      setMessage(err.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: 40 }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>

        {message && <div className="alert">{message}</div>}

        <div className="login-modal-content">
          {isLogin ? (
            <LoginForm
              formData={loginData}
              handleChange={handleLoginChange}
              handleSubmit={handleLoginSubmit}
              toggleForm={toggleForm}
            />
          ) : (
            <RegisterForm
              formData={regData}
              handleChange={handleRegisterChange}
              handleSubmit={handleRegisterSubmit}
              toggleForm={toggleForm}
            />
          )}

          <div style={{ marginTop: 12 }}>
            <button className="link-btn" onClick={() => toggleForm(!isLogin)}>
              {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
            </button>
          </div>

          {loading && <div style={{ marginTop: 12 }}>Đang xử lý…</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;