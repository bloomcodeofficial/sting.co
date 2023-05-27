import { CMSCore, CMSList } from '@finsweet/attributes-cmscore';
import { getCollectionElements } from '@finsweet/ts-utils';

export const library = function () {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmscombine',
    (combineInstances) => {
      // Get the list where two items will be added to
      const featuredListDiv = document.querySelector('[data-element="featured-list"]');

      // Get the combined list of featrued posts
      const [featuredList, fullList] = combineInstances;
      const featuredItems = featuredList.items;

      // Go through the list and extract the two posts that was most recently updated
      const newFeaturedItems = [];
      featuredItems.forEach((item) => {
        const newItem = {
          updatedOn: item.element.dataset.updatedon,
          element: item.element,
        };

        newFeaturedItems.push(newItem);
      });

      // Sort list of featured items by updated date
      const customSort = (a, b) => {
        const dateA = new Date(a.updatedOn);
        const dateB = new Date(b.updatedOn);
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      };

      newFeaturedItems.sort(customSort);

      // Add the first two items to featured list (div)
      featuredListDiv?.append(newFeaturedItems[0].element);
      featuredListDiv?.append(newFeaturedItems[1].element);

      fullList.items.sort((a, b) => {
        console.log(a.element.dataset.publishon);
        const dateA = new Date(a.element.dataset.publishon);
        const dateB = new Date(b.element.dataset.publishon);

        console.log(dateA.getTime());

        if (dateA.getTime() < dateB.getTime()) return 1;
        if (dateA.getTime() > dateB.getTime()) return -1;
        return 0;
      });
    },
  ]);
};
