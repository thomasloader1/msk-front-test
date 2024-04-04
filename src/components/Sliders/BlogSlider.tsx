import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css/bundle";
import Card2 from "components/Card2/Card2";
import { FetchPostType } from "data/types";

interface BlogSliderProps{
    posts: FetchPostType[];
}

const BlogSlider: FC<BlogSliderProps> = ({ posts }) => {

  return (
    <div className="swiper-container md:hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1.3}
        spaceBetween= '5%'
        className="h-[500px]"
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          480: {
            slidesPerView: 2,
          }
        }}
      >
        {posts.map((post, i) => (
          <SwiperSlide key={i} className="w-100 bg-primary">
            <Card2 kind="blog" post={post} className="h-[500px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSlider;
