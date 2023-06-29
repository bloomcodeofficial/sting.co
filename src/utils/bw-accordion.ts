// import '/Users/niklas/Documents/sting.co/src/index.css';

// export const bwAccordionAttribute = function () {
//   // Add following three attributes:
//   // 1. [bw-accordion-element="list"]
//   // 2. [bw-accordion-element="trigger"]
//   // 3. [bw-accordion-element="content"]

//   window.fsAttributes = window.fsAttributes || [];
//   window.fsAttributes.push([
//     'cmsload',
//     (listInstances) => {
//       const [...bwAccs] = document.querySelectorAll('[bw-accordion-element="list"]');
//       const staticLists = [];

//       bwAccs.forEach((item) => {
//         const items = [];

//         item.childNodes.forEach((element) => {
//           const obj = { element: element };
//           items.push(obj);
//         });

//         const listInstance = {
//           list: item,
//           items: items,
//         };

//         staticLists.push(listInstance);
//       });

//       const allLists = listInstances.concat(staticLists);
//       if (allLists.length === 0) return;

//       allLists.forEach((listInstance) => {
//         initAccordions(listInstance);
//       });

//       // listInstance.on('renderitems', (renderedItems) => {
//       //   addAccordions(listInstance.items);
//       // });
//     },
//   ]);

//   // // FUNCTIONS //
//   const openAcc = function (item) {
//     // Get content element and add active class to show accordion content
//     const chevron = item.querySelector('[bw-accordion-element="chevron"]');
//     const content = item.querySelector('[bw-accordion-element="content"]');
//     if (!content) return;
//     content.classList.add('bw-accordion-content--active');
//   };

//   const closeAcc = function (item) {
//     // Get content element and add active class to show accordion content
//     const content = item.querySelector('[bw-accordion-element="content"]');
//     if (!content) return;
//     content.classList.remove('bw-accordion-content--active');
//   };

//   const closeAccs = function (items) {
//     items.forEach((item) => {
//       closeAcc(item.element);
//     });
//   };

//   const initAccordions = function (listInstance) {
//     const { items } = listInstance;
//     const { list } = listInstance;

//     // Close all accordions on page load
//     closeAccs(listInstance.items);

//     // Open first accordion
//     if (list.getAttribute('bw-accordion-set')) openAcc(items[0].element);

//     // Open accordion on click
//     list.addEventListener('click', function (e) {
//       const item = e.target.closest('[bw-accordion-element="trigger"]');
//       if (!item) return;

//       // Close any other open accordion
//       closeAccs(listInstance.items);

//       // Open clicked accordion
//       openAcc(item);
//     });
//   };
// };
