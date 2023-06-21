import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/info-box';

import { Category } from '../../config/categories-config';
import { dataFields } from '../../config/data-fields-config';

import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { DynamicsBuildingPane, DynamicsDataEntry } from './dynamics/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';

import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';


import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';

import { MultiSelectDataEntry } from '../data-components/multi-select-data-entry';

import { DynamicsBuildingPaneThermalStressObjective, DynamicsDataEntryThermalStressObjective } from './dynamics/dynamics-data-entry-thermal-stress-objective';
import { DynamicsBuildingPaneThermalStressSubjective, DynamicsDataEntryThermalStressSubjective } from './dynamics/dynamics-data-entry-thermal-stress-subjective';
import { DynamicsBuildingPaneRainFloodHistoricIncidents, DynamicsDataEntryRainFloodHistoricIncidents } from './dynamics/dynamics-data-entry-rain-flood-historic-incidents';


import './resilience.css';
/**
* Dynamics view/edit section
*/
const ResilienceView: React.FunctionComponent<CategoryViewProps> = (props) => {
    

    return (<>
{/*         <InfoBox>
            X X X X Platzhalter für einen kurzen Einführungstext, welcher noch eingefügt wird X X X X
        </InfoBox> */}


        <DataEntryGroup name="Hitze" collapsed={false} >

            <DataEntryGroup name="Fassaden- und Dachmerkmale" collapsed={false} >

                <SelectDataEntry
                    title={dataFields.roof_colour.title}
                    slug="roof_colour"
                    value={props.building.roof_colour}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.roof_colour.tooltip}
                    placeholder={dataFields.roof_colour.example}
                    options={dataFields.roof_colour.items}
                />
                <Verification
                    slug="roof_colour"
                    allow_verify={props.user !== undefined && props.building.roof_colour !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("roof_colour")}
                    user_verified_as={props.user_verified.roof_colour}
                    verified_count={props.building.verified.roof_colour}
                />

                <SelectDataEntry
                    title={dataFields.roof_colour_type.title}
                    slug="roof_colour_type"
                    value={props.building.roof_colour_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.roof_colour_type.tooltip}
                    placeholder={dataFields.roof_colour_type.example}
                    options={dataFields.roof_colour_type.items}
                />
                <Verification
                    slug="roof_colour_type"
                    allow_verify={props.user !== undefined && props.building.roof_colour_type !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("roof_colour_type")}
                    user_verified_as={props.user_verified.roof_colour_type}
                    verified_count={props.building.verified.roof_colour_type}
                />

                <SelectDataEntry
                    title={dataFields.facade_colour.title}
                    slug="facade_colour"
                    value={props.building.facade_colour}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.facade_colour.tooltip}
                    placeholder={dataFields.facade_colour.example}
                    options={dataFields.facade_colour.items}
                />
                <Verification
                    slug="facade_colour"
                    allow_verify={props.user !== undefined && props.building.facade_colour !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("facade_colour")}
                    user_verified_as={props.user_verified.facade_colour}
                    verified_count={props.building.verified.facade_colour}
                />

                {/* entry for facade window percentage */}
                <SelectDataEntry
                    title={dataFields.facade_window_percentage.title}
                    slug="facade_window_percentage"
                    value={props.building.facade_window_percentage}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.facade_window_percentage.tooltip}
                    placeholder={dataFields.facade_window_percentage.example}
                    options={dataFields.facade_window_percentage.items}
                />
                <Verification
                    slug="facade_window_percentage"
                    allow_verify={props.user !== undefined && props.building.facade_window_percentage !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("facade_window_percentage")}
                    user_verified_as={props.user_verified.facade_window_percentage}
                    verified_count={props.building.verified.facade_window_percentage}
                />



                {/* checkbox entry for multiple data entry, here: direction of windows */}
                {/* div Container for CSS styles for columns of checkboxes */}
                <div className='div-direction_of_windows'>
                <MultiSelectDataEntry
                    slug='direction_of_windows'
                    title={dataFields.direction_of_windows.title}
                    value={props.building.direction_of_windows}
                    disabled={false}
                    /* disabled={!props.building.community_type_worth_keeping} */
                    onChange={props.onSaveChange}
                    options={
                        Object.entries(dataFields.direction_of_windows.fields)
                        .map(([key, definition]) => ({
                            key,
                            label: definition.title
                        }))
                    }
                    
                    mode={props.mode}
                />
                </div>



            </DataEntryGroup>

            <DataEntryGroup name="Hitzebelastung" collapsed={false} >
            <div className='div-data-title-bold'>

            <>
                <DynamicsDataEntryThermalStressObjective
                                                
                    /* 
                        Will clear the edits and new record data upon navigating to another building.
                        Should get a better way to do this, plus a way to actually keep unsaved edits.
                    */
                    key={props.building.building_id} 
                    
                    value={props.building.thermal_stress_objective}
                    editableEntries={true}
                    slug='thermal_stress_objective'
                    title={dataFields.thermal_stress_objective.title}
                    mode={props.mode}
                    onChange={props.onChange}
                    onSaveAdd={props.onSaveAdd}
                    hasEdits={props.edited}

                />
                {
                    props.mode === 'view' &&
                        <InfoBox>Bitte in den Bearbeitungsmodus wechseln um Daten bearbeiten / hinzufügen zu können</InfoBox>
                }

            </>
            <>

                <DynamicsDataEntryThermalStressSubjective
                    
                    /* 
                        Will clear the edits and new record data upon navigating to another building.
                        Should get a better way to do this, plus a way to actually keep unsaved edits.
                    */
                    key={props.building.building_id} 
                    
                    value={props.building.thermal_stress_subjective}
                    editableEntries={true}
                    slug='thermal_stress_subjective'
                    title={dataFields.thermal_stress_subjective.title}
                    mode={props.mode}
                    onChange={props.onChange}
                    onSaveAdd={props.onSaveAdd}
                    hasEdits={props.edited}

                />
                {
                    props.mode === 'view' &&
                        <InfoBox>Bitte in den Bearbeitungsmodus wechseln um Daten bearbeiten / hinzufügen zu können</InfoBox>
                }

            </>
            </div>
            </DataEntryGroup>

            <DataEntryGroup name="Anpassungsmaßnahmen" collapsed={false} >




                {/* checkbox entry for multiple data entry, here: heat_adaption_measure */}
                <div className='div-heat_adaption_measure'>
                <MultiSelectDataEntry
                    slug='heat_adaption_measure'
                    title={dataFields.heat_adaption_measure.title}
                    value={props.building.heat_adaption_measure}
                    disabled={false}
                    /* disabled={!props.building.community_type_worth_keeping} */
                    onChange={props.onSaveChange}
                    options={
                        Object.entries(dataFields.heat_adaption_measure.fields)
                        .map(([key, definition]) => ({
                            key,
                            label: definition.title
                        }))
                    }
                    
                    mode={props.mode}
                />
                </div>
                <SelectDataEntry
                    title={dataFields.heat_adaption_measure_source.title}
                    slug="heat_adaption_measure_source"
                    value={props.building.heat_adaption_measure_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.heat_adaption_measure_source.tooltip}
                    placeholder={dataFields.heat_adaption_measure_source.example}
                    options={dataFields.heat_adaption_measure_source.items}
                />
                <Verification
                    slug="heat_adaption_measure_source"
                    allow_verify={props.user !== undefined && props.building.heat_adaption_measure_source !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("heat_adaption_measure_source")}
                    user_verified_as={props.user_verified.heat_adaption_measure_source}
                    verified_count={props.building.verified.heat_adaption_measure_source}
                />
            </DataEntryGroup>




        </DataEntryGroup>
        <DataEntryGroup name="Starkregen / Hochwasser" collapsed={false} >

            <DataEntryGroup name="Geländeanbindung" collapsed={false} >

                <SelectDataEntry
                    title={dataFields.terrain_connection_yesno.title}
                    slug="terrain_connection_yesno"
                    value={props.building.terrain_connection_yesno}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.terrain_connection_yesno.tooltip}
                    placeholder={dataFields.terrain_connection_yesno.example}
                    options={dataFields.terrain_connection_yesno.items}
                />
                <Verification
                    slug="terrain_connection_yesno"
                    allow_verify={props.user !== undefined && props.building.terrain_connection_yesno !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("terrain_connection_yesno")}
                    user_verified_as={props.user_verified.terrain_connection_yesno}
                    verified_count={props.building.verified.terrain_connection_yesno}
                />

                {/* hide or show this builidng feature by condition */}
                {(props.building.terrain_connection_yesno === "höher" || props.building.terrain_connection_yesno === "niedriger") ?
                <>
                    <NumericDataEntry
                        title={dataFields.terrain_connection_difference.title}
                        slug="terrain_connection_difference"
                        value={props.building.terrain_connection_difference}
                        mode={props.mode}
                        copy={props.copy}
                        tooltip={dataFields.terrain_connection_difference.tooltip}
                        onChange={props.onChange}
                        step={1}
                        min={0}
                    />
                    <Verification
                        slug="terrain_connection_difference"
                        allow_verify={props.user !== undefined && props.building.terrain_connection_difference !== null}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("terrain_connection_difference")}
                        user_verified_as={props.user_verified.terrain_connection_difference}
                        verified_count={props.building.verified.terrain_connection_difference}
                    />

                    <SelectDataEntry
                        title={dataFields.terrain_connection_difference_source.title}
                        slug="terrain_connection_difference_source"
                        value={props.building.terrain_connection_difference_source}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.terrain_connection_difference_source.tooltip}
                        placeholder={dataFields.terrain_connection_difference_source.example}
                        options={dataFields.terrain_connection_difference_source.items}
                    />
                    <Verification
                        slug="terrain_connection_difference_source"
                        allow_verify={props.user !== undefined && props.building.terrain_connection_difference_source !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("terrain_connection_difference_source")}
                        user_verified_as={props.user_verified.terrain_connection_difference_source}
                        verified_count={props.building.verified.terrain_connection_difference_source}
                    />
                    </>
                    : 
                        <></>
                    }

            </DataEntryGroup>

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
                    min={0}
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
                    /* disabled={true} */
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
            <DataEntryGroup name="Historische Betroffenheit" collapsed={false} >
            <div className='div-data-title-bold'>
            <>

                <DynamicsDataEntryRainFloodHistoricIncidents
                    
                    /* 
                        Will clear the edits and new record data upon navigating to another building.
                        Should get a better way to do this, plus a way to actually keep unsaved edits.
                    */
                    key={props.building.building_id} 
                    
                    value={props.building.rain_flood_historic_incidents}
                    editableEntries={true}
                    slug='rain_flood_historic_incidents'
                    title={dataFields.rain_flood_historic_incidents.title}
                    mode={props.mode}
                    onChange={props.onChange}
                    onSaveAdd={props.onSaveAdd}
                    hasEdits={props.edited}

                />
                {
                    props.mode === 'view' &&
                        <InfoBox>Bitte in den Bearbeitungsmodus wechseln um Daten bearbeiten / hinzufügen zu können</InfoBox>
                }

            </>
            </div>



            </DataEntryGroup>

            <DataEntryGroup name="Anpassungsmaßnahmen" collapsed={false} >




                {/* checkbox entry for multiple data entry, here: rain_flood_preventive_measures */}
                <div className='div-rain_flood_preventive_measures1'>
                <MultiSelectDataEntry
                    slug='rain_flood_preventive_measures1'
                    title={dataFields.rain_flood_preventive_measures1.title}
                    value={props.building.rain_flood_preventive_measures1}
                    disabled={false}
                    /* disabled={!props.building.community_type_worth_keeping} */
                    onChange={props.onSaveChange}
                    options={
                        Object.entries(dataFields.rain_flood_preventive_measures1.fields)
                        .map(([key, definition]) => ({
                            key,
                            label: definition.title
                        }))
                    }
                    
                    mode={props.mode}
                />
                </div>
                <div className='div-rain_flood_preventive_measures2'>
                <MultiSelectDataEntry
                    slug='rain_flood_preventive_measures2'
                    title={dataFields.rain_flood_preventive_measures2.title}
                    value={props.building.rain_flood_preventive_measures2}
                    disabled={false}
                    /* disabled={!props.building.community_type_worth_keeping} */
                    onChange={props.onSaveChange}
                    options={
                        Object.entries(dataFields.rain_flood_preventive_measures2.fields)
                        .map(([key, definition]) => ({
                            key,
                            label: definition.title
                        }))
                    }
                    
                    mode={props.mode}
                />
                </div>
                <div className='div-rain_flood_preventive_measures3'>
                <MultiSelectDataEntry
                    slug='rain_flood_preventive_measures3'
                    title={dataFields.rain_flood_preventive_measures3.title}
                    value={props.building.rain_flood_preventive_measures3}
                    disabled={false}
                    /* disabled={!props.building.community_type_worth_keeping} */
                    onChange={props.onSaveChange}
                    options={
                        Object.entries(dataFields.rain_flood_preventive_measures3.fields)
                        .map(([key, definition]) => ({
                            key,
                            label: definition.title
                        }))
                    }
                    
                    mode={props.mode}
                />
                </div>
                <SelectDataEntry
                    title={dataFields.rain_flood_preventive_measures_source.title}
                    slug="rain_flood_preventive_measures_source"
                    value={props.building.rain_flood_preventive_measures_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.rain_flood_preventive_measures_source.tooltip}
                    placeholder={dataFields.rain_flood_preventive_measures_source.example}
                    options={dataFields.rain_flood_preventive_measures_source.items}
                />
                <Verification
                    slug="rain_flood_preventive_measures_source"
                    allow_verify={props.user !== undefined && props.building.rain_flood_preventive_measures_source !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("rain_flood_preventive_measures_source")}
                    user_verified_as={props.user_verified.rain_flood_preventive_measures_source}
                    verified_count={props.building.verified.rain_flood_preventive_measures_source}
                />

            </DataEntryGroup>


        </DataEntryGroup>        
        




{/*         <InfoBox>
            Die Kategorie "Resilienz" ist derzeit noch in der Entwicklung. Der Fokus wird sein, wie gut Gebäude auf extreme Ereignisse wie Starkregen, Hochwasser und Hitze angepasst und vorbereitet sind.
            Schauen Sie gerne bald wieder vorbei. Merkmale zum Keller können bereits jetzt in der Kategorie "Nutzung" erfasst werden.
        </InfoBox> */}
{/*         <DataEntry
            title="Building age"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Typical typology lifespan"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Typology adaptability rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Physical adaptability rating - within plot"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Landuse adaptability rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Structural material lifespan rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Protection from demolition rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Flood risk rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Surface geology type"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Average community value rating for typology"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Other rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Total resilience rating"
            slug=""
            value=""
            mode='view'
        /> */}
    </>)
};

const ResilienceContainer = withCopyEdit(ResilienceView);

export default ResilienceContainer;
