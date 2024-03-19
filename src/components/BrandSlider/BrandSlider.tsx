import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BRANDS } from "data/brands";

// Import Swiper styles
import "swiper/css/bundle";
import { CountryContext } from "context/country/CountryContext";

const BrandSlider: React.FC = () => {
  const { state } = useContext(CountryContext);
  const brandsByCountry = BRANDS.filter((brand) =>
    brand?.country?.includes(state.country)
  );
  const brandsWithoutCountry = BRANDS.filter((brand) => !brand.country);

  const brandsUnit = brandsByCountry.length + brandsWithoutCountry.length;

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={brandsUnit}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          770: {
            slidesPerView: brandsUnit,
          },
          991: {
            slidesPerView: brandsUnit,
          },
        }}
        autoplay={{
          delay: 2000,
        }}
      >
        {brandsWithoutCountry.map((brand, i) => (
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
        {brandsByCountry.length > 0 && (
          <>
            {brandsByCountry.map((brand, i) => (
              <SwiperSlide
                key={`${i}_${brand.country}`}
                className="w-100 bg-primary"
              >
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
          </>
        )}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
