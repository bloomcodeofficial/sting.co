import type { CMSFilters } from 'src/types/CMSFilters';
import type { CMSList } from 'src/types/CMSList';

import type { Job } from './types';

export const jobylon = function () {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsfilter',
    async (filtersInstances: CMSFilters[]) => {
      // Get the list instance
      // Get the filters instance

      const [filtersInstance] = filtersInstances;
      const { listInstance } = filtersInstance;

      // JOBS LIST //
      // Save a copy of the template element
      const [item] = listInstance.items;
      const itemTemplateElement = item.element;

      // Fetch external data
      const jobs = await fetchJobs3();

      // Remove the placeholder items
      listInstance.clearItems();

      // Create the items from the external data
      const newItems = jobs.map((job) => newItem(job, itemTemplateElement));

      // Feed the new items into the CMSList
      await listInstance.addItems(newItems);

      // JOBS FILTERS/
      // Get the checkbox template element
      const filterExperienceTemplateElement = filtersInstance.form.querySelector<HTMLLabelElement>(
        '[data-element="experience-filter"]'
      );
      if (!filterExperienceTemplateElement) return;

      // Get the parent element of the radios
      const filtersWrapperElement = filterExperienceTemplateElement.parentElement;
      if (!filtersWrapperElement) return;

      // Remove the template element
      filterExperienceTemplateElement.remove();

      // Collect all the categories of the jobs
      const experiences = collectCategories(jobs);

      // Create new filters for each category and append them in the parent wrapper
      for (const category of experiences) {
        const newFilter = createFiler(category, filterExperienceTemplateElement);
        if (!newFilter) continue;

        filtersWrapperElement.append(newFilter);
      }

      // Sync CMSFilters instance to read the new filters data
      filtersInstance.storeFiltersData();
    },
  ]);

  // Fetches the jobs from Jobylon API
  const fetchJobs3 = async (): Promise<Job[]> => {
    try {
      const response = await fetch(
        'https://feed.jobylon.com/feeds/a23d1a2b-647c-4497-b36b-1555efaba88f/?format=json'
      );
      const jobs: Job[] = await response.json();

      return jobs;
    } catch (error) {
      return [];
    }
  };

  /**
   * Creates a new Collection item from the template + the external data.
   * @param job
   * @param templateElement
   */

  const newItem = (job: Job, templateElement: HTMLDivElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true) as HTMLDivElement;

    // Query the internal elements of the Collection item
    const logo = newItem.querySelector<HTMLImageElement>('[data-element="logo"]');
    const title = newItem.querySelector<HTMLHeadingElement>('[data-element="title"]');
    const company = newItem.querySelector<HTMLParagraphElement>('[data-element="company"]');
    const location = newItem.querySelector<HTMLParagraphElement>('[data-element="location"]');
    const experience = newItem.querySelector<HTMLParagraphElement>('[data-element="level"]');
    const jobType = newItem.querySelector<HTMLParagraphElement>('[data-element="type"]');
    const jobFunction = newItem.querySelector<HTMLParagraphElement>('[data-element="function"]');

    // Populate the internal items
    if (logo) logo.src = job.company.logo;
    if (title) title.textContent = job.title;
    if (company) company.textContent = job.company.name;
    if (location) location.textContent = job.locations[0].location.city;
    if (experience) experience.textContent = job.experience;
    if (jobType) jobType.textContent = job.employment_type;
    if (jobFunction) jobFunction.textContent = job.function;

    return newItem;
  };

  // Collects unique records of job functions in each job
  const collectCategories = (jobs: Job[]) => {
    const experiences: Set<Job['experience']> = new Set();

    for (const { experience } of jobs) {
      experiences.add(experience);
    }

    return [...experiences];
  };

  // Creates a new checkbox filter from template and external data
  const createFiler = (category: Job['experience'], templateElement: HTMLLabelElement) => {
    // Clone the template element
    const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;

    // Query the inner elements
    const label = newFilter.querySelector('span');
    const input = newFilter.querySelector('input');

    if (!label || !input) return;

    // Populate the inner elements
    label.textContent = category;
    input.value = category;
    input.id = `checkbox-${category}`;

    return newFilter;
  };
};
