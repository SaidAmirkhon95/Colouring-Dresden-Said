import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';


import { CategoryViewProps } from './category-view-props';

const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
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

        </Fragment>
    );
    };
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
