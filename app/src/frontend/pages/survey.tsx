import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const SurveyPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Online-Umfrage</h1>
            <p>
            Test Survey
            </p>
            <p>
            Willkommen bei Colouring Dresden. Für unsere Forschung/ Evaluation würden wir uns über Ihre Teilnahme an der Umfrage freuen.
            </p>
            {/* here iFrame for external survey from SoSciSurvey */}
            <iframe src="https://www.soscisurvey.de/colouring_dd/?act=TrHpTJpvhrlnRPoKIZsLFKVm" height={1500} width={600} frameBorder={0} allowFullScreen></iframe>
{/* style="position:relative; top:0px; left:0px; bottom:60px; right:0px; width:100%; height:450px; border:solid; margin:0px 0px 0px 0px; padding:0; overflow:scroll; z-index:0;" */}
            {/* <p>
            Willkommen bei Colouring Dresden. Für unsere Forschung/ Evaluation würden wir uns über Ihre Teilnahme an der Umfrage freuen.
            </p> */}
            {/* here iFrame for external survey from SoSciSurvey */}
            {/* <iframe src="https://www.soscisurvey.de/colouring_dd/?q=test01" height={1500} width={400} frameBorder={0} allowFullScreen></iframe> */}

            {/* To DO: responsive desing... adapting width of iFrame by screen width */}
        </section>
    </article>
);

export default SurveyPage;
