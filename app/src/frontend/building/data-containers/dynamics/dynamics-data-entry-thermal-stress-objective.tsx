import React, { useCallback, useState } from 'react'
import _ from 'lodash';

import { BuildingAttributes } from '../../../models/building';
import { FieldRow } from '../../data-components/field-row';
import DataEntry, { BaseDataEntryProps } from '../../data-components/data-entry';
import { dataFields } from '../../../config/data-fields-config';
import SelectDataEntry from '../../data-components/select-data-entry';
import { MultiDataEntry } from '../../data-components/multi-data-entry/multi-data-entry';
import { NumberRangeDataEntry } from '../../data-components/number-range-data-entry';

import './dynamics-data-entry-thermal-stress-objective.css';
import { CloseIcon } from '../../../components/icons';
import DataTitle, { DataTitleCopyable } from '../../data-components/data-title';

import NumericDataEntry from '../../data-components/numeric-data-entry';
import DatePickerDataEntry from '../../data-components/date-data-entry';
import TimePickerDataEntry from '../../data-components/time-data-entry';

type ThermalStressObjective = (BuildingAttributes['thermal_stress_objective'][number]);

export const DynamicsBuildingPaneThermalStressObjective: React.FC<{className?: string}> = ({children, className}) => (
    <div className={`dynamics-building-pane ${className ?? ''}`} >
        {children}
    </div>
);


/* functions for date and time format */
function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),        
      ].join('-')
    );
}
  
function formatTime(date: Date) {
    return (
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
  
      ].join(':')
    );
}






/* function lifespan(a: number, b: number): number {
    if(a == undefined || b == undefined) return undefined;

    const diff = a - b;

    return Math.max(diff, 0);
}

function formatRange(minSpan: number, maxSpan: number): string {
    if(minSpan == undefined || maxSpan == undefined) return '';

    if(minSpan === maxSpan) return minSpan + '';

    return `${minSpan}-${maxSpan}`;
} */

