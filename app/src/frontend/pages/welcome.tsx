import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

import Categories from '../building/categories';
import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <Categories mode="view"/>
        <h1 className="h2">Willkommen bei Colouring {config.cityName}!</h1>
        <p>
            Wie alt sind die Gebäude Dresdens? Aus welchen Materialien wurden sie überwiegend erbaut? Und wie gut sind sie baulich vorbereitet, um mit extremen Ereignissen wir Starkregen, Hochwasser oder Hitze umgehen zu können?
        </p>
        <p>
            Um solche oder weitere Fragen beantworten zu können, soll Wissen zu den Gebäuden der Stadt {config.cityName} für unterschiedliche Gebäudemerkmale in einer offenen Wissensplattform Colouring {config.cityName} erfasst, 
            in Karten visualisiert und als offene Daten bereitgestellt werden.
            
            Falls Sie Interesse an den Gebäuden der Stadt {config.cityName} haben und Ihr Wissen in einer interaktiven Karte erfassen und teilen möchten, dann sind Sie auf der Plattform Colouring {config.cityName} genau richtig!
        </p>
        <p>
            <b>Wie kann ich mitmachen?</b>
        </p>
        <p>
            Sie können individuell beginnen und Gebäudemerkmale eintragen - egal ob am heimischen Computer oder draußen an der frischen Luft. Einfach einen neuen Account registieren und loslegen.
            Weiterhin werden unterschiedliche Veranstaltungen wie Vorträge, Spaziergänge ("Mapathons") oder ein (digitaler) monatlicher Stammtisch zum Erfahrungsaustausch angeboten: informieren Sie sich dazu auf der <a href="https://colouring.dresden.ioer.info" target="_blank">Projektwebseite</a>.
        </p>
        <p>
            Zum Projekt:
        </p>
        <p>
            Die Plattform Colouring {config.cityName} wird im Rahmen des Citizen Science Projektes "Baukultur und klimagerechte Architektur in Dresden. Gebäudewissen kartieren, erforschen und vermitteln"
            weiterentwickelt und für das gemeinsame Erfassen der Gebäudemerkmale genutzt. 
            Weitere Informationen sind  <a href="https://colouring.dresden.ioer.info" target="_blank">hier auf der Projektwebseite</a> zu finden.
        </p>
        <p>
            Colouring {config.cityName} ist Teil des internationalen Forschungsnetzwerkes Colouring Cities Research Programme (CCRP), welches
            am Alan Turing Institut angesiedelt ist (dem nationalen Institut des Vereinigten Königreichs für Data Science und künstliche Intelligenz). 
            Das Forschungsnetzwerk arbeitet mit lokalen, regionalen, nationalen und internationalen Partnern an der Weiterentwicklung des offenen Programmcodes, 
            und kann auf weitere Städte übertragen werden. Das Forschungsnetzwerk CCRP pflegt ein <a href="https://github.com/colouring-cities/manual/wiki" target="_blank">offenes Wiki</a> auf GitHub,
            um über die Entwicklung und Aktivitäten zu informieren.
        </p>
        <p>
            Neue Datensätze oder Funktionen werden kontinuierlich ergänzt. Über Ihre Mitwirkung bei der Erfassung oder Verifikation von Gebäudemerkmalen sind wir dankbar!
        </p>
        <p>
            Die <Link to="/data-extracts.html">Daten</Link> sowie der <a href="https://github.com/colouring-cities/colouring-dresden" target="_blank">Programmcode</a> stehen frei zum Herunterladen unter offenen Lizenzen bereit. 
        </p>
        <p>
            Schön, dass Sie zu Colouring {config.cityName} gefunden haben!
            Und nun viel Spaß beim Entdecken, Erfassen und Erforschen des Gebäudebestandes der Stadt Dresden.
        </p>

        <Link to="/view/categories"
            className="btn btn-outline-dark btn-lg btn-block">
            Let´s colour {config.cityName}!
        </Link>
        <div className="image-row">
            <img className="cl-logo" src="images/logo-cc.jpg" alt="Colouring Cities Research Programme"></img>
            <img className="turing-logo" src="images/logo-turing.jpg" alt="Alan Turing Institute"></img>
        </div>
        <div className="image-row">
            <img src="images/supporter-logos.png" alt="Colouring Cities collaborating organisations: The Bartlett UCL, Ordnance Survey, Historic England, Greater London Authority" />
        </div>
        <div className="image-row">
            <img src="images/logo-loughborough.png" alt="Colouring Cities collaborating organisations: Loughborough University" />
            <img src="images/logo-newcastle.png" alt="Colouring Cities collaborating organisations: Newcastle University" />
        </div>
    </div>
);

export default Welcome;
