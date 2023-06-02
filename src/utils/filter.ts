export const filter = function () {
  // ELEMENTS //
  const filterInstances = document.querySelectorAll('.filter_component');

  // FUNCTIONS //

  // Show filter component
  const showFilter = function (filterInstance) {
    filterInstance?.classList.add('filter_component--active');
  };

  // Hide filter component
  const hideFilter = function (filterInstance) {
    filterInstance.classList.remove('filter_component--active');
  };

  // EVENT HANDLERS //

  filterInstances.forEach((filterInstance) => {
    // Attaches click event on each filter component
    filterInstance.addEventListener('click', (e) => {
      const clicked = e.target.closest('.filter_trigger-link');
      if (!clicked) return;

      filterInstance.classList.contains('filter_component--active')
        ? hideFilter(filterInstance)
        : showFilter(filterInstance);
    });
  });
};
