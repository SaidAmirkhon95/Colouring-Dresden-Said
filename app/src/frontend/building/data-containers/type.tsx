import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

const AttachmentFormOptions = [
    "freistehend",
    "Doppelhaushälfte",
    "Häuserreihe (Ende)",
    "Häuserreihe (innerhalb)"
];

/**
* Type view/edit section
*/
const TypeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
        <Fragment>
{/*             <DataEntry
                title="Base type classification"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Local typology/architectural style"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title={dataFields.original_building_use.title}
                slug="original_building_use" // doesn't exist in database yet
                tooltip={dataFields.original_building_use.tooltip}
                value={undefined}
                copy={props.copy}
                mode={props.mode}
                onChange={props.onChange}
                disabled={true}
            /> */}


            <SelectDataEntry
                title={dataFields.size_roof_shape.title}
                slug="size_roof_shape"
                value={props.building.size_roof_shape}
                tooltip={dataFields.size_roof_shape.tooltip}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                /* disabled={true} */
                options={dataFields.size_roof_shape.items}
            />

            <Verification
                slug="size_roof_shape"
                allow_verify={props.user !== undefined && props.building.size_roof_shape !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_roof_shape")}
                user_verified_as={props.user_verified.size_roof_shape}
                verified_count={props.building.verified.size_roof_shape}
            />   

            <DataEntry
                title={dataFields.size_roof_shape_source.title}
                tooltip={dataFields.size_roof_shape_source.tooltip}
                slug="size_roof_shape_source"
                value={props.building.last_renovation_source}
                mode={props.mode}
                /* disabled={true} */
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="last_renovation_source"
                allow_verify={props.user !== undefined && props.building.last_renovation_source !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("last_renovation_source")}
                user_verified_as={props.user_verified.last_renovation_source}
                verified_count={props.building.verified.last_renovation_source}
            />










            <SelectDataEntry
                title={dataFields.building_attachment_form.title}
                slug="building_attachment_form"
                value={props.building.building_attachment_form}
                tooltip={dataFields.building_attachment_form.tooltip}
                options={AttachmentFormOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="building_attachment_form"
                allow_verify={props.user !== undefined && props.building.building_attachment_form !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("building_attachment_form")}
                user_verified_as={props.user_verified.building_attachment_form}
                verified_count={props.building.verified.building_attachment_form}
            />



            <SelectDataEntry
                title={dataFields.building_owner.title}
                slug="building_owner"
                value={props.building.building_owner}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.building_owner.tooltip}
                placeholder={dataFields.building_owner.example}
                options={dataFields.building_owner.items}
            />
            <Verification
                slug="building_owner"
                allow_verify={props.user !== undefined && props.building.building_owner !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("building_owner")}
                user_verified_as={props.user_verified.building_owner}
                verified_count={props.building.verified.building_owner}
            />

            <DataEntry
                title={dataFields.building_owner_source.title}
                tooltip={dataFields.building_owner_source.tooltip}
                slug="building_owner_source"
                value={props.building.building_owner_source}
                mode={props.mode}
                /* disabled={true} */
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="building_owner_source"
                allow_verify={props.user !== undefined && props.building.building_owner_source !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("building_owner_source")}
                user_verified_as={props.user_verified.building_owner_source}
                verified_count={props.building.verified.building_owner_source}
            />









{/*             <DataEntry
                title="Local typology mutations"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="3D procedural model classifications"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Dynamic tissue type classification"
                slug=""
                value=""
                mode='view'
            /> */}
            {/* <NumericDataEntry
                title={dataFields.date_change_building_use.title}
                slug="date_change_building_use"
                value={props.building.date_change_building_use}
                tooltip={dataFields.date_change_building_use.tooltip}
                min={1086}
                max={new Date().getFullYear()}
                step={1}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            /> */}
        </Fragment>
    );
    };
const TypeContainer = withCopyEdit(TypeView);

export default TypeContainer;
