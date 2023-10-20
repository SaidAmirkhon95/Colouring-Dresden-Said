import React, { useState} from 'react';



import SurveyModal from '../components/survey-modal';


import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')



import { apiPost, apiGet, apiDelete } from '../apiHelpers';
import { bool } from 'sharp';





const SurveyPage = () => {
    /* const [open, setOpen] = useState(false); */

    const [showDeleteConfirm, setShowSurveyModal] = useState(false);


    async function getSurveyPopUpStatus(): Promise<void> {
        /* setUserError(undefined); */
       /*  setIsLoading(true); */
    
        try {
            const user = await apiGet('/api/users/get_survey_popup_status');
            if (user.error) {
                setShowSurveyModal(false);

            } else {
                /* setUser(user); */
                console.log(user[0].value);
                /* convert API JSON response into boolean */
                var bool_value = user[0].value == "true" ? true : false;
                
                /* console.log(bool_value); */
                /* console.log(typeof(bool_value)); */

                setShowSurveyModal(bool_value);

            }
        } catch(err) {
            /* setUserError('Error loading user info.'); */
            setShowSurveyModal(false);

        }
    
    };


    return (
    
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
            {/* <iframe src="https://www.soscisurvey.de/colouring_dd/?act=TrHpTJpvhrlnRPoKIZsLFKVm" height={1500} width={600} frameBorder={0} allowFullScreen></iframe> */}



{/* style="position:relative; top:0px; left:0px; bottom:60px; right:0px; width:100%; height:450px; border:solid; margin:0px 0px 0px 0px; padding:0; overflow:scroll; z-index:0;" */}
            {/* <p>
            Willkommen bei Colouring Dresden. Für unsere Forschung/ Evaluation würden wir uns über Ihre Teilnahme an der Umfrage freuen.
            </p> */}
            {/* here iFrame for external survey from SoSciSurvey */}
            {/* <iframe src="https://www.soscisurvey.de/colouring_dd/?q=test01" height={1500} width={400} frameBorder={0} allowFullScreen></iframe> */}

            {/* To DO: responsive desing... adapting width of iFrame by screen width */}

{/*             <div>
                <button onClick={() => setOpen(true)}>zur Umfrage</button>
                {open ? <Popup text="Umfrage" closePopup={() => setOpen(false)} /> : null}
            </div> */}


            <form
                onSubmit={e => {
                    e.preventDefault();
                    setShowSurveyModal(true);
                }}
                className="form-group mb-3"
            >
                <input className="btn btn-danger" type="submit" value="zur Umfrage" />
            </form>

            <form
                onSubmit={e => {
                    e.preventDefault();
                    getSurveyPopUpStatus();
  
                }}
                className="form-group mb-3"
            >
                <input className="btn btn-danger" type="submit" value="API Test" />
            </form>

            <SurveyModal
                show={showDeleteConfirm}
                title="Umfrage"
                description="Willkommen bei Colouring Dresden. Für unsere Forschung/ Evaluation würden wir uns über Ihre Teilnahme an der Umfrage freuen."
                confirmButtonText="Schließen"
                confirmButtonClass="btn-secondary"
                onConfirm={() => setShowSurveyModal(false)}
                onCancel={() => setShowSurveyModal(false)}
            />




        </section>
    </article>


    );

};

export default SurveyPage;
