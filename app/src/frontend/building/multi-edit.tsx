import React from 'react';
import { Link } from 'react-router-dom';

import { useMultiEditData } from '../hooks/use-multi-edit-data';
import ErrorBox from '../components/error-box';
import InfoBox from '../components/info-box';
import { allFieldsConfig } from '../config/data-fields-config';

import DataEntry from './data-components/data-entry';

interface MultiEditProps {
    category: string;
}

const MultiEdit: React.FC<MultiEditProps> = (props) => {
    const [data, error] = useMultiEditData();

    return (
        <section className='data-section'>
            <header className={`section-header view ${props.category} background-${props.category}`}>
                <h2 className="h2">Kopiere Daten</h2>
                {/* <h2 className="h2">Kopiere Daten aus Kategorie: {props.category}</h2> */}
            </header>
            <div className="section-body">
                <form>
                    {
                        error ?
                            <ErrorBox msg={error} /> :
                            <InfoBox msg='Färben Sie Gebäude mit einem Klick ein. Die unten aufgeführten Werte werden dabei für das angeklickte Gebäude gespeichert.' />
                    }
                    {
                        data &&
                        Object.keys(data).map((key => (
                            <DataEntry
                                key={key}
                                title={allFieldsConfig[key]?.title ?? `Unknown field (${key})`}
                                slug={key}
                                disabled={true}
                                value={data[key]}
                            />
                        )))
                    }
                </form>
                <form className='buttons-container'>
                    <Link to={`/view/${props.category}`} className='btn btn-secondary'>Zurück zum Ansichtsmodus</Link>
                    <Link to={`/edit/${props.category}`} className='btn btn-secondary'>Zurück zum Bearbeitungsmodus</Link>
                </form>
            </div>
        </section>
    );
};

export default MultiEdit;
