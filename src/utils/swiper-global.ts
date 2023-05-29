import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Swiper } from 'swiper';

export const globalSwiper = function () {
  const checkListLength = function (list) {
    if (list.classList.contains('w-dyn-empty')) {
      console.log('Empty list!');
    } else return;
  };

  // Get amt of slides for desktop
  const swiperComponents = document.querySelectorAll('[element="swiper-component"]');
  const swipers = document.querySelectorAll('.swiper.is-main-slider');

  swiperComponents.forEach((swiperComp, i) => {
    const swiper = swiperComp.querySelector('.swiper.is-main-slider');
    const swiperList = swiper.firstChild;
    const slidersDesktop = swiperList?.dataset.slidersperview;
    const slidersGap = swiperList?.dataset.gappx;
    const section = swiperComp.closest('section');

    if (swiperList.classList.contains('w-dyn-empty')) {
      console.log('Empty list!');
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

  // ELEMENTS //
  const list = document.querySelector('.is-startup-academy-speakers');
  const cards = document.querySelectorAll('.card-team-2');

  // FUNCTIONS //
  const activateCard = function (card) {
    card.classList.add('card-team-2--active');
    card.querySelector('.card-team-2_read-more-btn').textContent = 'Close';
  };

  const deactivateCards = function () {
    cards.forEach((card) => {
      card.classList.remove('card-team-2--active');
    });
  };

  // EVENT HANDLERS //
  list?.addEventListener('click', (e) => {
    const clicked = e.target.closest('.card-team-2_read-more-btn');
    if (!clicked) return;
    const card = clicked.closest('.card-team-2');

    if (!card.classList.contains('.card-team-2--active')) {
      deactivateCards();
      activateCard(card);
      return;
    }
    if (card.classList.contains('.card-team-2--active')) {
      deactivateCards();
    }
  });
};
