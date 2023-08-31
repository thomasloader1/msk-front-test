import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BRANDS } from "data/brands";

// Import Swiper styles
import "swiper/css/bundle";

const BrandSlider: React.FC = () => {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={3}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          770: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
      >
        {BRANDS.map((brand, i) => (
          <SwiperSlide key={i} className="w-100 bg-primary">
            <div className="brand-container">
              <img
                src={brand.img}
                alt="img not found"
                width={brand.width}
                height="200"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
