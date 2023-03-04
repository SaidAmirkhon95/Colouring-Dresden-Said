import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { dateReviver } from '../../helpers';
import { apiGet } from '../apiHelpers';


interface ExtractViewModel {
    extract_id: number;
    extracted_on: Date;
    download_path: string;
}

interface DataExtractsState {
    extracts: ExtractViewModel[];
    latestExtract: ExtractViewModel;
    previousExtracts: ExtractViewModel[];
}

export default class DataExtracts extends React.Component<{}, DataExtractsState> {
    constructor(props) {
        super(props);

        this.state = {
            extracts: undefined,
            latestExtract: undefined,
            previousExtracts: undefined
        };
    }

    async componentDidMount() {
        let data = await apiGet('/api/extracts', { jsonReviver: dateReviver});
        const extracts = (data.extracts as ExtractViewModel[]);

        this.setState({ extracts: extracts, latestExtract: extracts[0], previousExtracts: extracts.slice(1) });
    }

    render() {

        return (
            <article>
                <section className="main-col">
                    <h1 className="h2">Wöchentliche Datenextrakte (als offene Daten)</h1>
                    <p>
                        Die bereits erzeugten Datenextrakte der auf der Plattform "Colouring Dresden" erfassten Gebäudemerkmale sind über die unten stehenden Links herunterladbar.
                    </p>
                    <p>
                        Die erfassten Daten von Colouring Dresden sind offene Daten und stehen unter der offenen Lizenz <a href="http://opendatacommons.org/licenses/odbl/">Open Data Commons Open Database License</a> (ODbL) durch die Colouring Dresden Mitwirkenden.
                    </p>
                    <p>
                        Es steht Ihnen frei, die Daten zu kopieren, zu teilen und anzupassen, solange Sie Colouring Dresden und Mitwirkende nennen. Die Daten dürfen nur unter der selben Lizenz verbreitet werden.
                    </p>
                    <p>
                        Wählen Sie einen der unten stehenden Links aus, um die Daten herunterzuladen.
                    </p>
{/*                     <p>
                    By downloading data extracts from this site, you agree to the <Link to="/data-accuracy.html">data accuracy agreement</Link> and the <Link to="/ordnance-survey-uprn.html">Ordnance Survey terms of UPRN usage</Link>.
                    </p> */}

                    {
                        this.state.extracts == undefined ?
                            <p>Loading extracts...</p> :
                            (
                                this.state.extracts.length === 0 ?
                                    <p>Noch keine Datenextrakte verfügbar.</p> :
                                    null
                            )
                    }
                    {
                        this.state.latestExtract != undefined ?
                            <div>
                                <h1 className="h3">Letztes Extrakt</h1>
                                <ExtractDownloadLink {...this.state.latestExtract} />
                            </div> :
                            null
                    }
                    {
                        this.state.previousExtracts && this.state.previousExtracts.length > 0 ?
                            (<div>
                                <h1 className="h3">Ältere Extrakte</h1>
                                <ul>
                                {
                                    this.state.previousExtracts.map(e =>
                                        <li>
                                            <ExtractDownloadLink {...e} />
                                        </li>
                                    )
                                }
                                </ul>
                            </div>) :
                            null
                    }

                </section>
            </article>
        );
    }
}


const ExtractDownloadLink: FunctionComponent<ExtractViewModel> = (props) => (
    <p><a href={props.download_path}>Extrahiert am {props.extracted_on.toDateString()}</a></p>
);
