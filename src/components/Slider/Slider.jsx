/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slider.styles.scss";
import { Navigation, Pagination } from "swiper";

import { EffectCreative } from "swiper";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import LaunchIcon from "@mui/icons-material/Launch";
import { useState } from "react";
import Player from "../Video/Player";

const Slider = ({ images, videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, EffectCreative, Navigation]}
        effect={"creative"}
        navigation={images.length >= 1}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        className="myswiper"
      >
        {images &&
          images?.map((item, index) => (
            <SwiperSlide key={index}>
              <>
                <div className="image-wrapper">
                  <img
                    className="post-image"
                    onClick={() => setIsOpen(true)}
                    src={item.url}
                    alt="err"
                  />
                  <LaunchIcon
                    onClick={() => setIsOpen(true)}
                    titleAccess="Open Image"
                    className="lightbox-link-icon"
                  />
                </div>
              </>
            </SwiperSlide>
          ))}
        {videoUrl && (
          <SwiperSlide>
            {videoUrl && (
              <div className="video-player">
                <Player url={videoUrl} />
              </div>
            )}
          </SwiperSlide>
        )}
      </Swiper>
      {isOpen && (
        <Lightbox
          imageLoadErrorMessage="Loading..."
          imageTitle={images[photoIndex].name}
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};
export default Slider;
