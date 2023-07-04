import { annualReports } from '$utils/annualReports';
import { library } from '$utils/library';
import { openCoaching } from '$utils/openCoaching';
import { senja } from '$utils/senja';
import { globalSwiper } from '$utils/swiper';

senja();
globalSwiper();
openCoaching();
library();
if (window.location.href.includes('/annual-reports')) annualReports();
