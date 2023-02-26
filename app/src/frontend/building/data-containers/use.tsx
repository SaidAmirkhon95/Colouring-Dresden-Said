import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import TextboxDataEntry from '../data-components/textbox-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import Verification from '../data-components/verification';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { DataEntryGroup } from '../data-components/data-entry-group';

/**
 * Use view/edit section
 */
const UseView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToIsDomesticMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('is_domestic')
    }
    const { darkLightTheme } = useDisplayPreferences();
      return (
        <Fragment>
            <DataEntryGroup name="Hauptnutzung des Gebäudes" collapsed={false} >
                
                {/* is_domestic */}
                <SelectDataEntry
                    title={dataFields.is_domestic.title}
                    slug="is_domestic"
                    value={props.building.is_domestic}
                    options={["Wohngebäude", "Nichtwohngebäude", "gemischte Nutzung"]}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.is_domestic.tooltip}
                />
                <Verification
                    slug="is_domestic"
                    allow_verify={props.user !== undefined && props.building.is_domestic !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("is_domestic")}
                    user_verified_as={props.user_verified.is_domestic}
                    verified_count={props.building.verified.is_domestic}
                />
                {/* use_building_origin */}



                <SelectDataEntry
                    title={dataFields.use_building_origin.title}
                    slug="use_building_origin"
                    value={props.building.use_building_origin}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.use_building_origin.tooltip}
                    placeholder={dataFields.use_building_origin.example}
                    options={dataFields.use_building_origin.items}
                />
                <Verification
                    slug="use_building_origin"
                    allow_verify={props.user !== undefined && props.building.use_building_origin !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("use_building_origin")}
                    user_verified_as={props.user_verified.use_building_origin}
                    verified_count={props.building.verified.use_building_origin}
                />


                {/* use_building_origin_text */}
                <DataEntry
                    title={dataFields.use_building_origin_text.title}
                    tooltip={dataFields.use_building_origin_text.tooltip}
                    slug="use_building_origin_text"
                    value={props.building.use_building_origin_text}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="use_building_origin_text"
                    allow_verify={props.user !== undefined && props.building.use_building_origin_text !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("use_building_origin_text")}
                    user_verified_as={props.user_verified.use_building_origin_text}
                    verified_count={props.building.verified.use_building_origin_text}
                />



                {/* use_building_current */}

                {/* in future: MultiDataEntry with options */}


                <SelectDataEntry
                    title={dataFields.use_building_current.title}
                    slug="use_building_current"
                    value={props.building.use_building_current}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.use_building_current.tooltip}
                    placeholder={dataFields.use_building_current.example}
                    options={dataFields.use_building_current.items}
                />
                <Verification
                    slug="use_building_current"
                    allow_verify={props.user !== undefined && props.building.use_building_current !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("use_building_current")}
                    user_verified_as={props.user_verified.use_building_current}
                    verified_count={props.building.verified.use_building_current}
                />


                {/* use_building_current_text */}
                <DataEntry
                    title={dataFields.use_building_current_text.title}
                    tooltip={dataFields.use_building_current_text.tooltip}
                    slug="use_building_current_text"
                    value={props.building.use_building_current_text}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="use_building_current_text"
                    allow_verify={props.user !== undefined && props.building.use_building_current_text !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("use_building_current_text")}
                    user_verified_as={props.user_verified.use_building_current_text}
                    verified_count={props.building.verified.use_building_current_text}
                />

            </DataEntryGroup>
        

            <DataEntryGroup name="Geschossnutzung" collapsed={false} >

                <DataEntryGroup name="Unterkellerung" collapsed={false} >

                    <SelectDataEntry
                        title={dataFields.basement_type.title}
                        slug="basement_type"
                        value={props.building.basement_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.basement_type.tooltip}
                        placeholder={dataFields.basement_type.example}
                        options={dataFields.basement_type.items}
                    />
                    <Verification
                        slug="basement_type"
                        allow_verify={props.user !== undefined && props.building.basement_type !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("basement_type")}
                        user_verified_as={props.user_verified.basement_type}
                        verified_count={props.building.verified.basement_type}
                    />


                    <NumericDataEntry
                        title={dataFields.basement_percentage.title}
                        slug="basement_percentage"
                        value={props.building.basement_percentage}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        step={1}
                        min={1}
                        tooltip={dataFields.basement_percentage.tooltip}
                    />
                    <Verification
                        slug="basement_percentage"
                        allow_verify={props.user !== undefined && props.building.basement_percentage !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("basement_percentage")}
                        user_verified_as={props.user_verified.basement_percentage}
                        verified_count={props.building.verified.basement_percentage}
                    />               


                    <SelectDataEntry
                        title={dataFields.basement_use.title}
                        slug="basement_use"
                        value={props.building.basement_use}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.basement_use.tooltip}
                        placeholder={dataFields.basement_use.example}
                        options={dataFields.basement_use.items}
                    />
                    <Verification
                        slug="basement_use"
                        allow_verify={props.user !== undefined && props.building.basement_use !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("basement_use")}
                        user_verified_as={props.user_verified.basement_use}
                        verified_count={props.building.verified.basement_use}
                    />

                    <DataEntry
                        title={dataFields.basement_use_source.title}
                        tooltip={dataFields.basement_use_source.tooltip}
                        slug="basement_use_source"
                        value={props.building.basement_use_source}
                        mode={props.mode}
                        disabled={true}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="basement_use_source"
                        allow_verify={props.user !== undefined && props.building.basement_use_source !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("basement_use_source")}
                        user_verified_as={props.user_verified.basement_use_source}
                        verified_count={props.building.verified.basement_use_source}
                    />


                </DataEntryGroup>


                <SelectDataEntry
                    title={dataFields.ground_storey_use.title}
                    slug="ground_storey_use"
                    value={props.building.ground_storey_use}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.ground_storey_use.tooltip}
                    placeholder={dataFields.ground_storey_use.example}
                    options={dataFields.ground_storey_use.items}
                />
                <Verification
                    slug="ground_storey_use"
                    allow_verify={props.user !== undefined && props.building.ground_storey_use !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("ground_storey_use")}
                    user_verified_as={props.user_verified.ground_storey_use}
                    verified_count={props.building.verified.ground_storey_use}
                />

                <DataEntry
                    title={dataFields.ground_storey_use_source.title}
                    tooltip={dataFields.ground_storey_use_source.tooltip}
                    slug="ground_storey_use_source"
                    value={props.building.ground_storey_use_source}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="ground_storey_use_source"
                    allow_verify={props.user !== undefined && props.building.ground_storey_use_source !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("ground_storey_use_source")}
                    user_verified_as={props.user_verified.ground_storey_use_source}
                    verified_count={props.building.verified.ground_storey_use_source}
                />





                <SelectDataEntry
                    title={dataFields.upper_storeys_use.title}
                    slug="upper_storeys_use"
                    value={props.building.upper_storeys_use}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.upper_storeys_use.tooltip}
                    placeholder={dataFields.upper_storeys_use.example}
                    options={dataFields.upper_storeys_use.items}
                />
                <Verification
                    slug="upper_storeys_use"
                    allow_verify={props.user !== undefined && props.building.upper_storeys_use !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("upper_storeys_use")}
                    user_verified_as={props.user_verified.upper_storeys_use}
                    verified_count={props.building.verified.upper_storeys_use}
                />

                <DataEntry
                    title={dataFields.upper_storeys_use_source.title}
                    tooltip={dataFields.upper_storeys_use_source.tooltip}
                    slug="upper_storeys_use_source"
                    value={props.building.upper_storeys_use_source}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="upper_storeys_use_source"
                    allow_verify={props.user !== undefined && props.building.upper_storeys_use_source !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("upper_storeys_use_source")}
                    user_verified_as={props.user_verified.upper_storeys_use_source}
                    verified_count={props.building.verified.upper_storeys_use_source}
                />

            </DataEntryGroup>



            <DataEntryGroup name="Nutzungsintensität des Gebäudes" collapsed={false} >


                <NumericDataEntry
                    title={dataFields.use_number_residential_units.title}
                    slug="use_number_residential_units"
                    value={props.building.use_number_residential_units}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    tooltip={dataFields.use_number_residential_units.tooltip}
                />
                <Verification
                    slug="use_number_residential_units"
                    allow_verify={props.user !== undefined && props.building.use_number_residential_units !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("use_number_residential_units")}
                    user_verified_as={props.user_verified.use_number_residential_units}
                    verified_count={props.building.verified.use_number_residential_units}
                />          


                <NumericDataEntry
                    title={dataFields.use_number_businesses.title}
                    slug="use_number_businesses"
                    value={props.building.use_number_businesses}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    tooltip={dataFields.use_number_businesses.tooltip}
                />
                <Verification
                    slug="use_number_businesses"
                    allow_verify={props.user !== undefined && props.building.use_number_businesses !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("use_number_businesses")}
                    user_verified_as={props.user_verified.use_number_businesses}
                    verified_count={props.building.verified.use_number_businesses}
                />              

            </DataEntryGroup>


































