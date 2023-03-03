import React, { Fragment } from 'react';

import './supporter-logos.css';

const SupporterLogos = () => (
    <Fragment>
        <h2 className="h3">Lead Organisation and Project Partners</h2>
        <ul className="logo-list">
            <li>
                <a href="https://ioer.de/" target="_blank">
                    <img className="cl-logo" src="images/logo-ioer-de.svg" alt="Leibniz-Institut für ökologische Raumentwicklung (IÖR) e.V."></img>
                </a>
            </li>
            <li>
                <a href="https://pages.colouring.london/colouring-cities" target="_blank">
                    <img className="cl-logo" src="images/logo-cc.jpg" alt="Colouring Cities Research Programme"></img>
                </a>
            </li>
            <li>
                <a href="https://www.citizenscience-wettbewerb.de/" target="_blank">
                    <img className="cl-logo" src="images/AdP Banner Wortmarke 560x300 300dpi (3) (1).png" alt="Auf die Plätze! Citizen Science in deiner Stadt."></img>
                </a>
            </li>
            <li>
                <a href="https://www.wissenschaft-im-dialog.de/" target="_blank">
                    <img className="wid-logo" src="images/01_LOGO_WID-rgb.png" alt="Wissenschaft im Dialog"></img>
                </a>
            </li>
            <li>
                <a href="https://www.museumfuernaturkunde.berlin/de" target="_blank">
                    <img className="cl-logo" src="images/02_mfn_logo_STANDARD_auf_weiss-kl.png" alt="Museum für Naturkunde Berlin/ Leibniz-Institut für Evolutions- und Biodiversitätsforschung"></img>
                </a>
            </li>
            <li>
                <a href="https://www.buergerschaffenwissen.de/" target="_blank">
                    <img className="cl-logo" src="images/BsW_Logo-m-Claim-WEB-kl.png" alt="Bürger schaffen Wissen"></img>
                </a>
            </li>
            <li>
                <a href="https://www.bmbf.de/" target="_blank">
                    <img className="cl-logo" src="images/BMBF_gefoerdert_vom_deutsch_CMYK.png" alt="Bundesministerium für Bildung und Forschung"></img>
                </a>
            </li>
            <li>
                <a href="https://www.bmbf.de/bmbf/de/ueber-uns/wissenschaftskommunikation-und-buergerbeteiligung/buergerbeteiligung/citizen-science/buergerforschung.html" target="_blank">
                    <img className="cl-logo" src="images/BForschung_Logo_web-kl.png" alt="Bürgerforschung Wissenschaft für alle"></img>
                </a>
            </li>
        </ul>
    </Fragment>
);

export default SupporterLogos;
