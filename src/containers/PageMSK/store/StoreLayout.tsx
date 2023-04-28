import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import Heading2 from "components/Heading/Heading2";
import CourseUpdate from "./Slides/CourseUpdate";
import React, { FC } from "react";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
export interface LayoutPageProps {
  className?: string;
  heading: string;
  headingEmoji?: string;
  subHeading?: string;
  children: React.ReactNode;
}

const StoreLayout: FC<LayoutPageProps> = ({ className = "", children }) => {
  return (
    <div
      className={`nc-LayoutPage relative ${className}`}
      data-nc-id="LayoutPage"
    >
      <div className="container-fluid relative">
        {/* HEADER */}
        <header className="w-full">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            pagination={{ enabled: true, clickable: true }}
          >
            <SwiperSlide>
              <img
                src="/src/images/banners/tienda_desktop.jpg"
                alt="hero"
                className="store-banner-desktop hidden md:block w-full"
              />
              <img
                src="/src/images/banners/tienda_mobile.jpg"
                alt="hero"
                className="store-banner-desktop block md:hidden w-full"
              />
            </SwiperSlide>
          </Swiper>
        </header>

        {/* CONTENT */}
        <div className="p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
