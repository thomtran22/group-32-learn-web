import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const heroSectionStyle = {
    padding: "100px 20px",
    textAlign: "center",
    backgroundColor: "#f0f8ff",
    fontSize: "1.2em",
    flexShrink: 0,
  };

  const mainContentStyle = {
    flex: 1,
    padding: "20px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <main style={mainContentStyle}>
        <section style={heroSectionStyle}>
          <h2>Chào mừng đến với Trang Chủ!</h2>
          <p>Đây là nội dung chính của trang web.</p>
        </section>

        <div style={{ padding: "20px" }}>
          <h3>Sản phẩm Nổi bật</h3>
          <p>Nội dung trang chủ sẽ được tải ở đây...</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
