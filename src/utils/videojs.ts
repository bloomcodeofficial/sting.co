export const videoJS = function () {
  const videoCards = document.querySelectorAll('.card-1');

  document.addEventListener('DOMContentLoaded', () => {
    videoCards.forEach((card) => {
      const newSource = card.querySelector('.bloomweb-video-src')?.textContent;
      if (!newSource) return;
      const video = card.querySelector('#my-video');
      const source = video.getElementsByTagName('source')[0];
      source.setAttribute('src', newSource);
      video.load();
      card.querySelector('.bloomweb-video-src')?.remove();
    });
  });
};
