export const faq1 = function () {
  // ELEMENTS //
  const list = document.querySelector('.faq-2_list');

  if (!list) return;
  // FUNCTIONS //
  const openFaq = function (faqItem) {
    if (!faqItem) return;
    faqItem.classList.add('faq-2_item--active');
  };

  const closeFaqs = function () {
    list
      ?.querySelectorAll('.faq-2_item')
      .forEach((item) => item.classList.remove('faq-2_item--active'));
  };

  closeFaqs();
  openFaq(list?.firstElementChild);

  list?.addEventListener('click', function (e) {
    const clicked = e.target.closest('.faq-2_item');

    closeFaqs();
    openFaq(clicked);
  });
};
