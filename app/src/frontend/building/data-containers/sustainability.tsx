import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import InfoBox from '../../components/info-box';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';

import { CategoryViewProps } from './category-view-props';

const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
        <Fragment>

    {/*<InfoBox>
            Dieser Abschnitt ist noch in der Entwicklung.
        </InfoBox> */}

<NumericDataEntry
                title={dataFields.number_persons.title}
                slug="number_persons"
                step={1}
                min={1}
                max={30}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
<Verification
                slug="number_persons"
                allow_verify={props.user !== undefined && props.building.number_persons !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("number_persons")}
                user_verified_as={props.user_verified.number_persons}
                verified_count={props.building.verified.number_persons}
                />

<NumericDataEntry
                title={dataFields.reference_period.title}
                slug="reference_period"
                //value={props.building.reference_period}
                tooltip={dataFields.reference_period.tooltip}
                step={1}
                min={1930}
                max={new Date().getFullYear()}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
<Verification
                slug="reference_period"
                allow_verify={props.user !== undefined && props.building.reference_period !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("reference_period")}
                user_verified_as={props.user_verified.reference_period}
                verified_count={props.building.verified.reference_period}
                />

<NumericDataEntry
                title={dataFields.electricity_usage.title}
                slug="electricity_usage"
                //value={props.building.electricity_usage}
                tooltip={dataFields.electricity_usage.tooltip}
                step={1}
                min={0}
                max={30000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
<Verification
                slug="electricity_usage"
                allow_verify={props.user !== undefined && props.building.electricity_usage !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("electricity_usage")}
                user_verified_as={props.user_verified.electricity_usage}
                verified_count={props.building.verified.electricity_usage}
                />

<NumericDataEntry
                title={dataFields.gas_usage.title}
                slug="gas_usage"
                //value={props.building.gas_usage}
                tooltip={dataFields.gas_usage.tooltip}
                step={1}
                min={0}
                max={200000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
<Verification
                slug="gas_usage"
                allow_verify={props.user !== undefined && props.building.gas_usage !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("gas_usage")}
                user_verified_as={props.user_verified.gas_usage}
                verified_count={props.building.verified.gas_usage}
                />

<NumericDataEntry
                title={dataFields.living_area.title}
                slug="living_area"
                //value={props.building.living_area}
                //tooltip={dataFields.living_area.tooltip}
                step={0.01}
                min={5}
                max={1000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
<Verification
                slug="living_area"
                allow_verify={props.user !== undefined && props.building.living_area !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("living_area")}
                user_verified_as={props.user_verified.living_area}
                verified_count={props.building.verified.living_area}
                />
{/*
          
            <SelectDataEntry
                title={dataFields.sust_breeam_rating.title}
                slug="sust_breeam_rating"
                value={props.building.sust_breeam_rating}
                tooltip={dataFields.sust_breeam_rating.tooltip}
                options={BreeamRatingOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="sust_breeam_rating"
                allow_verify={props.user !== undefined && props.building.sust_breeam_rating !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("sust_breeam_rating")}
                user_verified_as={props.user_verified.sust_breeam_rating}
                verified_count={props.building.verified.sust_breeam_rating}
                />

            <SelectDataEntry
                title={dataFields.sust_dec.title}
                slug="sust_dec"
                value={props.building.sust_dec}
                tooltip={dataFields.sust_dec.tooltip}
                options={EnergyCategoryOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="sust_dec"
                allow_verify={props.user !== undefined && props.building.sust_dec !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("sust_dec")}
                user_verified_as={props.user_verified.sust_dec}
                verified_count={props.building.verified.sust_dec}
                />

            <SelectDataEntry
                title={dataFields.sust_aggregate_estimate_epc.title}
                slug="sust_aggregate_estimate_epc"
                value={props.building.sust_aggregate_estimate_epc}
                tooltip={dataFields.sust_aggregate_estimate_epc.tooltip}
                options={EnergyCategoryOptions}
                disabled={true}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

            <NumericDataEntry
                title={dataFields.sust_retrofit_date.title}
                slug="sust_retrofit_date"
                value={props.building.sust_retrofit_date}
                tooltip={dataFields.sust_retrofit_date.tooltip}
                step={1}
                min={1086}
                max={new Date().getFullYear()}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="sust_retrofit_date"
                allow_verify={props.user !== undefined && props.building.sust_retrofit_date !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("sust_retrofit_date")}
                user_verified_as={props.user_verified.sust_retrofit_date}
                verified_count={props.building.verified.sust_retrofit_date}
                />
            <DataEntry
                title="Date of Significant Retrofits"
                slug=""
                value=""
                mode='view'
            />
            <Verification
                slug="date_link"
                allow_verify={props.user !== undefined && props.building.date_link !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("date_link")}
                user_verified_as={props.user_verified.date_link}
                verified_count={props.building.verified.date_link}
                />
            <DataEntry
                title="Source"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Green Walls / Green Roof / Shading"
                slug=""
                value=""
                mode='view'
            /> */}
        </Fragment>
    );
    };
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