interface DynamicsDataRowProps {
    value: ThermalStressObjective;
    onChange?: (value: ThermalStressObjective) => void;
    disabled?: boolean;
/*     maxYear?: number;
    minYear?: number; */
    mode?: 'view' | 'edit' | 'multi-edit';
    required?: boolean;
    validateForm?: boolean;
    index?: number;
}
const DynamicsDataRow: React.FC<DynamicsDataRowProps> = ({
    value = {} as ThermalStressObjective,
    onChange,
    disabled = false,
/*     maxYear,
    minYear, */
    mode,
    required = false,
    validateForm = false,
    index
}) => {

    const onFieldChange = useCallback((key: string, val: any) => {
        const changedValue = {...value};
        changedValue[key] = val;
        onChange(changedValue);
    }, [value, onChange]);

/*     const maxLifespan = lifespan(value.year_demolished?.max, value.year_constructed?.min);
    const minLifespan = lifespan(value.year_demolished?.min, value.year_constructed?.max); */

    /* const for current date and time */
    const currentDate = formatDate(new Date());
    const currentTime = formatTime(new Date());

    return (
        <>
            
            <FieldRow>
                <div className='div-measured_temperature'>
                    <NumericDataEntry
                        title={dataFields.thermal_stress_objective.items.measured_temperature.title}
                        slug="measured_temperature"
                        slugModifier={index}
                        value={value.measured_temperature}
                        disabled={disabled}
                        mode={mode}
                        required={required}
                        /* copy={props.copy} */
                        /* tooltip={dataFields.terrain_connection_difference.tooltip} */
                        onChange={onFieldChange}
                        step={0.1}
                        min={-30}
                        max={60}
                        tooltip={dataFields.thermal_stress_objective.items.measured_temperature.tooltip}
                    />

                </div>

                <div className='div-floor'>
                    <NumericDataEntry
                        title={dataFields.thermal_stress_objective.items.floor.title}
                        slug='floor'
                        slugModifier={index}
                        value={value.floor}
                        disabled={disabled}
                        required={required}
                        mode={mode}
                        onChange={onFieldChange}
                        step={1}
                        min={0}
                        max={300}
                        tooltip={dataFields.thermal_stress_objective.items.floor.tooltip}
                    />

                </div>
                <div className='div-orientation'>
                    <SelectDataEntry
                        slug='orientation'
                        slugModifier={index}
                        title={dataFields.thermal_stress_objective.items.orientation.title}
                        onChange={onFieldChange}
                        value={value.orientation}
                        options={dataFields.thermal_stress_objective.items.orientation.items}
                        disabled={disabled}
                        required={required}
                        mode={mode}
                        tooltip={dataFields.thermal_stress_objective.items.orientation.tooltip}
                    />

                </div>


            </FieldRow>
            
            <FieldRow>
                <div className='div-date'>                    
                    
                    <DatePickerDataEntry
                        title={dataFields.thermal_stress_objective.items.date.title}
                        slug="date"
                        slugModifier={index}
                        value={value.date}
                        placeholder={currentDate}
                        disabled={disabled}
                        mode={mode}
                        required={required}
                        /* copy={props.copy} */
                        /* tooltip={dataFields.terrain_connection_difference.tooltip} */
                        onChange={onFieldChange}
                        min={'2023-03-01'}
                        max={currentDate}
                        tooltip={dataFields.thermal_stress_objective.items.date.tooltip}
                    />                   

                </div>
                <div className='div-time'>
                    <TimePickerDataEntry
                        title={dataFields.thermal_stress_objective.items.time.title}
                        slug="time"
                        slugModifier={index}
                        value={value.time}
                        placeholder={currentTime}
                        disabled={disabled}
                        mode={mode}
                        required={required}
                        /* copy={props.copy} */
                        /* tooltip={dataFields.terrain_connection_difference.tooltip} */
                        onChange={onFieldChange}
                        min={'00:00'}
                        max={'23:59'}
                        tooltip={dataFields.thermal_stress_objective.items.time.tooltip}
                    />
                </div>

                <div className='div-acquisition_type'>

                    <DataEntry
                        title={dataFields.thermal_stress_objective.items.acquisition_type.title}
                        /* tooltip={dataFields.basement_use_source.tooltip} */
                        slug="acquisition_type"
                        slugModifier={index}
                        value={value.acquisition_type}
                        placeholder={dataFields.thermal_stress_objective.items.acquisition_type.example}
                        mode={mode}
                        disabled={disabled}                        
                        onChange={onFieldChange}
                        tooltip={dataFields.thermal_stress_objective.items.acquisition_type.tooltip}
                    />
                </div>



            </FieldRow>
        </>
    )
};

interface DynamicsDataEntryProps extends BaseDataEntryProps {
    title: string;
    value: ThermalStressObjective[];
    editableEntries: boolean;
/*     maxYear: number;
    minYear: number; */
    onSaveAdd: (slug: string, newItem: any) => void;
    hasEdits: boolean;
}

function isValid(val: ThermalStressObjective) {
    if(val == undefined) return false;

    if(val.acquisition_type == undefined) return false;
    if(val.orientation == undefined) return false;

    if(typeof val.measured_temperature !== 'number') return false;
    if(typeof val.floor !== 'number') return false;

    if(val.date == undefined) return false;
    if(val.time == undefined) return false;


/*     if(typeof val.year_constructed?.min !== 'number') return false;
    if(typeof val.year_constructed?.max !== 'number') return false;

    if(typeof val.year_demolished?.min !== 'number') return false;
    if(typeof val.year_demolished?.max !== 'number') return false;

    if(val.overlap_present == undefined) return false;

    if(val.links == undefined || val.links.length < 1) return false; */

    return true;
}

