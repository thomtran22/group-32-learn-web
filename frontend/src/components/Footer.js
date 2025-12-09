import React from "react";
import logo from "../assets/images/logo.svg";
import footerImg from "../assets/images/footer.jpg";
import "../assets/css/style.css";
import "../assets/css/detail.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="inner-wrap">
          <div className="menu-1">
            <h3 className="inner-title">HỆ THỐNG CỬA HÀNG</h3>
            <ul>
              <li>27 Chùa Bộc, Đống Đa, HN</li>
              <li>242 Thái Hà, Đống Đa, HN</li>
              <li>63 Đại Cổ Việt, Hai Bà Trưng, HN</li>
              <li>69 Quang Trung, Hà Đông, HN</li>
              <li>272 Tô Hiệu, Lê Chân, HP</li>
            </ul>
          </div>
          <div className="menu-2">
            <h3 className="inner-title">CHÍNH SÁCH VÀ QUY ĐỊNH CHUNG</h3>
            <ul>
              <li>Hướng Dẫn Mua Hàng</li>
              <li>Hình Thức Thanh Toán</li>
              <li>Quy Định Và Bảo Mật Thông Tin</li>
              <li>Chính Sách Bảo Hành</li>
              <li>Chính Sách Đổi Hàng</li>
              <li>Chính Sách Vận Chuyển</li>
              <li>Điều Khoản Dịch Vụ</li>
            </ul>
          </div>
          <div className="menu-3">
            <h3 className="inner-title">ĐỊA CHỈ</h3>
            <ul>
              <li>CÔNG TY CỔ PHẦN THỜI TRANG 360</li>
              <li>VPGD: Đội 6, Xã Phương Đình, Huyện Đan Phượng, Hà Nội</li>
              <li>Facebook: 360Boutique</li>
              <li>Hotline: 0973285886 – 0862052988</li>
            </ul>
          </div>
          <div className="fanpage">
            <h3 className="inner-title">Fanpage</h3>
            <div className="inner-image-1">
              <img src={footerImg} alt="fanpage" />
            </div>
            <div className="inner-image-2">
              <img src={logo} alt="logo" />
              <div className="inner-desc">
                <div>360 Boutique</div>
                <div>540.341 lượt thích</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
