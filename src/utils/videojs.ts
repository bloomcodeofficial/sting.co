export const videoJS = function () {
  //   const header1VidContainer = document.querySelector('.header-1_video-container');
  //   const header1Vid = videojs('header-1');
  //   header1VidContainer.addEventListener('mouseover', function (e) {
  //     header1Vid.play();
  //   });

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
