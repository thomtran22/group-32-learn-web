import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const BASE_URL = "http://localhost:3000/api";
const LOGIN_ENDPOINT = "/auth/login";

const TempLoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      onLoginSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message || "Email hoặc mật khẩu không đúng."
      );
    } finally {
      setLoading(false);
    }
  };

  const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };
  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };
  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#c90000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>
    </form>
  );
};
// ----------------------------------------------------

const Login = () => {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f8f8",
    display: "flex",
    flexDirection: "column",
  };

  const loginContainerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    flexGrow: 1,
    height: "fit-content",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={loginContainerStyle}>
          <h2
            style={{
              textAlign: "center",
              color: "#c90000",
              marginBottom: "25px",
            }}
          >
            Đăng nhập
          </h2>

          <TempLoginForm onLoginSuccess={() => navigate("/")} />

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "0.9em",
            }}
          >
            <p style={{ margin: "5px 0" }}>
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
