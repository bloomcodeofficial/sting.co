import { bwAccordionAttribute } from '$utils/bw-accordion';
import { filter } from '$utils/filter';
import { library } from '$utils/library';
import { navbar } from '$utils/navbar';
import { openCoaching } from '$utils/open-coaching';
import { senja } from '$utils/senja';
import { globalSwiper } from '$utils/swiper-global';
import { videoJS } from '$utils/videojs';

navbar();
senja();
globalSwiper();
videoJS();
bwAccordionAttribute();
filter();
openCoaching();
library();

/*
const versionID = 'ed74908c1c21eccd0f7357a5817f815b5a961a56';
console.log(`
<script defer src="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/index.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/utils/jobylon.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/utils/library.js"></script>
<link href="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/index.css" rel="stylesheet" type="text/css"/>
`);
*/
