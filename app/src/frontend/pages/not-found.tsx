import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component to fall back on in case of 404 or no other match
 */
export const NotFound: React.FC = () => (
    <article>
        <section className="main-col">
            <h1 className="h1">Seite nicht gefunden</h1>
            <p className="lead">

            Die Seite konnte nicht gefunden werden.

            </p>
            <Link className="btn btn-outline-dark" to="/">Zurück zur Startseite</Link>
        </section>
    </article>
);
