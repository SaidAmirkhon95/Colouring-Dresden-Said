import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const DeclarationOfAccessibilityPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h1">Erklärung zur Barrierefreiheit</h1>
            <p>
            Das Leibniz-Institut für ökologische Raumentwicklung  ist bemüht, seine Webseiten und seine mobilen Anwendungen in Übereinstimmung mit Sächsischem Inklusionsgesetz (SächsInklusG) und Barrierefreie-Websites-Gesetz (BfWebG) in Verbindung mit der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) barrierefrei zugänglich zu machen. Das BfWebG wird ergänzt durch die Barrierefreie-Websites-Verordnung (BfWebVO). Diese Gesetze sind im Einklang mit der Richtlinie (EU) 2016/2102 verfasst.
            </p>
            <p>
            Diese Erklärung zur Barrierefreiheit gilt für die mobile Webanwendung
            </p>
            <p>
                <b>Plattform Colouring Dresden </b>
            </p>
            <p>
                <b>URL: </b>https://colouring.dresden.ioer.de/
            </p>

            <h1 className="h2">Stand der Barrierefreiheit</h1>
            <p>
            Grundlage der Barrierefreiheit sind die international gültigen Web Content Accessibility Guidelines (WCAG 2.1) auf Konformitätsstufe AA und die europäische Norm EN 301 549, Version 3.2.1. Für PDF-Dokumente wird zusätzlich der internationale Standard PDF/UA-1 beachtet.
            </p>

            <p>
            Die mobile Webanwendung ist nach den oben genannten Richtlinien nur teilweise barrierefrei.
            </p>
            <p>
            Die Plattform Colouring Dresden ist Bestandteil des Colouring Cities Research Programme (CCRP) <a href="https://www.pages.colouring.london/colouring-cities" target="_blank">https://www.pages.colouring.london/colouring-cities</a>, das 2020 vom Alan Turing Institut in England eingerichtet wurde.
            </p>
            <p>
            Design und Aufbau der mobilen Webanwendung werden gemeinsam mit dem internationalen Forschungsnetzwerk CCRP abgestimmt und weiterentwickelt. Dadurch können nur bedingt deutsche Standards erfüllt werden.
            </p>
            <h1 className="h2">Nicht barrierefreie Inhalte</h1>
            <p>
            Kartenbedienung ist nur teilweise über Tastatur möglich
            </p>
            <p>
            Einige Farbkontraste entsprechen nur teilweise dem deutschen Standard
            </p>
            <p>
            Schaltflächen haben nur teilweise erklärende Bezeichnungen
            </p>
            <h1 className="h2">Erstellung der Erklärung</h1>
            <p>
            Diese Erklärung wurde am 06.03. 2023 erstellt.
            Den Stand der Barrierefreiheit ermitteln wir kontinuierlich durch eigene Prüfung, nächste Prüfung im Dezember 2023.

            </p>
            <h1 className="h2">Feedback und Kontaktangaben</h1>
            <p>
            Wenn Sie Informationen zu nicht barrierefreien Inhalten benötigen oder wenn Ihnen Mängel zur Barrierefreiheit an der mobilen Webanwendung auffallen, wenden Sie sich unbedingt an uns: barrierefreiheit@ioer.de
            </p>
            <p>
            Wir werden versuchen, die mitgeteilten Mängel zu beseitigen bzw. Ihnen nicht zugängliche Informationen in barrierefreier Form zur Verfügung zu stellen.
            </p>
            <h1 className="h2">Durchsetzungsverfahren</h1>
            <p>
            Sie haben unter oben genanntem Kontakt eine Anfrage zur Barrierefreiheit unseren Webseiten und mobilen Anwendungen gestellt. Falls dabei innerhalb einer angemessenen Frist (in der Regel vier Wochen) keine zufriedenstellende Lösung gefunden wird, können Sie sich an die für das Durchsetzungsverfahren zuständige Geschäftsstelle des Landesbeauftragten für Inklusion der Menschen mit Behinderungen (Durchsetzungsstelle) bei der Sächsischen Staatskanzlei wenden. Die Durchsetzungsstelle unterstützt eine außergerichtliche Streitbeilegung, wenn Konflikte zwischen öffentlichen Stellen in Sachsen und Nutzenden der Webseiten bzw. mobilen Anwendungen auftreten. Dieses Schlichtungsverfahren ist kostenlos. Die Einschaltung eines Rechtsbeistands ist nicht erforderlich.
            </p>
            <p>
            Kontakt:<br />
Sächsische Staatskanzlei<br />
Geschäftsstelle des Landesbeauftragten für Inklusion der Menschen mit Behinderungen<br />
Durchsetzungsstelle<br />
Archivstraße 1<br />
01097 Dresden<br />
Telefon: 0351 564 10713<br />
Fax: 0351 564 10999<br />
E-Mail: durchsetzungsstelle@sk.sachsen.de<br />
Webseite: <a href="https://www.durchsetzungsstelle.sachsen.de" target="_blank">https://www.durchsetzungsstelle.sachsen.de</a><br />

            </p>



        </section>
    </article>
);

export default DeclarationOfAccessibilityPage;
