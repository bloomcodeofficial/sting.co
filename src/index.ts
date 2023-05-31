import { bwAccordionAttribute } from '$utils/bw-accordion';
import { filter } from '$utils/filter';
import { navbar } from '$utils/navbar';
import { senja } from '$utils/senja';
import { globalSwiper } from '$utils/swiper-global';
import { videoJS } from '$utils/videojs';

navbar();
senja();
globalSwiper();
videoJS();
bwAccordionAttribute();
filter();

const versionID = 'ee3cf130716869a9dc80f3a256124dac00a59348';
console.log(`
<script defer src="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/index.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/utils/jobylon.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/utils/library.js"></script>
<link href="https://cdn.jsdelivr.net/gh/bloomcodeofficial/sting.co@${versionID}/dist/index.css" rel="stylesheet" type="text/css"/>
`);
