import { CMSCore, CMSList } from '@finsweet/attributes-cmscore';
import type { CMSFilters } from 'src/types/CMSFilters';

export const jobylon2 = () => {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    async (listInstances: CMSList[]) => {
      // Get the list
      const listInstance = listInstances[0];

      // Copy the template element
      const item = listInstance.items[0];
      const itemTemplateElement = item.element;

      // Get external data
      const fetchData = await fetchJobs();

      // Clear template elements
      listInstance.clearItems();

      // Create items from template element
      const jobs = fetchData.map((job) => newItem(job, itemTemplateElement));

      // Add new items to list
      listInstance.addItems(jobs);

      window.fsAttributes.push([
        'cmsfilter',
        async (filterInstances: CMSFilters[]) => {
          // Get the instances
          const [filterInstance] = filterInstances;

          // Get the template elements
          const filterTemplateElement1 = filterInstance.form.querySelector(
            '[data-element="experience-filter"]'
          )?.parentElement;

          const filterTemplateElement2 = filterInstance.form.querySelector(
            '[data-element="job-function-filter"]'
          )?.parentElement;

          const filterTemplateElement3 = filterInstance.form.querySelector(
            '[data-element="location-filter"]'
          );

          // Get parent of template elements
          const filter1WrapperElement = filterTemplateElement1?.parentElement;
          const filter2WrapperElement = filterTemplateElement2?.parentElement;
          const filter3WrapperElement = filterTemplateElement3?.parentElement;

          // Remove the template element from each filter category
          filterTemplateElement1?.remove();
          filterTemplateElement2?.remove();
          filterTemplateElement3?.remove();

          // Collect unique categories of each category
          const newItems1 = collectCategories(fetchData, 'experience');
          const newItems2 = collectCategories(fetchData, 'function');

          // Create new filters for each category and append them in the wrapper

          // Create new filters for each category and append them in the parent wrapper
          for (const category of newItems1) {
            const newFilter = createFiler(category, filterTemplateElement1);
            if (!newFilter) continue;

            filter1WrapperElement?.append(newFilter);
          }

          for (const category of newItems2) {
            const newFilter = createFiler(category, filterTemplateElement2);
            if (!newFilter) continue;

            filter2WrapperElement?.append(newFilter);
          }

          // Sync CMSFilters instance to read the new filters data
          filterInstance.storeFiltersData();
        },
      ]);
    },
  ]);

  // Fetches the jobs from Jobylon API
  const fetchJobs = async () => {
    try {
      const response = await fetch(
        'https://feed.jobylon.com/feeds/a23d1a2b-647c-4497-b36b-1555efaba88f/?format=json'
      );
      const jobs = await response.json();

      return jobs;
    } catch (error) {
      return [];
    }
  };

  // Create new items from template element
  const newItem = (job, templateElement) => {
    const newItem = templateElement.cloneNode(true);

    // Query the internal elements of the Collection item
    const logo = newItem.querySelector('[data-element="logo"]');
    const title = newItem.querySelector('[data-element="title"]');
    const company = newItem.querySelector('[data-element="company"]');
    const location = newItem.querySelector('[data-element="location"]');
    const experience = newItem.querySelector('[data-element="level"]');
    const jobType = newItem.querySelector('[data-element="type"]');
    const jobFunction = newItem.querySelector('[data-element="job-function"]');
    const link = newItem.querySelector('[data-element="link"]');

    // Populate the internal items
    if (logo) logo.src = job.company.logo;
    if (title) title.textContent = job.title;
    if (company) company.textContent = job.company.name;
    if (location) location.textContent = job.locations[0].location.city;
    if (experience) experience.textContent = job.experience;
    if (jobType) jobType.textContent = job.employment_type;
    if (jobFunction) jobFunction.textContent = job.function;
    if (link) link.href = job.urls.ad;

    return newItem;
  };

  // Collect categories
  const collectCategories = function (jobs, category) {
    const categoryItems = new Set();

    for (const job of jobs) {
      categoryItems.add(job[category]);
    }
    return [...categoryItems];
  };

  // Creates a new checkbox filter from template and external data
  const createFiler = (category, templateElement) => {
    // Clone the template element
    const newFilter = templateElement.cloneNode(true);

    // Query the inner elements
    const label = newFilter.querySelector('span');
    const input = newFilter.querySelector('input');

    if (!label || !input) return;

    // Populate the inner elements
    label.textContent = category;
    input.value = category;

    return newFilter;
  };
};
