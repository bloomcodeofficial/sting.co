import 'swiper/css';

import { Autoplay, Swiper } from 'swiper';

export const logoMarquee = function () {
  const swiperLogoMarquee = new Swiper('.swiper.is-logo-1', {
    modules: [Autoplay],
    spaceBetween: 0,
    speed: 8000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
  });
};
