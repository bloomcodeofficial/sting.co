import { Navigation, Swiper } from 'swiper';

export const speakers1 = function () {
  const swiperSpeakers1 = new Swiper('.swiper.is-team-1', {
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
  // // EVENT HANDLERS //
  // list[0].addEventListener('mouseover', function (e) {
  //   const hovered = e.target.closest('.card-team-2');
  //   if (!hovered) return;

  //   deactivateCards();
  //   activateCard(hovered);
  // });

  // list[0].addEventListener('mouseout', function () {
  //   deactivateCards();
  // });
};
