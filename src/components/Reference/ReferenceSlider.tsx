"use client"
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
//modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
// Import Swiper styles
import "swiper/css/bundle";
import ReferenceCard from "@/components/Reference/RefereceCard";


interface ReferenceSliderProps{
    references: any[];
}

const ReferenceSlider: FC<ReferenceSliderProps> = ({references}) => {

    return (

            <div className="swiper-container h-full lg:hidden">
                <Swiper

                    slidesPerView={1}
                    spaceBetween= '5%'
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                    className="h-[325px] sm:h-[200px] max-h-[350px]"
                >
                    {references.map((reference, i) => (
                        <SwiperSlide key={i} className="w-100 bg-primary mt-8">
                            <ReferenceCard key={i} reference={reference} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
    );
};

export default ReferenceSlider;
