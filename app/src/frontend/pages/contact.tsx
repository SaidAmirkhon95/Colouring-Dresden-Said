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
                <b>Projektwebseite "Colouring Dresden": </b> <a href="https://colouring.dresden.ioer.info" target="_blank">https://colouring.dresden.ioer.info</a>
            </p>
            <p>
                <b>E-Mail: </b> colouringdresden@ioer.de
            </p>
            <p>
                <b>Newsletter: </b> <a href="https://seu2.cleverreach.com/f/203678-351100/" target="_blank">hier zur Anmeldung zum Newsletter</a>
            </p>
            <p>
                <b>Mastodon: </b> <a href="https://wisskomm.social/@ioer/" target="_blank">@ioer@willkomm.social</a>
            </p>
            <p>
                <b>Bluesky: </b> <a href="https://t.co/v0GRbpZYh1" target="_blank">http://ioer.bsky.social</a>
            </p>
            <p>
                <b>Instagram: </b> <a href="https://www.instagram.com/colouringdd/" target="_blank">https://www.instagram.com/colouringdd/</a>
            </p>

        </section>
    </article>
);

export default ContactPage;
