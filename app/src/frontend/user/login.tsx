import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

export const Login: React.FC = () => {
    const {isLoading, login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(undefined);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setError(undefined);

        login({ username, password }, setError);
    }, [username, password]);

    const msgText = `Willkommen bei Colouring ${config.cityName}. Sie gehören zu den ersten Besucher*innen auf der Plattform!`;

    return (
        <article>
            <section className="main-col">
                <h1 className="h2">Anmelden</h1>
                <InfoBox msg={msgText}>
                    <br/>Feedback, Hinweise oder Fragen bitte per E-Mail an colouringdresden@ioer.de . Oder direkt <a
                        href="https://github.com/colouring-cities/colouring-dresden/issues">
                    hier</a> berichten.
                </InfoBox>
                <ErrorBox msg={error} />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Benutzername*</label>
                    <input name="username" id="username"
                        className="form-control" type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="Bitte beachten: der gewählte Benutzername ist öffentlich" required
                    />

                    <label htmlFor="password">Passwort</label>
                    <input name="password" id="password"
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="form-check">
                        <input id="show_password" name="show_password"
                            className="form-check-input" type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="show_password" className="form-check-label">Passwort zeigen?</label>
                    </div>

                    <Link to="/forgotten-password.html">Passwort vergessen?</Link>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value="Anmelden" className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon />Logging in...</span>}
                    </div>

                    Möchten Sie stattdessen einen neuen Benutzeraccount anlegen?

                    <div className="buttons-container with-space">
                        <Link to="sign-up.html" className="btn btn-outline-dark">Registrieren</Link>
                    </div>
                </form>
            </section>
            <hr />
            <section className="main-col">
                <SupporterLogos />
            </section>
        </article>
    )

};
