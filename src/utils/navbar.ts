export const navbar = () => {
  //// ELEMENTS ////
  const navbar = document.querySelector('.globalnav_component');
  const links = document.querySelectorAll('.globalnav_link');
  const submenus = document.querySelectorAll('.globalnav_submenu');
  const menuBtn = document.querySelector('.globalnav_hamburger');
  const mobNav = document.querySelector('.globalnav_mob-menu');
  const mobNavItem = document.querySelectorAll('.globalnav_mob-nav-item');
  const curtain = document.querySelector('.globalnav_curtain');
  const breadcrumbLinks = document.querySelectorAll('.globalnav-breadcrumbs_link-item');

  //// FUNCTIONS ////

  // Remove "/" from the last breadcrumb item
  const removeSlash = function (items) {
    const lastEl = breadcrumbLinks.item(breadcrumbLinks.length - 1);
    const slashSymbol = lastEl.querySelector('[data-element="breadcrumb-slash"]');

    slashSymbol.style.display = 'none';
  };

  // Close all submenus to give space for clicked submenu link
  const closeSubmenus = function () {
    submenus.forEach((submenu) => submenu.classList.remove('globalnav_submenu--active'));
    links.forEach((link) => link.classList.remove('globalnav_link--active'));
    curtain?.classList.remove('globalnav_curtain--active');
  };

  // Open specific submenu
  const openSubmenu = function (link, submenu) {
    link.classList.add('globalnav_link--active');
    submenu.classList.add('globalnav_submenu--active');
    curtain?.classList.add('globalnav_curtain--active');
  };

  // Close all mob items to give space for clicked subnav link
  const closeMobItems = function () {
    mobNavItem.forEach((item) => item.classList.remove('globalnav_mob-nav-item--active'));
  };

  // Open specific mob item
  const openMobItem = function (item) {
    item.classList.add('globalnav_mob-nav-item--active');
  };

  // Open mobile menu
  const openMobMenu = function () {
    mobNav.classList.add('globalnav_mob-menu--active');
    menuBtn.classList.add('globalnav_hamburger--active');
  };

  // Close mobile menu
  const closeMobmenu = function () {
    mobNav?.classList.remove('globalnav_mob-menu--active');
    menuBtn.classList.remove('globalnav_hamburger--active');
  };

  //// EVENT LISTENERS ////
  navbar.addEventListener('click', function (e) {
    const clicked = e.target.closest('.globalnav_link');

    // If click is empty or the link doesn't have a submenu - return the function
    if (!clicked || !clicked.dataset.submenu) return;

    const submenu = document.querySelector(`.globalnav_submenu--${clicked.dataset.submenu}`);

    // If submenu isn't active --> close all submenus and open this one
    if (!clicked.classList.contains('globalnav_link--active')) {
      closeSubmenus();
      openSubmenu(clicked, submenu);
      // If submenu is active --> close all submenus
    } else if (clicked.classList.contains('globalnav_link--active')) {
      closeSubmenus();
    }
  });

  // Close active submenu if user clicks outside nav component
  document?.addEventListener('click', function (e) {
    const clicked = e.target.closest('.globalnav_component');
    if (!clicked) closeSubmenus();
  });

  menuBtn?.addEventListener('click', () => {
    if (mobNav?.classList.contains('globalnav_mob-menu--active')) {
      closeMobmenu();
    } else openMobMenu();
  });

  window.addEventListener('resize', function (e) {
    if (window.innerWidth >= 992) {
      closeMobItems();
      closeMobmenu();
    }
  });

  mobNav?.addEventListener('click', function (e) {
    const clicked = e.target.closest('.globalnav_mob-expand');
    if (!clicked || !clicked.dataset.subnav) return;
    const item = document.querySelector(`[subnav="${clicked.dataset.subnav}"]`);

    if (!item?.classList.contains('globalnav_mob-nav-item--active')) {
      closeMobItems();
      openMobItem(item);
    } else closeMobItems();
  });

  document.addEventListener('DOMContentLoaded', removeSlash.bind(breadcrumbLinks));
};
