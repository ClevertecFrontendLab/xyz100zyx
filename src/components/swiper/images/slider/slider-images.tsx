import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Thumbs, FreeMode } from 'swiper';
import SwiperClass from 'swiper/types/swiper-class';
import unbookImg from '../../../../assets/unbook-img.jpg';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './slider-images.scss';

interface IProps {
  images: Array<{url: string}>;
}

export const SliderImages: FC<IProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      <Swiper
        loop={true}
        data-test-id='slide-big'
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        pagination={{clickable: true}}
        className='mySwiper2'
      >
        {images && images?.length < 1 && (
          <SwiperSlide>
            <img src={unbookImg} alt='big preview' />
          </SwiperSlide>
        )}
        {images?.map((img) => (
          <SwiperSlide key={img.url}>
            <img src={`https://strapi.cleverland.by${img.url}`} alt='big preview'/>
          </SwiperSlide>
        ))}
      </Swiper>
      {images && images?.length > 1 && (
        <Swiper
          loop={true}
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          slideToClickedSlide={true}
          modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
          scrollbar={{ draggable: true, }}
          className='mySwiper'
        >
          {images && images?.map((img) => (
            <SwiperSlide data-test-id='slide-mini' key={img.url}>
              <img src={`https://strapi.cleverland.by${img.url}`} alt='big preview'/>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
