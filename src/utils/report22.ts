import { Chart } from 'chart.js/auto';
import { Autoplay } from 'swiper';

export const report22 = async function () {
  window.Webflow ||= [];
  window.Webflow.push(async () => {
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

    const dataNumberOfCompanies = await fetchData('number-of-companies');

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
        labels: dataNumberOfCompanies.map((row) => row.year).sort((a, b) => a - b),
        datasets: [
          {
            label: 'Active companies',
            data: dataNumberOfCompanies.map((row) => row.activeCompanies),
            backgroundColor: '#ec1877',
          },
          {
            label: 'Living dead / Changed ideas',
            data: dataNumberOfCompanies.map((row) => row.livingDead),
            backgroundColor: 'grey',
          },
          {
            label: 'Discontinued',
            data: dataNumberOfCompanies.map((row) => row.discontinued),
            backgroundColor: 'black',
          },
          // {
          //   label: 'Mergers / Acquisitions',
          //   data: dataNumberOfCompanies.map((row) => row.mergers),
          //   backgroundColor: 'black',
          // },
        ],
      },
    });
  });

  async function fetchData(chart) {
    const res = await fetch('/annual-reports/data');
    const html = await res.text();

    const parser = new DOMParser();
    const page = parser.parseFromString(html, 'text/html');

    const list = Array.from(page.querySelector(`[data-chart="${chart}"]`)?.childNodes);
    const data = list.map((item) => {
      const script = item.querySelector('script');
      const data = JSON.parse(script.textContent);
      return data;
    });
    return data;
  }
};
