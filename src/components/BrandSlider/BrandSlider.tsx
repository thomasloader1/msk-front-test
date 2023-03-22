import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import { DEMO_BRANDS } from 'data/brands';
import bts from "styles/bts.module.css"
console.log({className: bts})

// Import Swiper styles
import 'swiper/css/bundle'

const BrandSlider: React.FC = () => {

    return (
        <div className={`brand-area ${bts['pt-90']} ${bts['pb-120']}`}>
            <div className={bts.container}>
                <div className={bts.row}>
                    <div className={bts["col-xl-12"]}>
                        <div className="brand-wrapper text-center">
                            <div className="brand-wrapper text-center">
                                <div className="swiper-container brand-active">
                                    <div className="swiper-wrapper">
                                        <Swiper
                                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                            spaceBetween={30}
                                            slidesPerView={2}
                                            loop={true}
                                            breakpoints={{
                                                320: {
                                                    slidesPerView: 1,
                                                },
                                                480: {
                                                    slidesPerView: 2,
                                                },
                                                640: {
                                                    slidesPerView: 3,
                                                },
                                                991: {
                                                    slidesPerView: 4,
                                                },
                                                1200: {
                                                    slidesPerView: 5,
                                                },
                                                1400: {
                                                    slidesPerView: 6,
                                                }
                                            }}
                                            autoplay={{
                                                delay: 2000,
                                                disableOnInteraction: true
                                            }}
                                        >
                                            {DEMO_BRANDS.map( (brandImg, i) => (
                                                <SwiperSlide key={i}>
                                                <div className="singel-brand">
                                                    <img src={brandImg} alt="img not found" />
                                                </div>
                                            </SwiperSlide>
                                            ))}

                                            
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandSlider;