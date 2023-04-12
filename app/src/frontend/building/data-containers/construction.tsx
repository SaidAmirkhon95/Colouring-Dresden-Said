import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';

import { CategoryViewProps } from './category-view-props';

const ConstructionMaterialsOptions = [
    'Ziegel',
    'andere Mauersteine: Kalksandstein',
    'andere Mauersteine: Porenbeton',
    'andere Mauersteine: Bruchstein',
    'Stahlbeton',
    'Stahl',
    'Holz',
    'anderes Baumaterial'
];

const RoofCoveringOptions = [
    'Schiefer',
    'Lehmziegel',
    'Holz',
    'Asphalt',
    'Eisen oder Stahl',
    'anderes Metall',
    'anderes natürliches Material',
    'anderes künstliches Material'
];


const currentYear = new Date().getFullYear();

/**
* Construction view/edit section
*/
const ConstructionView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
         <Fragment>




            <SelectDataEntry
                title={dataFields.construction_system_type.title}
                slug="construction_system_type"
                value={props.building.construction_system_type}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.construction_system_type.tooltip}
                placeholder={dataFields.construction_system_type.example}
                options={dataFields.construction_system_type.items}
            />
            <Verification
                slug="construction_system_type"
                allow_verify={props.user !== undefined && props.building.construction_system_type !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_system_type")}
                user_verified_as={props.user_verified.construction_system_type}
                verified_count={props.building.verified.construction_system_type}
            />

            <DataEntry
                title={dataFields.construction_system_type_source.title}
                tooltip={dataFields.construction_system_type_source.tooltip}
                slug="construction_system_type_source"
                value={props.building.construction_system_type_source}
                mode={props.mode}
                /* disabled={true} */
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="construction_system_type_source"
                allow_verify={props.user !== undefined && props.building.construction_system_type_source !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_system_type_source")}
                user_verified_as={props.user_verified.construction_system_type_source}
                verified_count={props.building.verified.construction_system_type_source}
            />







            <SelectDataEntry
                title={dataFields.construction_core_material.title}
                slug="construction_core_material"
                value={props.building.construction_core_material}
                tooltip={dataFields.construction_core_material.tooltip}
                options={ConstructionMaterialsOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="construction_core_material"
                allow_verify={props.user !== undefined && props.building.construction_core_material !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_core_material")}
                user_verified_as={props.user_verified.construction_core_material}
                verified_count={props.building.verified.construction_core_material}
                />
            <SelectDataEntry
                title={dataFields.construction_secondary_materials.title}
                disabled={true}
                slug="construction_secondary_materials"
                value={props.building.construction_secondary_materials}
                tooltip={dataFields.construction_secondary_materials.tooltip}
                options={ConstructionMaterialsOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <SelectDataEntry
                title={dataFields.construction_roof_covering.title}
                slug="construction_roof_covering"
                value={props.building.construction_roof_covering}
                tooltip={dataFields.construction_roof_covering.tooltip}
                options={RoofCoveringOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="construction_roof_covering"
                allow_verify={props.user !== undefined && props.building.construction_roof_covering !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("construction_roof_covering")}
                user_verified_as={props.user_verified.construction_roof_covering}
                verified_count={props.building.verified.construction_roof_covering}
                />
{/*             <DataEntry
                title="Construction system type"
                slug=""
                value=""
                mode='view'
            /> */}





            <SelectDataEntry
                title={dataFields.building_status.title}
                slug="building_status"
                value={props.building.building_status}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.building_status.tooltip}
                placeholder={dataFields.building_status.example}
                options={dataFields.building_status.items}
            />
            <Verification
                slug="building_status"
                allow_verify={props.user !== undefined && props.building.building_status !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("building_status")}
                user_verified_as={props.user_verified.building_status}
                verified_count={props.building.verified.building_status}
            />

            <DataEntry
                title={dataFields.building_status_source.title}
                tooltip={dataFields.building_status_source.tooltip}
                slug="building_status_source"
                value={props.building.building_status_source}
                mode={props.mode}
                /* disabled={true} */
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="building_status_source"
                allow_verify={props.user !== undefined && props.building.building_status_source !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("building_status_source")}
                user_verified_as={props.user_verified.building_status_source}
                verified_count={props.building.verified.building_status_source}
            />







            <NumericDataEntry
                title={dataFields.last_renovation.title}
                slug="last_renovation"
                value={props.building.last_renovation}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={1}
                min={1200}
                max={currentYear}
                tooltip={dataFields.last_renovation.tooltip}
            />
            <Verification
                slug="last_renovation"
                allow_verify={props.user !== undefined && props.building.last_renovation !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("last_renovation")}
                user_verified_as={props.user_verified.last_renovation}
                verified_count={props.building.verified.last_renovation}
            />   

            <DataEntry
                title={dataFields.last_renovation_source.title}
                tooltip={dataFields.last_renovation_source.tooltip}
                slug="last_renovation_source"
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












        </Fragment>
    );
};

const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
