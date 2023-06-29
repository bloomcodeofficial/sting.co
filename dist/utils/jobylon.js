"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/jobylon.ts
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    async (listInstances) => {
      const listInstance = listInstances[0];
      if (!listInstance)
        return;
      const item = listInstance.items[0];
      const itemTemplateElement = item.element;
      const fetchData = await fetchJobs();
      listInstance.clearItems();
      const jobs = fetchData.map((job) => newItem(job, itemTemplateElement));
      if (!jobs)
        return;
      listInstance.addItems(jobs);
      window.fsAttributes.push([
        "cmsfilter",
        async (filterInstances) => {
          const [filterInstance] = filterInstances;
          const filterTemplateElement1 = filterInstance.form.querySelector(
            '[data-element="experience-filter"]'
          )?.parentElement;
          const filterTemplateElement2 = filterInstance.form.querySelector(
            '[data-element="job-function-filter"]'
          )?.parentElement;
          const filterTemplateElement3 = filterInstance.form.querySelector(
            '[data-element="location-filter"]'
          ).parentElement;
          const filter1WrapperElement = filterTemplateElement1?.parentElement;
          const filter2WrapperElement = filterTemplateElement2?.parentElement;
          const filter3WrapperElement = filterTemplateElement3?.parentElement;
          filterTemplateElement1?.remove();
          filterTemplateElement2?.remove();
          filterTemplateElement3?.remove();
          const newItems1 = collectCategories(fetchData, "experience");
          const newItems2 = collectCategories(fetchData, "function");
          const newItems3 = collectLocations(fetchData);
          for (const category of newItems1) {
            const newFilter = createFiler(category, filterTemplateElement1);
            if (!newFilter)
              continue;
            filter1WrapperElement?.append(newFilter);
          }
          for (const category of newItems2) {
            const newFilter = createFiler(category, filterTemplateElement2);
            if (!newFilter)
              continue;
            filter2WrapperElement?.append(newFilter);
          }
          for (const category of newItems3) {
            const newFilter = createFiler(category, filterTemplateElement3);
            if (!newFilter)
              continue;
            filter3WrapperElement?.append(newFilter);
          }
          filterInstance.storeFiltersData();
        }
      ]);
    }
  ]);
  var fetchJobs = async () => {
    try {
      const response = await fetch(
        "https://feed.jobylon.com/feeds/a23d1a2b-647c-4497-b36b-1555efaba88f/?format=json"
      );
      const jobs = await response.json();
      return jobs;
    } catch (error) {
      return [];
    }
  };
  var newItem = (job, templateElement) => {
    const newItem2 = templateElement.cloneNode(true);
    const logo = newItem2.querySelector('[data-element="logo"]');
    const title = newItem2.querySelector('[data-element="title"]');
    const company = newItem2.querySelector('[data-element="company"]');
    const location2 = newItem2.querySelector('[data-element="location"]');
    const experience = newItem2.querySelector('[data-element="level"]');
    const jobType = newItem2.querySelector('[data-element="type"]');
    const jobFunction = newItem2.querySelector('[data-element="job-function"]');
    const link = newItem2.querySelector('[data-element="link"]');
    const addLocations = () => {
      const jobLocations = collectJobLocations(job);
      const templ = location2.parentElement;
      const list = templ.parentElement;
      templ.remove();
      jobLocations.forEach((location3) => {
        const newLocation = templ.cloneNode(true);
        const locationTxt = newLocation.querySelector('[data-element="location"]');
        if (locationTxt)
          locationTxt.textContent = location3;
        list.append(newLocation);
      });
    };
    addLocations();
    if (logo)
      logo.src = job.company.logo;
    if (title)
      title.textContent = job.title;
    if (company)
      company.textContent = job.company.name;
    if (experience)
      experience.textContent = job.experience;
    if (jobType)
      jobType.textContent = job.employment_type;
    if (jobFunction)
      jobFunction.textContent = job.function;
    if (link)
      link.href = job.urls.ad;
    return newItem2;
  };
  var collectCategories = function(jobs, category) {
    const categoryItems = /* @__PURE__ */ new Set();
    for (const job of jobs) {
      categoryItems.add(job[category]);
    }
    return [...categoryItems];
  };
  var collectLocations = function(jobs) {
    const locationItems = /* @__PURE__ */ new Set();
    jobs.forEach((job) => {
      job.locations.forEach((jobLocations) => {
        if (jobLocations.location.city) {
          locationItems.add(jobLocations.location.city);
          return;
        }
        if (!jobLocations.location.city && jobLocations.location.text) {
          locationItems.add(jobLocations.location.text);
          return;
        }
      });
    });
    return [...locationItems];
  };
  var collectJobLocations = function(job) {
    const string = /* @__PURE__ */ new Set();
    job.locations.forEach((jobLocations) => {
      if (jobLocations.location.city) {
        string.add(jobLocations.location.city);
      } else if (jobLocations.location.text) {
        string.add(jobLocations.location.text);
      }
    });
    return [...string];
  };
  var createFiler = (category, templateElement) => {
    const newFilter = templateElement.cloneNode(true);
    const label = newFilter.querySelector("span");
    const input = newFilter.querySelector("input");
    if (!label || !input)
      return;
    label.textContent = category;
    input.value = category;
    return newFilter;
  };
})();
//# sourceMappingURL=jobylon.js.map