export const DynamicsDataEntryThermalStressObjective: React.FC<DynamicsDataEntryProps> = (props) => {
    const [newValue, setNewValue] = useState<ThermalStressObjective>();

    const values: ThermalStressObjective[] = props.value ?? [];
    const isEditing = props.mode === 'edit';
    const isDisabled = !isEditing || props.disabled;
    
    const isEdited = !_.isEmpty(newValue);
    const valid = isValid(newValue);

    const addNew = useCallback(() => {
        const val = {...newValue};

        setNewValue(undefined);
        props.onSaveAdd(props.slug, val);
    }, [values, newValue]);
    
    const edit = useCallback((id: number, val: ThermalStressObjective) => {
        const editedValues = [...values];
        editedValues.splice(id, 1, val);

        props.onChange(props.slug, editedValues);
    }, [values]);

    const remove = useCallback((id: number) => {
        const editedValues = [...values];
        editedValues.splice(id, 1);

        props.onChange(props.slug, editedValues);
    }, [values]);

    return (
        <>
            <div>
                <DataTitleCopyable
                    slug={props.slug}
                    slugModifier={props.slugModifier}
                    title={props.title}
                    tooltip={props.tooltip}
                    disabled={props.disabled || props.value == undefined}
                    copy={props.copy}
                />
                {
                    isEditing ?
                        <>
                            {/* <h6 className="h6">Bereits erfasste Einträge</h6> */}
                            {/* <label>Please supply sources for any edits of existing records</label> */}
                            <label>Bereits erfasste Einträge</label>
                        </> :
                            <label>Noch keine Einträge. Zum Hinzufügen siehe unten.</label>
                }
                        {/* <DataTitleCopyable slug={props.slug} title={props.title} tooltip={null}/> */}
                        
                
                <ul className="data-entry-list">
                    {
                        values.length === 0 &&
                        <div className="input-group">
                            <input className="form-control no-entries" type="text" value="Noch keine Einträge" disabled={true} />
                        </div>
                    }
                    {
                        values.map((pastBuilding, id) => (
                            <li key={id}>
                                <DynamicsBuildingPaneThermalStressObjective>
                                    <label>Objektive Einschätzung der Hitzebelastung</label>
                                    {
                                        !isDisabled &&
                                            <button type="button" className="btn btn-outline-dark delete-record-button"
                                                title="Eintrag löschen"
                                                onClick={() => remove(id)}
                                                data-index={id}
                                            ><CloseIcon /></button>
                                    }
                                    <DynamicsDataRow
                                        value={pastBuilding}
                                        /* disabled={!props.editableEntries || isDisabled} */
                                        disabled={true}
                                        onChange={(value) => edit(id, value)}
                                        /* minYear={props.minYear}
                                        maxYear={props.maxYear} */
                                        mode={props.mode}
                                        required={true}
                                        index={id}
                                    />
                                </DynamicsBuildingPaneThermalStressObjective>
                            </li>
                        ))
                    }
                </ul>
                {
                    !isDisabled &&
                    <div className='new-record-section'>
                        <h6 className="h6">Einen neuen Eintrag hinzufügen</h6>
                        <DynamicsBuildingPaneThermalStressObjective className='new-record'>
                            <DynamicsDataRow
                                value={newValue}
                                onChange={setNewValue}
                                disabled={isDisabled}
                                /* minYear={props.minYear}
                                maxYear={props.maxYear} */
                                mode={props.mode}
                            />
                            <label>Bitte speichern Sie alle Änderungen bevor Sie dieses aktuell ausgewählte Gebäude verlassen.  Sie werden ansonsten nicht gespeichert.</label>
                            <button type="button"
                                className="btn btn-primary btn-block add-record-button"
                                title="Zur Liste hinzufügen"
                                onClick={addNew}
                                disabled={!valid || props.hasEdits}
                            >
                                {
                                    props.hasEdits ?
                                        'Änderungen zuerst speichern oder verwerfen, bevor Sie einen neuen Eintrag hinzufügen' :
                                        (isEdited && !valid) ?
                                            'Bitte alle Felder vor dem Speichern ausfüllen' :
                                            'Neuen Eintrag speichern'
                                }
                            </button>
                        </DynamicsBuildingPaneThermalStressObjective>
                    </div>
                }
            </div>
        </>
    );
};
