export const faq1 = function () {
  // ELEMENTS //
  const list = document.querySelector('.faq-4_list');
  if (!list) return;
  // FUNCTIONS //
  const openFaq = function (faqItem) {
    if (!faqItem) return;
    faqItem.classList.add('faq-4_item--active');
  };
  const closeFaqs = function () {
    list
      ?.querySelectorAll('.faq-4_item')
      .forEach((item) => item.classList.remove('faq-4_item--active'));
  };
  closeFaqs();
  openFaq(list?.firstElementChild);
  list?.addEventListener('click', function (e) {
    const clicked = e.target.closest('.faq-4_item');
    closeFaqs();
    openFaq(clicked);
  });

  const faqComponent = document.querySelector('[bw-element="faq-4"]');
  const category = faqComponent?.dataset.cmsfilter;
  const itemList = document.querySelectorAll('.faq-4_item');

  itemList.forEach((item) => {
    const itemCategory = item.dataset.cmsfilter;
    if (itemCategory !== category) item.remove();
  });
};
