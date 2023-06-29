import { Chart } from 'chart.js/auto';
import { Autoplay } from 'swiper';

export const report22 = function () {
  window.Webflow ||= [];
  window.Webflow.push(() => {
    // Global settings
    Chart.defaults.font.family = 'Poppins';
    Chart.defaults.font.size = 16;
    Chart.defaults.font.weight = '500';

    // Generate years from 2002 to 2022
    const yearLabels = function () {
      const labels = [];
      for (let i = 2002; i < 2023; i++) {
        labels.push(i);
      }
      return labels;
    };

    // Charts
    const chartCompanies = document.querySelector<HTMLCanvasElement>(
      '[data-element="number-of-companies"]'
    );
    const chartValuation = document.querySelector<HTMLCanvasElement>('[data-element="valuation"]');

    const data = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

    if (!chartCompanies) return;

    new Chart(chartCompanies, {
      type: 'bar',
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },

      data: {
        labels: yearLabels(),
        datasets: [
          {
            label: 'Active companies',
            data: data,
            backgroundColor: '#ec1877',
          },
          {
            label: 'Living dead / Changed idea',
            data: data,
            backgroundColor: 'grey',
          },
          {
            label: 'Discontinued',
            data: data,
            backgroundColor: 'black',
          },
        ],
      },
    });
  });
};
