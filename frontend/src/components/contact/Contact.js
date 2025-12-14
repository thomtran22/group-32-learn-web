import React from "react";
import img1 from "../../assets/images/img-1.svg";
import img2 from "../../assets/images/img-2.svg";

function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <div className="inner-wrap">
          <div className="register-1">
            <img src={img1} alt="icon" />
            <div><a href="#">Đăng ký nhận tin</a></div>
          </div>
          <form className="form-register">
            <input type="text" placeholder="Nhập email của bạn..." />
            <button>Đăng Ký</button>
          </form>
          <div className="register-2">
            <img src={img2} alt="icon" />
            <div><a href="#">Hỗ trợ/Mua hàng</a></div>
          </div>
          <div className="register-3">097 328 58 86</div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
