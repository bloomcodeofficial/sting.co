import '/Users/niklas/Documents/sting.co/src/index.css';

export const bwAccordionAttribute = function () {
  // Add following three attributes:
  // 1. [bw-accordion-element="list"]
  // 2. [bw-accordion-element="trigger"]
  // 3. [bw-accordion-element="content"]

  // // ELEMENTS //
  const listInstances = [...document.querySelectorAll('[bw-accordion-element="list"]')];

  // // FUNCTIONS //
  const openAcc = function (acc) {
    const content = getContent(acc);
    if (!content) return;
    content.classList.add('bw-accordion-content--active');
  };

  const openAccs = function (list) {
    list.forEach((acc) => {
      if (!acc) return;
      openAcc(acc);
    });
  };

  const getContent = function (acc) {
    const content = acc.querySelector('[bw-accordion-element="content"]');
    if (!content) return;
    return content;
  };

  const closeAccs = function (list) {
    list.forEach((acc) => {
      if (!acc) return;
      getContent(acc).classList.remove('bw-accordion-content--active');
    });
  };

  const accArr = function (nodeList) {
    return [...nodeList.childNodes];
  };

  // EVENT HANDLERS //
  document.addEventListener('DOMContentLoaded', () => {
    listInstances.forEach((listInstance) => {
      const accs = accArr(listInstance);
      openAcc(accs[0]);
    });
  });

  listInstances.forEach((listInstance) => {
    const accs = accArr(listInstance);
    listInstance.addEventListener('click', (e) => {
      const trigger = e.target.closest('[bw-accordion-element="trigger"]');
      if (!trigger) return;

      const content = getContent(trigger);
      if (!content) return;
      if (!content.classList.contains('bw-accordion-content--active"')) {
        closeAccs(accs);
        openAcc(trigger);
      }
    });
  });
};
