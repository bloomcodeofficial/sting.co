import { Navigation, Swiper } from 'swiper';

export const speakers1 = function () {
  const swiperSpeakers1 = new Swiper('.swiper.is-speakers-1', {
    modules: [Navigation],
    slidesPerView: 3,
    spaceBetween: 32,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
  });

  // ELEMENTS //
  const list = document.querySelectorAll('.is-speakers-1');
  const cards = document.querySelectorAll('.card-team-2');

  // FUNCTIONS //
  const activateCard = function (card) {
    card.classList.add('card-team-2--active');
  };

  const deactivateCards = function () {
    cards.forEach((card) => card.classList.remove('card-team-2--active'));
  };

  // EVENT HANDLERS //
  list[0].addEventListener('mouseover', function (e) {
    const hovered = e.target.closest('.card-team-2');
    if (!hovered) return;

    deactivateCards();
    activateCard(hovered);
  });

  list[0].addEventListener('mouseout', function () {
    deactivateCards();
  });
};
