import '/Users/niklas/Documents/sting.co/src/index.css';

export const bwAccordionAttribute = function () {
  // Add following three attributes:
  // 1. [bw-accordion-element="list"]
  // 2. [bw-accordion-element="trigger"]
  // 3. [bw-accordion-element="content"]

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    (listInstances) => {
      console.log('cmsload Successfully loaded!');

      // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
      const [listInstance] = listInstances;
      console.log(listInstance);

      // The `renderitems` event runs whenever the list renders items after switching pages.
      listInstance.on('renderitems', (renderedItems) => {
        console.log(renderedItems);
      });

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

      listInstances.forEach((listInstance) => {
        // const accs = accArr(listInstance);

        // Close all accs on page load
        closeAccs(listInstance.items);

        const openFirstAcc = listInstance.getAttribute('bw-accordion-set');
        if (openFirstAcc) openAcc(listInstance.items[0]);

        listInstance.addEventListener('click', (e) => {
          const trigger = e.target.closest('[bw-accordion-element="trigger"]');
          if (!trigger) return;

          const content = getContent(trigger);
          if (!content) return;
          if (!content.classList.contains('bw-accordion-content--active')) {
            closeAccs(listInstance);
            openAcc(trigger);
          } else if (content.classList.contains('bw-accordion-content--active')) {
            closeAccs(listInstance);
          }
        });
      });
    },
  ]);

  // // ELEMENTS //
  const listInstances = [...document.querySelectorAll('[bw-accordion-element="list"]')];

  // EVENT HANDLERS //
};
