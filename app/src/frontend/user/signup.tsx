import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

export const SignUp: React.FC = () => {
    const { isLoading, signup } = useAuth();
    const [error, setError] = useState(undefined);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmConditions, setConfirmConditions] = useState(false);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            signup({ username, email, confirmEmail, password }, setError);
        },
        [username, email, confirmEmail, password, confirmConditions, signup]
    );

    const msgName = `Willkommen bei Colouring ${config.cityName}. Sie gehören zu den ersten Besucher*innen auf der Plattform!`

    return (
        <article>
            <section className="main-col">
                <h1 className="h2">Registrieren</h1>
                <InfoBox msg={msgName}>
                    <br/>Feedback, Hinweise oder Fragen bitte per E-Mail an colouringdresden@ioer.de . Oder direkt <a
                            href="https://github.com/colouring-cities/colouring-dresden/issues">
                        hier</a> berichten.
                </InfoBox>
                <p>
                    Einen neuen Account anlegen. Let´s colour {config.cityName}!
                </p>
                <ErrorBox msg={error} />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Benutzername*</label>
                    <input name="username" id="username"
                        className="form-control" type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="Bitte beachten: der gewählte Benutzername ist öffentlich" required
                        minLength={4}
                        maxLength={29}
                        pattern="\w+"
                        title="Der Benutzername darf nur Buchstaben, Zahlen sowie Unterstrich enthalten."
                    />

                    <label htmlFor="email">E-Mail (optional)</label>
                    <input name="email" id="email"
                        className="form-control" type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="person@beispiel.de"
                    />
                    <InfoBox msg="Die Registrierung eines neuen Accounts soll möglichst wenig Daten erfordern. Eine E-Mail Adresse wird nur zum Zurücksetzen des Passworts (bei Passwort vergessen) benötigt und ist daher optional." />
                    
                    <label htmlFor="confirm_email">E-Mail bestätigen (optional)</label>
                    <input name="confirm_email" id="confirm_email"
                        className="form-control" type="email"
                        value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)}
                    />

                    <label htmlFor="password">Passwort (mindestens 8 Zeichen)</label>
                    <input name="password" id="password"
                        className="form-control"
                        type={(showPassword)? 'text': 'password'}
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                        minLength={8}
                        maxLength={128}
                    />

                    <div className="form-check">
                        <input id="show_password" name="show_password"
                            className="form-check-input" type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="show_password">
                            Passwort zeigen?
                        </label>
                    </div>

                    <div className="form-check">
                        <input id="confirm_conditions" name="confirm_conditions"
                            className="form-check-input" type="checkbox"
                            checked={confirmConditions}
                            onChange={e => setConfirmConditions(e.target.checked)}
                            required />
                        <label className="form-check-label" htmlFor="confirm_conditions">
                            Hiermit bestätige ich, dass ich die  <Link
                                to="/privacy-policy.html">Datenschutzerklärung</Link>, die <Link
                                to="/contributor-agreement.html">Vereinbarung zur Mitwirkung</Link>, den <Link
                                to="/data-accuracy.html">Haftungsausschluss</Link> und den  <Link
                                to="/code-of-conduct.html">Verhaltenskodex zur Mitwirkung</Link> gelesen und verstanden habe und stimme diesen zu.
                        </label>
                    </div>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value="Registrieren" className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon/>Sende Daten für die Registrierung...</span>}
                    </div>
                    <InfoBox msg="">
                        Lesen Sie bitte auch unsere <a href="https://www.pages.colouring.london/data-ethics">Grundsätze zur Datenethik</a> bevor Sie unsere Daten nutzen oder verbreiten.
                    </InfoBox>

                    Haben Sie bereits einen Account?

                    <div className="buttons-container with-space">
                        <Link to="login.html" className="btn btn-outline-dark">Log in</Link>
                    </div>

                </form>
            </section>
            <hr />
            <section className="main-col">
                <SupporterLogos />
            </section>
        </article>
    );
};
