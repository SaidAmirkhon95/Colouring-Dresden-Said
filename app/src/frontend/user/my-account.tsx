import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ConfirmationModal from '../components/confirmation-modal';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

export const MyAccountPage: React.FC = () => {
    const { isLoading, user, userError, logout, generateApiKey, deleteAccount } = useAuth();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [error, setError] = useState(undefined);

    const handleLogout = useCallback((e) => {
        e.preventDefault();
        logout(setError);
    }, [logout]);

    const handleGenerateKey = useCallback(async (e) => {
        e.preventDefault();
        
        setError(undefined);
        generateApiKey(setError);
    }, [generateApiKey]);

    const handleDeleteAccount = useCallback(() => {
        setError(undefined);
        deleteAccount(setError);
    }, [deleteAccount])

    if(!user && isLoading) {
        return (
            <article>
                <section className="main-col">
                    <SpinnerIcon spin={true} /> Lade Account Infos... 
                </section>
            </article>
        );
    }

    const issuesURL = config.githubURL + "/issues"

    return (
        <article>
            <section className="main-col">
                { !isLoading && <ErrorBox msg={userError} /> }
                {!userError && (<>
                    <h1 className="h1">Willkommen, {user.username}!</h1>
                    <p>
                        Colouring {config.cityName} wird permanent weiterentwickelt. Bitte schreiben Sie uns Ihre Ideen unter colouringdresden@ioer.de 
                        oder posten Ideen oder Probleme {' '}
                        <a href={issuesURL}>direkt hier</a>.
                    </p>
                    <p>
                        Zum Nachlesen finden Sie hier die {' '}
                        <Link to="/privacy-policy.html">Datenschutzerklärung</Link>, die {' '}
                        <Link to="/contributor-agreement.html">Vereinbarung zur Mitwirkung</Link> und den {' '}
                        <Link to="/code-of-conduct.html">Verhaltenskodex für Mitwirkende</Link>.
                        {/* later add data accuracy agreement here... in German  */}
                    </p>
                    <ErrorBox msg={error} />
                    <form onSubmit={handleLogout}>
                        <div className="buttons-container">
                            <Link to="/edit/age" className="btn btn-warning">Starten</Link>
                            <input className="btn btn-secondary" type="submit" value="Ausloggen"/>
                        </div>
                    </form>

                    <hr/>
                    <h2 className="h2">Meine Details</h2>
                    <h3 className="h3">Benutzername</h3>
                    <p><b>{user.username}</b></p>
                    <h3 className="h3">E-Mail Adresse (optional)</h3>
                    <p><b>{user.email || '-'}</b></p>
                    <h3 className="h3">Registriert am </h3>
                    <p><b>{user.registered.toString()}</b></p>

                    <hr/>

                    <h2 className="h2">API</h2>
                    <p>Sind Sie Softwareentwickler*in? Falls ja, könnte dies von Interesse für Sie sein:</p>
                    <h3 className="h3">API key</h3>
                    <p><b>{user.api_key || '-'}</b></p>
                    <form onSubmit={handleGenerateKey} className="form-group mb-3">
                        <input className="btn btn-warning" type="submit" value="Generiere API key"/>
                    </form>

                    <h3 className="h3">Open Source Code</h3>
                    Colouring {config.cityName} wird bei <a href={config.githubURL}>colouring-cities</a> auf Github weiterentwickelt.

                    <hr />

                    <h2 className="h2">Account</h2>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            setShowDeleteConfirm(true);
                        }}
                        className="form-group mb-3"
                    >
                        <input className="btn btn-danger" type="submit" value="Account löschen" />
                    </form>

                    <ConfirmationModal
                        show={showDeleteConfirm}
                        title="Account löschen bestätigen"
                        description="Sind Sie wirklich sicher, dass Sie Ihren Account löschen möchten? Dies kann nicht rückgängig gemacht werden!"
                        confirmButtonText="Account wirklich löschen"
                        confirmButtonClass="btn-danger"
                        onConfirm={() => handleDeleteAccount()}
                        onCancel={() => setShowDeleteConfirm(false)}
                    />
                </>)}
            </section>
        </article>
    );
};
