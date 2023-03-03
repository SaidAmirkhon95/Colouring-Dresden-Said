import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const PrivacyPolicyPage: React.SFC<any> = () => (
    <article>
        <section className='main-col'>
            <h1 className='h1'>Datenschutz & Sicherheit</ h1>
            <h2 className='h2'>Datenschutzerklärung der Colouring Dresden Plattform in Bezug auf personenbezogene Daten</h2>
            <p>
            In dieser Datenschutzerklärung wird erläutert, wie Colouring Dresden die personenbezogenen Daten verwendet, die wir bei der Nutzung unserer Website von Ihnen erheben. Colouring Dresden ist ein Forschungsprojekt. Colouring Dresden ist für Datenschutzzwecke bei der Datenschutzbehörde des Leibniz-Instituts für ökologische Raumentwicklung registriert.
            </p>

            <h2 className='h2'>Welche Daten sammeln wir?</h2>
            <p>
                Colouring Dresden sammelt die folgenden persönlichen Daten:
            </p>
            <p>
            Einen Benutzernamen und optional zum Zwecke eines Passwort-Resets eine E-Mail Adresse. Wir empfehlen Ihnen, nicht Ihren tatsächlichen Namen für Ihren Benutzernamen zu verwenden. Wir erheben auch Ihr Passwort, das als kryptographischer Hash gespeichert wird, der nur für Colouring Dresden gilt.
            </p>

            <h2 className='h2'>Wie sammeln wir Ihre Daten?</h2>
            <p>
                Wenn Sie sich auf der Website registrieren und die Nutzungsbedingungen einschließlich dieser Datenschutzrichtlinie akzeptieren, stellen Sie Colouring Dresden die oben genannten persönlichen Daten zur Verfügung.
            </p>

            <h2 className='h2'>Für welche Zwecke verwenden wir Ihre Daten?</h2>
            <p>
                Colouring Dresden verwendet Ihre persönlichen Daten, um Ihnen den Zugang zum Colouring Dresden Projekt zu ermöglichen und um Ihnen eine personalisierte Benutzererfahrung zu bieten, wenn Sie eingeloggt sind. Wir werden Ihre persönlichen Daten (wie z.B. Ihre E-Mail-Adresse) nicht an Dritte weitergeben oder für andere Zwecke als das Colouring Dresden Projekt verwenden.
            </p>
            <p>
                Wenn Sie eine Passwort-Rücksetzung beantragen, wird eine automatisierte E-Mail mit Hilfe von  <a href="https://www.cleverreach.com/de-de/">CleverReach</a>verschickt, die die E-Mail verarbeitet, um sie an Ihre E-Mail-Adresse zu senden. CleverReach speichert personenbezogene Daten, die sie im Auftrag von Colouring Dresden verarbeiten, so lange, wie es für die Bereitstellung der E-Mail-Dienste erforderlich ist. CleverReach bewahrt die personenbezogenen Daten so lange auf, wie es für die Erfüllung ihrer rechtlichen Verpflichtungen, die Beilegung von Streitigkeiten und die Durchsetzung ihrer Vereinbarungen erforderlich ist.
            </p>

            <h2 className='h2'>Was ist die Rechtsgrundlage für die Verarbeitung Ihrer Daten?</h2>
            <p>
                Die DGSVO verlangt, dass bestimmte Bedingungen erfüllt sein müssen, bevor wir Ihre Daten auf die in dieser Erklärung beschriebene Weise verwenden dürfen, einschließlich einer "Rechtsgrundlage" für die Verarbeitung. Colouring Dresden, als Forschungsprojekt, verarbeitet Ihre personenbezogenen Daten in Verfolgung seiner berechtigten Interessen. Die Rechtsgrundlage hierfür ist <a href="https://dsgvo-gesetz.de/art-6-dsgvo/">Art. 6 Abs. 1 DSGVO</a>.
            </p>

            <h2 className='h2'>Wie speichern wir Ihre Daten?</h2>
            <p>
                Colouring Dresden speichert alle Daten auf einem Server in Deutschland.
            </p>

            <h2 className='h2'>Wie verwenden wir Cookies?</h2>
            <p>
                Colouring Dresden verwendet Cookies nur, um die Benutzerfreundlichkeit der Website zu verbessern, z.B. verwenden wir Cookies, um Sie angemeldet zu halten. Wir verwenden keine Cookies für Marketing- oder Werbezwecke.
            </p>

            <h2 className='h2'>Welche Rechte haben Sie in Bezug auf den Datenschutz?</h2>
            <p>
                Gemäß der gesetzlichen Vorgaben zum Datenschutz haben Sie bestimmte individuelle Rechte in Bezug auf die von uns gespeicherten personenbezogenen Daten. Für Forschungszwecke, bei denen solche individuellen Rechte die Forschungsergebnisse ernsthaft beeinträchtigen würden, sind diese Rechte eingeschränkt. Unter bestimmten Bedingungen haben Sie jedoch die folgenden Rechte in Bezug auf Ihre personenbezogenen Daten:
            </p>

            <ul>
                <li>
                    Ein Recht auf Zugang zu den von uns über Sie gespeicherten personenbezogenen Daten.
                </ li>

                <li>
                    Das Recht, von uns die Berichtigung unrichtiger personenbezogener Daten zu verlangen, die wir über Sie gespeichert haben
                </ li>

                <li>
                    Das Recht, von uns zu verlangen, dass wir die über Sie gespeicherten personenbezogenen Daten löschen. Dieses Recht gilt nur, wenn wir die personenbezogenen Daten nicht mehr benötigen, um den Zweck zu erfüllen, für den wir sie erhoben haben.
                </ li>

                <li>
                    Ein Recht auf Einschränkung der Verarbeitung der von uns über Sie gespeicherten personenbezogenen Daten. Dieses Recht gilt nur, wenn Sie z. B. die Richtigkeit der von uns gespeicherten personenbezogenen Daten bestreiten oder wenn Sie das Recht hätten, von uns die Löschung der personenbezogenen Daten zu verlangen, stattdessen aber eine Einschränkung der Verarbeitung wünschen, oder wenn wir die personenbezogenen Daten nicht mehr zur Erfüllung des Zwecks, für den wir sie erhoben haben, verwenden müssen, die Daten aber für die Bearbeitung von Rechtsansprüchen benötigen.
                </ li>

                <li>
                    Sie haben das Recht, personenbezogene Daten, die Sie uns zur Verfügung gestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Sie haben auch das Recht, von uns zu verlangen, dass diese personenbezogenen Daten an eine andere Organisation übermittelt werden.
                </ li>

                <li>
                    Sie haben das Recht, gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten durch uns Widerspruch einzulegen.
                </ li>

                <li>
                    Sie haben das Recht, Ihre Zustimmung zu widerrufen, wenn wir uns auf diese Zustimmung zur Verwendung Ihrer personenbezogenen Daten stützen.
                </ li>

                <li>
                    Das Recht, von uns zu verlangen, dass wir Informationen über Sie nicht in einer Weise verwenden, die es Computern ermöglicht, Entscheidungen über Sie zu treffen, und uns zu bitten, damit aufzuhören.
                </ li>

            </ul>

            <p>
                Es ist wichtig zu verstehen, dass das Ausmaß, in dem diese Rechte für die Forschung gelten, unterschiedlich ist und dass Ihre Rechte unter bestimmten Umständen eingeschränkt sein können. Wenn Sie uns (über die unten angegebenen Kontaktdaten) mitteilen, dass Sie eines der oben genannten Rechte ausüben möchten, und es für notwendig erachtet wird, die Einhaltung eines Ihrer individuellen Rechte zu verweigern, werden Sie innerhalb eines Monats über die Entscheidung informiert und haben außerdem das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde über unsere Entscheidung zu beschweren.
            </p>

            <p>
                Bitte beachten Sie auch, dass wir einem Antrag auf Ausübung Ihrer Rechte nur während des Zeitraums nachkommen können, in dem wir personenbezogene Daten über Sie gespeichert haben. Wenn diese Informationen unwiderruflich anonymisiert wurden und Teil des Forschungsdatensatzes geworden sind, ist es uns nicht mehr möglich, auf Ihre persönlichen Daten zuzugreifen.
            </p>

            <h2 className='h2'>Wo finde ich Änderungen zu dieser Datenschutzerklärung?</h2>
            <p>
                Änderungen an dieser Datenschutzerklärung werden auf der Website von Colouring Dresden (https://colouring.dresden.ioer.info) bekannt gegeben. Diese Datenschutzrichtlinie wurde zuletzt am 02. März 2023 aktualisiert. 
            </p>

            <h2 className='h2'>An wen kann ich mich mit Fragen wenden?</h2>
            <p>
                Mit Fragen und Anregungen zu Inhalt und technischer Umsetzung der Plattform Colouring Dresden wenden Sie sich bitte an das Projektteam unter colouringdresden@ioer.de oder direkt an Hr. Robert Hecht, 0351/4679248, E-Mail: R.Hecht@ioer.de
            </p>

            <p>
                Verantwortliche Stelle im Sinne der europäischen Datenschutz-Grundverordnung für unsere Datenverarbeitung ist das Leibniz-Institut für ökologische Raumentwicklung e.V. (IÖR), Weberplatz 1, 01217 Dresden, Tel. 0351/46790, Fax 0351/4679212, E-Mail: info@ioer.de, Website: www.ioer.de; Direktor: Univ.-Prof. Dr. Marc Wolfram.
            </p>
            <p>
                Mit Fragen zum Datenschutz und der Wahrnehmung sämtlicher Rechte diesbezüglich, wenden Sie sich bitte an die Datenschutzbeauftragten des IÖR: DID Dresdner Institut für Datenschutz, Herr Prof. Dr. Ralph Wagner, Hospitalstr. 4, 01097 Dresden, 0351/6557220, r.wagner@dids.de oder  an den Datenschutzkoordinator des IÖR, Jörg Hennersdorf, datenschutz@ioer.de.
            </p>
            <p>
                Sollten wir nicht in der Lage sein, Ihre Bedenken bezüglich der Art und Weise, wie wir Ihre Daten verwenden, angemessen zu berücksichtigen, haben Sie gemäß Art. 77 DSGVO das Recht, eine formelle Beschwerde bei der zuständigen Datenschutz-Aufsichtsbehörde einzureichen. Ausführliche Informationen finden Sie auf der Website https://www.saechsdsb.de/.
            </p>

            <h2 className='h2'>Weitere Informationen zum Datenschutz und zur Sicherheit</h2>
            <p>
                Bitte beachten Sie, dass Sie, wenn Sie einen Beitrag zu Colouring Dresden leisten, eine permanente, öffentliche Aufzeichnung aller von Ihnen hinzugefügten, entfernten oder geänderten Daten erstellen. Die Datenbank speichert den Benutzernamen und die ID des Benutzers, der die Änderung vornimmt, sowie die Uhrzeit und das Datum der Änderung. Alle diese Informationen werden auch über die Website und durch Massen-Downloads der Bearbeitungshistorie öffentlich zugänglich gemacht. Die Benutzernamen derjenigen, die die meisten Änderungen vorgenommen haben, werden auch in unsere Ranglisten aufgenommen.
            </p>

            <p>
                Bitte beachten Sie auch, dass Sie, wenn Sie zu Colouring Dresden beitragen, Ihre Beiträge als offene Daten zur Verfügung stellen, die von jedermann kopiert, verbreitet, übertragen und entsprechend der Lizenz angepasst und nach eigenem Ermessen genutzt werden können. Obwohl wir jeden Datentyp sorgfältig prüfen, sind wir für Verbesserungsvorschläge dankbar, um die Privatsphäre und Sicherheit der Gebäudenutzer zu schützen.
            </p>

            <p>
                Die Fortschritte bei den Colouring Dresden-Funktionen, die speziell auf ethische Fragen, einschließlich der Sicherheit und des Datenschutzes, abzielen, können auf unserer GitHub-Seite <a href="https://github.com/colouring-cities/colouring-core/issues/687">#687</a> verfolgt und kommentiert werden. 
            </p>

            <div className="buttons-container">
                <Link to="sign-up.html" className="btn btn-outline-dark">Zurück zur Registrierung</Link>
            </div>
        </section>
    </article>
);

export default PrivacyPolicyPage;
