import 'swiper/css';

import { Autoplay, Swiper } from 'swiper';

export const senja = function () {
  const swiper1 = new Swiper('.swiper.is-testimonials-1', {
    modules: [Autoplay],
    speed: 500,
    loop: true,
    // centeredSlides: true,
    grabCursor: true,
    slidesPerView: 3,
    spaceBetween: 32,
    autoplay: {
      delay: 4000,
      pauseOnMouseEnter: true,
      disableOnInteraction: true,
    },
  });

  const testimonialsList = document.querySelector('.swiper-wrapper.is-testimonials-1');
  fetch('https://api.senja.io/v1/testimonials?approved=true&type=text', {
    headers: {
      Authorization: 'Bearer SuGpRNDYiDiPq6h6KEjZ74550Aa3',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const testimonialsArr = data.testimonials.filter(
        (testimonial) =>
          testimonial.text.trim().length < 300 &&
          testimonial.text.trim().length > 100 &&
          testimonial.endorser.avatar
      );
      testimonialsArr.forEach((testimonial) => {
        testimonialsList?.insertAdjacentHTML(
          'afterbegin',
          `
          <div class="swiper-slide is-testimonials-1"><div class="card-testimonial-1"><img src="https://assets-global.website-files.com/641d6ce948627926461a831a/64341264197ec78ec461d143_logoipsum-297.svg" loading="lazy" class="card-testimonial-1_logo"><p class="card-testimonial-1_text">${testimonial.text}</p><div class="person-1"><img src="${testimonial.endorser.avatar}" loading="lazy" class="person-1_picture"><div class="person-1_content"><div class="person-1_name">${testimonial.endorser.name}</div><div class="person-1_role">${testimonial.endorser.tagline}</div></div></div></div></div>
        `
        );
      });
    })
    .catch((error) => console.error(error));
};