{/*               Arbeit von zuhause aus ("Home Office") zählt nicht als Büronutzung und macht das Gebäude nicht zu einem Nichtwohngebäude. */}

{/*               <button className={`map-switcher-inline ${props.mapColourScale == "is_domestic" ? "enabled-state" : "disabled-state"} btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToIsDomesticMapStyle}>
                    {(props.mapColourScale == "is_domestic")? 'Showing domestic status for specific buildings' : 'Click to see domestic status for specific buildings mapped'}
                </button> */}


{/* 
              <InfoBox msg="93% of properties in UK are dwellings so we have set this as the default colour. Can you help us colour-in all non-residential and mixed use buildings, and verify residential buildings too?"></InfoBox>

 */}              
{/*               <MultiDataEntry
                  title={dataFields.current_landuse_group.title}
                  slug="current_landuse_group"
                  value={props.building.current_landuse_group}
                  mode={props.mode}
                  copy={props.copy}
                  onChange={props.onChange}
                  confirmOnEnter={true}
                  tooltip={dataFields.current_landuse_group.tooltip}
                  placeholder="Hier aktuelle Gebäudenutzung (Gruppe) angeben"
                  copyable={true}
                  autofill={true}
                  showAllOptionsOnEmpty={true}
              />
              <Verification
                  slug="current_landuse_group"
                  allow_verify={props.user !== undefined && props.building.current_landuse_group !== null && !props.edited}
                  onVerify={props.onVerify}
                  user_verified={props.user_verified.hasOwnProperty("current_landuse_group")}
                  user_verified_as={props.user_verified.current_landuse_group && props.user_verified.current_landuse_group.join(", ")}
                  verified_count={props.building.verified.current_landuse_group}
                  /> */}
{/*               {
                  props.mode != 'view' &&
                  <InfoBox msg="Land use order, shown below, is automatically derived from the land use groups"></InfoBox>
              } */}
{/*               <DataEntry
                  title={dataFields.current_landuse_order.title}
                  tooltip={dataFields.current_landuse_order.tooltip}
                  slug="current_landuse_order"
                  value={props.building.current_landuse_order}
                  mode={props.mode}
                  disabled={true}
                  copy={props.copy}
                  onChange={props.onChange}
              />
              <SelectDataEntry
                  title={dataFields.current_landuse_source.title}
                  slug="current_landuse_source"
                  value={props.building.current_landuse_source}
                  mode={props.mode}
                  copy={props.copy}
                  onChange={props.onChange}
                  tooltip={dataFields.current_landuse_source.tooltip}
                  placeholder={dataFields.current_landuse_source.example}
                  options={dataFields.current_landuse_source.items}
                  />
              <Verification
                  slug="current_landuse_source"
                  allow_verify={props.user !== undefined && props.building.current_landuse_source !== null && !props.edited}
                  onVerify={props.onVerify}
                  user_verified={props.user_verified.hasOwnProperty("current_landuse_source")}
                  user_verified_as={props.user_verified.current_landuse_source}
                  verified_count={props.building.verified.current_landuse_source}
                  />
        {(props.building.current_landuse_source == "Expert/personal knowledge of building" ||
            props.building.current_landuse_source == "Online streetview image" ||
            props.building.current_landuse_source == null) ? <></> :
            <><MultiDataEntry
                title={dataFields.current_landuse_link.title}
                slug="current_landuse_link"
                value={props.building.current_landuse_link}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.current_landuse_link.tooltip}
                placeholder="https://..."
                editableEntries={true}
                isUrl={true}
                />
            <Verification
                slug="current_landuse_link"
                allow_verify={props.user !== undefined && props.building.current_landuse_link !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("current_landuse_link")}
                user_verified_as={props.user_verified.current_landuse_link}
                verified_count={props.building.verified.current_landuse_link}
                />
            </>
        } */}
        </Fragment>
      );
};
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
