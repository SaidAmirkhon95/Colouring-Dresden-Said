import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const DataAccuracyPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Haftungsausschluss</h1>
            <p>
            Die Daten von Colouring Dresden werden "wie gesehen" zur Verfügung gestellt, ohne jegliche ausdrückliche oder stillschweigende Garantie, einschließlich, aber nicht beschränkt auf die Garantie der Marktgängigkeit, der Genauigkeit, der Eignung für einen bestimmten Zweck und der Nichtverletzung von Rechten. Das IÖR ist in keinem Fall haftbar für das Vertrauen, das Sie in die Daten setzen, oder für die Art und Weise, wie Sie die Daten nutzen, noch für Ansprüche, Schäden oder andere Haftungen, ob aus Vertrag, unerlaubter Handlung oder anderweitig, die sich aus den Daten oder der Nutzung oder dem sonstigen Umgang mit den Daten ergeben oder damit in Zusammenhang stehen.
            </p>
            <p>
            Die Daten von Colouring Dresden stammen aus einer Vielzahl von Quellen und können Fehler enthalten. Obwohl wir uns nicht zur Genauigkeit der Daten äußern können, versuchen wir, so viele Merkmale wie möglich einzubeziehen, um den Nutzenden zu helfen, ihre Zuverlässigkeit und Eignung für bestimmte Verwendungszwecke (sei es ein Schulprojekt oder eine wissenschaftliche Arbeit) zu beurteilen. Da Angaben zu den Quellen sehr wichtig sind, werden die Mitwirkenden gebeten, diese hinzuzufügen und die Daten nach Möglichkeit zu überprüfen.
            </p>
        </section>
    </article>
);

export default DataAccuracyPage;
