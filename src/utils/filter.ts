export const filter = function () {
  // ELEMENTS //
  const filterComp = document.querySelector('.filter_component');
  const filterTrigger = document.querySelector('.filter_trigger-link');

  // FUNCTIONS //

  // Show filter component
  const showFilter = function () {
    filterComp?.classList.add('filter_component--active');
  };

  // Hide filter component
  const hideFilter = function () {
    filterComp?.classList.remove('filter_component--active');
  };

  // EVENT HANDLERS //
  filterTrigger?.addEventListener('click', () => {
    filterComp?.classList.contains('filter_component--active') ? hideFilter() : showFilter();
  });
};
