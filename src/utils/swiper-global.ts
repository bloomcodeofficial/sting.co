import { Navigation, Swiper } from 'swiper';

export const globalSwiper = function () {
  // Get amt of slides for desktop
  const slidersDesktop = document.querySelector('.swiper-wrapper')?.dataset.slidersperview;
  const swipers = document.querySelectorAll('.swiper.is-main-slider');

  swipers.forEach((swiper) => {
    const mainSwiperSlider = new Swiper(swiper, {
      modules: [Navigation],
      slidesPerView: 3,
      spaceBetween: 32,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.2,
          centeredSlides: true,
          spaceBetween: 24,
          initialSlide: 1,
          loop: true,
        },
        // when window width is >= 480px
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        // when window width is >= 992px
        992: {
          slidesPerView: slidersDesktop ? slidersDesktop : 3,
          spaceBetween: 32,
        },
      },
      navigation: {
        nextEl: swiper.closest('.swiper-next'),
        prevEl: swiper.closest('.swiper-prev'),
      },
    });
  });
  // const mainSwiperSlider = new Swiper('.swiper.is-main-slider', {
  //   modules: [Navigation],
  //   slidesPerView: 3,
  //   spaceBetween: 32,
  //   breakpoints: {
  //     // when window width is >= 320px
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 24,
  //     },
  //     // when window width is >= 480px
  //     768: {
  //       slidesPerView: 2,
  //       spaceBetween: 32,
  //     },
  //     // when window width is >= 992px
  //     992: {
  //       slidesPerView: slidersDesktop ? slidersDesktop : 3,
  //       spaceBetween: 32,
  //     },
  //   },
  //   navigation: {
  //     nextEl: '.swiper-next',
  //     prevEl: '.swiper-prev',
  //   },
  // });

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
