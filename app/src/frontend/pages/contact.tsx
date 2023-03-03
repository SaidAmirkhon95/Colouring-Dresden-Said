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
                <b>Projektwebseite "Colouring Dresden":</b> https://colouring.dresden.ioer.info
            </p>
            <p>
                <b>E-Mail:</b> colouringdresden@ioer.de
            </p>
            <p>
                <b>Newsletter:</b> https://seu2.cleverreach.com/f/203678-351100/
            </p>
            <p>
                <b>Twitter:</b> https://twitter.com/colouringdd
            </p>
            <p>
                <b>Instagram:</b> https://www.instagram.com/colouringdd/
            </p>

        </section>
    </article>
);

export default ContactPage;
