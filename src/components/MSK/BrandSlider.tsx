"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BRANDS } from "@/data/MSK/brands";

// Import Swiper styles
import "swiper/css/bundle";
import NcImage from "../NcImage/NcImage";
import Image from "next/image";

const BrandSlider: React.FC = () => {
  return (
    <div className="swiper-container">
      <Swiper
        pagination
        a11y={{ enabled: true }}
        slidesPerView={3}
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
              <Image src={brand.img} alt="img not found" width={brand.width} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
