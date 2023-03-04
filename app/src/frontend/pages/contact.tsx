import { config } from 'pg-format';
import React from 'react';

import { CCConfig } from '../../cc-config';
let ccconfig: CCConfig = require('../../cc-config.json')

const ContactPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">
                Kontakt
            </h1>
            <p>
                <b>Projektwebseite "Colouring Dresden": </b> <a href="https://colouring.dresden.ioer.info">https://colouring.dresden.ioer.info</a>
            </p>
            <p>
                <b>E-Mail: </b> colouringdresden@ioer.de
            </p>
            <p>
                <b>Newsletter: </b> <a href="https://seu2.cleverreach.com/f/203678-351100/">hier zur Anmeldung zum Newsletter</a>
            </p>
            <p>
                <b>Twitter: </b> <a href="https://twitter.com/colouringdd">https://twitter.com/colouringdd</a>
            </p>
            <p>
                <b>Instagram: </b> <a href="https://www.instagram.com/colouringdd/">https://www.instagram.com/colouringdd/</a>
            </p>

        </section>
    </article>
);

export default ContactPage;
