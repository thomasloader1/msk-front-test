import { FC, useEffect, useState } from "react";
import imgAdsDef from "/images/home/illustration_1.png";
import axios from "axios";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "Services/api";
import { BannerImg } from "models";

export interface SectionAdsProps {
  className?: string;
  imgAds?: string;
  btnOnClick?: () => void;
}

const defaultImgs = [
  {
    imagen_desktop: { link: "/images/banners/promo-home_desktop.png" },
    imagen_mobile: { link: "/images/banners/promo-home_mobile.png" },
  },
];
const SectionAds: FC<SectionAdsProps> = ({
  className = "",
  imgAds = imgAdsDef,
  btnOnClick,
}) => {
  const [bannerImgs, setBannerImgs] = useState<BannerImg[]>(defaultImgs);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getWpImages("banners_home");
        setBannerImgs(response);
      } catch (err) {
        console.error({ err });
      }
    };

    fetchData();
  }, []);
  return (
    <div
      onClick={() => (btnOnClick ? btnOnClick() : "")}
      className="cursor-pointer mb-[96px]"
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{ enabled: true, clickable: true }}
      >
        {bannerImgs.map((img, index) => (
          <SwiperSlide key={`img_${index}`}>
            <a href={img.url?.href ? img.url?.href : "#"}>
              <img
                src={img.imagen_desktop.link}
                alt="hero"
                className="store-banner-desktop hidden md:block w-full"
              />
              <img
                src={img.imagen_mobile.link}
                alt="hero"
                className="store-banner-desktop block md:hidden w-full"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionAds;
