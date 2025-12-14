// src/components/Section4.js
import React from "react";
import blog1 from "../../assets/images/blog-1.jpg";
import blog2 from "../../assets/images/blog-2.png";
import blog3 from "../../assets/images/blog-3.png";

function Section4() {
  const blogs = [
    { id: 1, date: "15/02/2023", title1: "THỬ THÁCH MÙA “YÊU” – 100% NHẬN QUÀ", title2: "LOA LOA LOA !!! Vậy là chỉ còn vài ngày nữa là đến ngày Valentine, để củng cố thêm tình cảm cho...", image: blog1 },
    { id: 2, date: "15/02/2023", title1: "ĐÓN XUÂN SANG – LÊN ĐỒ TẾT | UP TO 50%", title2: "Đón Tết Quý Mão, 360® chiêu đãi bạn với loạt ưu...", image: blog2 },
    { id: 3, date: "15/02/2023", title1: "Không khí lạnh bao trùm, miền Bắc rét đậm rét hại", title2: "Trong dịp nghỉ Tết Dương lịch 2023, thời tiết Bắc Bộ rét đậm, vùng núi rét hại và có mưa...", image: blog3 },
  ];

  return (
    <div className="section-4">
      <div className="container">
        <h2 className="inner-title">TIN TỨC</h2>
        <div className="inner-wrap">
          {blogs.map((blog) => (
            <div className="blog-item" key={blog.id}>
              <div className="inner-image">
                <a href="#"><img src={blog.image} alt={blog.title1} /></a>
              </div>
              <div className="inner-info">
                <div className="inner-time">{blog.date}</div>
                <div className="inner-title-1">{blog.title1}</div>
                <div className="inner-title-2">{blog.title2}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section4;
