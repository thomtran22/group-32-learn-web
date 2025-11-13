import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="thuong-footer-container">
        <div>
          <h4>Hệ thống cửa hàng</h4>
          <ul>
            <li>27 Chùa Bộc, Đống Đa, Hà Nội</li>
            <li>242 Thái Hà, Đống Đa, Hà Nội</li>
            <li>63 Đại Cồ Việt, Hai Bà Trưng</li>
          </ul>
        </div>
        <div>
          <h4>Chính sách & Quy định</h4>
          <ul>
            <li>
              <a href="#">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Hướng dẫn mua hàng</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <ul>
            <li>Email: info@360boutique.vn</li>
            <li>Hotline: 097 273 58 58</li>
            <li>Fanpage: 360 Boutique</li>
          </ul>
        </div>
      </div>
      <div className="thuong-footer-bottom">
        © 2025 360 Boutique — Trang được thiết kế lại bởi Thượng.
      </div>
    </footer>
  );
};

export default Footer;
