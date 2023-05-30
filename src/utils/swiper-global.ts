import 'swiper/css/bundle';

import {
  Autoplay,
  Grid,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Swiper,
} from 'swiper';

export const globalSwiper = function () {
  // Elements //
  const swiperComponents = document.querySelectorAll('[element="swiper-component"]');

  swiperComponents.forEach((swiperComp, i) => {
    const swiper = swiperComp.querySelector('.swiper.is-main-slider');
    const swiperList = swiper.firstChild;
    const slidersDesktop = swiperList?.dataset.slidersperview;
    const slidersGap = swiperList?.dataset.gappx;
    const section = swiperComp.closest('section');

    // Remove swiper section if list is empty
    if (swiperList.classList.contains('w-dyn-empty')) {
      section?.remove();
      return;
    }

    section.style.overflow = 'hidden';
    swiper?.classList.add('swiper--' + i);

    const mainSwiperSlider = new Swiper(`.swiper.is-main-slider.swiper--` + i, {
      modules: [Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, Autoplay],
      speed: 1000,
      // effect: 'fade',
      spaceBetween: 32,
      // slidesPerView: 1,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      watchOverflow: true,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.1,
          spaceBetween: 24,
        },
        // when window width is >= 480px
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        // when window width is >= 992px
        992: {
          slidesPerView: slidersDesktop ? slidersDesktop : 3,
          spaceBetween: +slidersGap ? +slidersGap : 32,
        },
      },
      autoplay: {
        disableOnInteraction: true,
        delay: 4000,
      },
      navigation: {
        nextEl: swiperComp.querySelector('.swiper-next'),
        prevEl: swiperComp.querySelector('.swiper-prev'),
      },
      pagination: {
        el: swiperComp.querySelector('.swiper-bullet-wrapper'),
        bulletActiveClass: 'is-active',
        bulletClass: 'swiper-bullet',
        bulletElement: 'button',
        clickable: true,
      },
      scrollbar: {
        el: swiperComp.querySelector('.swiper-drag-wrapper'),
        draggable: true,
        dragClass: 'swiper-drag',
        snapOnRelease: true,
      },
    });

    if (
      mainSwiperSlider.slides.length < slidersDesktop ||
      (mainSwiperSlider.slides.length < 3 && window.innerWidth >= 480)
    ) {
      swiperComp
        .querySelector('.main-slider_button-wrapper')
        ?.classList.add('main-slider_button-wrapper--inactive');
    }
  });
};
