import React, { Fragment, useState } from 'react'; //useState for the checkbox

import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';

const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const [acceptedConditions, setAcceptedConditions] = useState(false);  //for the checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptedConditions(event.target.checked);}
    return (
        <Fragment>

    {/*<InfoBox>
            Dieser Abschnitt ist noch in der Entwicklung.
        </InfoBox> */}

<NumericDataEntry
                title={dataFields.number_persons.title}
                value={props.building.number_persons}
                slug="number_persons"
                step={1}
                min={1}
                max={30}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

<NumericDataEntry
                title={dataFields.reference_period.title}
                slug="reference_period"
                value={props.building.reference_period}
                tooltip={dataFields.reference_period.tooltip}
                step={1}
                min={1930}
                max={new Date().getFullYear()}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

<NumericDataEntry
                title={dataFields.electricity_usage.title}
                slug="electricity_usage"
                value={props.building.electricity_usage}
                tooltip={dataFields.electricity_usage.tooltip}
                step={1}
                min={0}
                max={30000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

<NumericDataEntry
                title={dataFields.gas_usage.title}
                slug="gas_usage"
                value={props.building.gas_usage}
                tooltip={dataFields.gas_usage.tooltip}
                step={1}
                min={0}
                max={200000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

<NumericDataEntry
                title={dataFields.living_area.title}
                slug="living_area"
                value={props.building.living_area}
                //tooltip={dataFields.living_area.tooltip}
                step={0.01}
                min={5}
                max={1000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
<div style={{ marginTop: '20px' }}>
                <input
                    type="checkbox"
                    id="accept-conditions"
                    checked={acceptedConditions}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="accept-conditions">Ich stimme zu, dass meine Daten zwecks der Verschluesselung, an BuildingTrust gesendet werden.</label>
            </div>
        </Fragment>
    );
    };
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
