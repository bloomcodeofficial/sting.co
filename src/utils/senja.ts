import { removeChildElements } from '@finsweet/ts-utils';

export const senja = function () {
  const getTestimonials = () => {
    // Get testimonials from Senja.io
    const testimonialsList = document.querySelector('.swiper-wrapper.is-main-slider');
    if (!testimonialsList) return;
    const { tags } = testimonialsList.dataset;

    // Get template element
    const templateElement = document.querySelector('[data-element="template"]')?.cloneNode(true);
    if (!templateElement) return;

    // Remove template items
    removeChildElements(testimonialsList);

    // Fetch data from Senja.io
    const url = `https://api.senja.io/v1/testimonials?approved=true&type=text&tags=${tags}`;

    fetch(url, {
      headers: {
        Authorization: 'Bearer SuGpRNDYiDiPq6h6KEjZ74550Aa3',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Could not access testimonials. ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Array of fetched items
        const newItems = data.testimonials;

        // Remove section if no testimonials exist
        if (newItems.length < 3) testimonialsList.closest('[data-element="section"]')?.remove();

        // Filter testimonials with less than 200 charachters of text
        const filteredItems = newItems.filter((item) => item.text.trim().length < 300);

        // Create new items and add to list
        filteredItems.forEach((item) => {
          const newItem = createItem(item, templateElement);
          testimonialsList?.appendChild(newItem);
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

    const createItem = function (testimonial, templateElement) {
      const newItem = templateElement.cloneNode(true);

      // Elements to add data to
      const mainText = newItem.querySelector('[data-element="testimonial"]');
      const fullName = newItem.querySelector('[data-element="full-name"]');
      const title = newItem.querySelector('[data-element="title"]');
      const avatar = newItem.querySelector('[data-element="avatar"]');

      // Extract testimonial data to template element
      if (mainText) mainText.textContent = testimonial.text;
      if (fullName) fullName.textContent = testimonial.endorser.name;
      if (title) title.textContent = testimonial.endorser.tagline;
      if (avatar) avatar.srcset = testimonial.endorser.avatar;

      return newItem;
    };
  };

  getTestimonials();
};
