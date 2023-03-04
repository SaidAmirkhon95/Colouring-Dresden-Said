import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const ContributorAgreementPage : React.SFC<any> = () => (
    <article>
        <section className='main-col'>
            <h1>Vereinbarung zur Mitwirkung</h1>

            <h2 className='h2'>Verantwortlichkeiten der Mitwirkenden</h2>
            
            <p>
            Wir bitten alle Mitwirkenden:
            </p>
            <ul>
                <li>
                    sich an unseren Verhaltenskodex zu halten
                </li>
                <li>
                    niemals wissentlich Daten hinzuzufügen, die aus einer eingeschränkten, urheberrechtlich geschützten, böswilligen oder illegalen Quelle stammen
                </li>
                <li>
                    uns dabei zu helfen, eine offene Datenplattform zu schaffen, die die Entwicklung nachhaltiger, widerstandsfähiger, inklusiver und gerechter Städte unterstützt und die Nutzung von Daten für das öffentliche Wohl fördert
                </li>
                <li>
                    fügen Sie Quellen hinzu, wo immer dies möglich ist, um andere zu unterstützen
                </li>
                <li>
                    erfasste Daten, wann immer möglich, zum Nutzen anderer zu verifizieren
                </li>
                <li>
                    sicherzustellen, dass unsere offenen Lizenzbedingungen in Bezug auf unsere offenen Daten und unseren offenen Code vollständig befolgt werden
                </li>
                <li>
                    uns so wenig persönliche Daten wie möglich zur Verfügung stellen
                </li>
                <li>
                    die volle Verantwortung für die Bewertung der Zuverlässigkeit der Colouring Dresden Daten und ihrer Eignung für die beabsichtigte Nutzung zu übernehmen (siehe auch unseren Haftungsausschluss)
                </li>
                <li>
                    uns Feedback zu tatsächlichen oder potenziellen Datenschutz- und Sicherheitsbedenken geben
                </li>
            </ul>

            <h2 className='h2'>Zusätzliche Hinweise für Mitwirkende</h2>

            <h3 className='h3'>Offene Daten (Open data)</h3>
            <p>
                Colouring Dresden ist ein offenes Datenprojekt. Offene Daten werden von den Mitwirkenden von Colouring Dresden unter der Open Data Commons Open Database License (https://opendatacommons.org/licenses/odbl/) lizenziert. Unter dieser Lizenz dürfen Sie unsere Daten frei kopieren, verbreiten, übertragen und anpassen, solange Sie Colouring Dresden und unsere Mitwirkenden als Urheber nennen. Wenn Sie unsere Daten verändern oder darauf aufbauen, dürfen Sie das Ergebnis nur unter derselben Lizenz weitergeben. Unser offener Plattformcode ist unter der GNU, General Public Licence (https://www.gnu.org/licenses/gpl-3.0.en.html) verfügbar.
            </p>

            <h3 className='h3'>Wozu Sie beitragen</h3>
            
            <p>
            Colouring Dresden ist eine freie Plattform für den Wissensaustausch und eine offene Datenbank für die öffentliche Nutzung. Sie wurde eingerichtet, um einen gesamtgesellschaftlichen Ansatz zur Verbesserung der Nachhaltigkeit, Widerstandsfähigkeit und Inklusivität von Städten zu unterstützen. Colouring Dresden ist auch Teil des internationalen Colouring Cities Research Programme (CCRP) des Alan Turing Instituts. Das Projekt orientiert sich an den Grundsätzen der New Urban Agenda der Vereinten Nationen, der Open Data Charter, der Datenschutz-Grundverordnung (DGSVO), den Gemini-Prinzipien, den Empfehlungen des Open Data Institute zu personenbezogenen Daten und Dateninfrastrukturen sowie an bestimmten Artikeln der Erklärung der Menschenrechte. Diese werden auf unserer Seite <a href="https://github.com/colouring-cities/colouring-core/issues/687">'Data ethics'</a> erörtert, auf der wir auch das Datenethik-Canvas des Open Data Institute verwenden, um Fragen zur Verwendung und Verwaltung unserer Daten zu beantworten. Wir erfassen räumliche Statistiken und sammeln keine Texte oder Bilder, obwohl Bilder in Zukunft integriert werden könnten. Die Art der von uns erfassten Geodaten kann durch Anklicken der einzelnen Datenkategorien, der Schaltflächen "Info" und der Seite "Gebäudedatenkategorien" eingesehen werden. Wir planen außerdem einen "Showcase Bereich", der es den Nutzern der Plattform ermöglichen soll, die Art und Weise, wie die Daten von Colouring Dresden verwendet werden, mit anderen zu teilen und zu sehen.
            </p>

            <h3 className='h3'>Diversität und Inklusion</h3>

            <p>
                Wir sind sehr dankbar für alle konstruktiven Beiträge, die von unseren Mitwirkenden geliefert werden. Unsere Plattform ist für alle gedacht, und wir arbeiten daran, sie so inklusiv, einladend und zugänglich wie möglich zu gestalten. Wir respektieren die Vielfalt der Mitwirkenden und des Publikums und bemühen uns aktiv darum, diese Vielfalt zu fördern. Wir nutzen Farben, Crowdsourcing und nichttechnische Sprache, um die Hürden für das Einbringen von statistischen Informationen zu verringern und den Prozess lohnend und interessant zu gestalten. Die Vielfalt in Bezug auf Alter, Geschlecht, Fähigkeiten und Fertigkeiten sowie den kulturellen Hintergrund ist auch wichtig, damit wir als Gemeinschaften unsere Städte und Gemeinden zu integrativeren, gerechteren, nachhaltigeren und widerstandsfähigeren Orten machen können. Unser kollektives Wissen über die Zusammensetzung, das dynamische Verhalten und die Energieleistung unserer Bestände und darüber, wie gut unsere Gebäude funktionieren, ist von entscheidender Bedeutung, um die Politik darüber zu informieren, welche Gebäude wir wiederverwenden, abreißen und neu bauen sollten, um die Nachrüstung zu beschleunigen und um die Bestände als dynamische Systeme besser zu verstehen, damit sie verbessert werden können.
            </p>

            <h3 className='h3'>Urheberrecht, Datengenauigkeit und -qualität</h3>
            
            <p>
                Wir können keine Daten akzeptieren, die aus urheberrechtlich geschützten oder eingeschränkten Quellen stammen (es sei denn, sie fallen unter die Fair-Use-Regelung), oder aus illegalen Quellen. Wir bitten die Mitwirkenden, die Quellen vor dem Hochladen sorgfältig zu prüfen. Wir können auch keine Verantwortung für die Qualität der Datensätze übernehmen, da es nicht möglich ist, jeden Dateneintrag zu überprüfen, und da verschiedene Nutzer je nach Verwendungszweck der Daten (z. B. Schulprojekt oder wissenschaftliche Arbeit) unterschiedliche Grade an Genauigkeit und Präzision benötigen. Unser Ziel ist es jedoch, unsere Daten so zuverlässig und nutzbar wie möglich zu machen. Wir bitten daher die Teilnehmenden, Quellen anzugeben und andere Dateneinträge zu überprüfen, wo immer dies möglich ist.
            </p>

            <p>
                Informationen zum Datenschutz und zur Datensicherheit finden Sie auf unserer Seite Datenschutz und Sicherheit.
            </p>


            <div className="buttons-container">
                <Link to="sign-up.html" className="btn btn-outline-dark">Zurück zur Registrierung</Link>
            </div>
        </section>
    </article>
);

export default ContributorAgreementPage;
