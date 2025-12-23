import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import bg1 from "../../assets/images/background-1.jpg";
import bg2 from "../../assets/images/background-2.jpg";
import bg3 from "../../assets/images/background-3.jpg";

function BackGround() {
  const slides = [bg1, bg2, bg3];

  return (
    <div className="section-1 w-full relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="mySwiper w-full h-[500px] md:h-[700px] lg:h-[85vh]"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[500px] md:h-[700px] lg:h-[90vh]">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover object-top block"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BackGround;