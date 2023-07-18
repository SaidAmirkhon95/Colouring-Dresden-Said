import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

import { Logo } from './components/logo';
import { WithSeparator } from './components/with-separator';
import { useAuth } from './auth-context';

import { CCConfig } from '../cc-config';
let config: CCConfig = require('../cc-config.json')

interface MenuLink {
    to: string;
    text: string;
    external?: boolean;
    disabled?: boolean;
    note?: string;
}


function getCurrentMenuLinks(username: string): MenuLink[][] {
    return [
        [
            ...(
                username != undefined ?
                    [
                        {
                            to: "/my-account.html",
                            text: `Account (${username})`
                        }
                    ] :
                    [
                        {
                            to: "/login.html",
                            text: "Anmelden"
                        },
                        {
                            to: "/sign-up.html",
                            text: "Registrieren"
                        }
                    ]
            )
        ],
        [
            {
                to: "/view/categories",
                text: "Karte anzeigen"
            },
            {
                to: "/edit/categories",
                text: "Karte bearbeiten"
            },

        ],
        [

            {
                to: "https://colouring.dresden.ioer.info",
                text: "Projektwebseite ",
                disabled: false,
                external: true
            },
            {
                to: "/data-extracts.html",
                text: "Download der Daten"
            },

            {
                to: config.githubURL,
                text: "Programmcode öffnen",
                external: true
            },

/*             {
                to: "/showcase.html",
                text: "Case Study Showcase",
                disabled: true,
            }, */
        ],
        [
/*             {
                to: "https://pages.colouring.london",
                text: "About",
                external: true
            },
            {
                to: "https://pages.colouring.london/buildingcategories",
                text: "Data Categories",
                external: true
            },
            {
                to: "https://pages.colouring.london/whoisinvolved",
                text: "Who's Involved?",
                external: true
            }, */
/*             {
                to: "https://pages.colouring.london/data-ethics",
                text: "Datenethik",
                external: true
            }, */
            {
                to: "https://pages.colouring.london/colouring-cities",
                text: "Colouring Cities Research Programme (CCRP)",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Manual / Wiki des CCRP",
                external: true
            },
        ],
/*         [
            {
                to: "/leaderboard.html",
                text: "Top Contributors"
            },
            {
                to: "https://discuss.colouring.london",
                text: "Discussion Forum",
                external: true
            },
            {
                to: "https://discuss.colouring.london/c/blog/9",
                text: "Blog",
                external: true
            },
        ], */
        [
            {
                to: "/privacy-policy.html",
                text: "Datenschutz & Sicherheit"
            },
            {
                to: "/contributor-agreement.html",
                text: "Vereinbarung zur Mitwirkung"
            },
            {
                to: "/code-of-conduct.html",
                text: "Verhaltenskodex für Mitwirkende"
            },
            {
                to: "/data-accuracy.html",
                text: "Haftungsausschluss"
            },
/*             {
                to: "/ordnance-survey-uprn.html",
                text: "Ordnance Survey terms of UPRN usage"
            }, */
        ],
        [
            {
                to: "/contact.html",
                text: "Kontakt"
            },
            {
                to: "https://ioer.de/impressum",
                text: "Impressum",
                external: true
            },
            {
                to: "/declaration-on-accessibility.html",
                text: "Barrierefreiheit",
                external: true
            },
        ],
    ];
}

const Menu: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
    const { user } = useAuth();

    const menuLinkSections = getCurrentMenuLinks(user?.username);
    return (
        <WithSeparator separator={<hr />}>
            {menuLinkSections.map((section, idx) =>
                <ul key={`menu-section-${idx}`} className="navbar-nav flex-container">
                    {section.map(item => (
                        <li className='nav-item' key={`${item.to}-${item.text}`}>
                            {
                                item.disabled ?
                                    <LinkStub note={item.note}>{item.text}</LinkStub> :
                                    item.external ?
                                        <ExternalNavLink to={item.to}>{item.text}</ExternalNavLink> :
                                        <InternalNavLink to={item.to} onClick={onNavigate}>{item.text}</InternalNavLink>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </WithSeparator>
    );
};

const InternalNavLink: React.FC<{to: string; onClick: () => void}> = ({ to, onClick, children}) => (
    <NavLink className="nav-link" to={to} onClick={onClick}>
        {children}
    </NavLink>
);

const ExternalNavLink: React.FC<{to: string}> = ({ to, children }) => (
    <a className="nav-link" href={to}>
        {children}
    </a>
);

const LinkStub: React.FC<{note: string}> = ({note, children}) => (
    <a className="nav-link disabled">
        {children}
        <span className="link-note">{note}</span>
    </a>
);

export const Header: React.FC<{
    animateLogo: boolean;
}> = ({ animateLogo }) => {
    const [collapseMenu, setCollapseMenu] = useState(true);

    const toggleCollapse = () => setCollapseMenu(!collapseMenu);
    const handleNavigate = () => setCollapseMenu(true);

    return (
    <header className="main-header navbar navbar-light">
        <div className="nav-header">
            <NavLink to="/">
                <Logo variant={animateLogo ? 'animated' : 'default'}/>
            </NavLink>
            <button className="navbar-toggler" type="button"
                onClick={toggleCollapse} aria-expanded={!collapseMenu} aria-label="Toggle navigation">
                Menü&nbsp;
                {
                    collapseMenu ?
                        <span className="navbar-toggler-icon"></span>
                        : <span className="close">&times;</span>
                }
            </button>
        </div>
        <nav className={collapseMenu ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <Menu onNavigate={handleNavigate}></Menu>
        </nav>
    </header>
    );
}
