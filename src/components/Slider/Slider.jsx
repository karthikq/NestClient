/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slider.styles.scss";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { EffectCreative } from "swiper";
import "swiper/css/effect-creative";

const Slider = ({ images }) => {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, EffectCreative]}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        className="myswiper">
        {images &&
          images?.map((item) => (
            <SwiperSlide>
              <div className="image-wrapper">
                <img className="post-image" src={item.url} alt="err" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};
export default Slider;
