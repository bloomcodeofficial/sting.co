import { faq1 } from '$utils/faq-1';
import { jobylon2 } from '$utils/jobylon2';
import { logoMarquee } from '$utils/logo-marquee';
import { navbar } from '$utils/navbar';
import { prestingAcc } from '$utils/presting-acc';
import { senja } from '$utils/senja';
import { speakers1 } from '$utils/speakers-1';
import { videoJS } from '$utils/videojs';

navbar();
senja();
logoMarquee();
prestingAcc();
speakers1();
videoJS();
faq1();

if (window.location.pathname === '/companies-2/startup-jobs') {
  jobylon2();
}
