import React, { Fragment, useState, useEffect } from 'react'; // Added useState for dynamic fields
import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import { useAuth } from '../../auth-context';
import InfoBox from '../../components/info-box';

const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const [showNewButton, setShowNewButton] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    // State for dynamic text fields
    const [textFields, setTextFields] = useState<string[]>([]);

    const showReport = () => {
        props.onShowReportButtonClicked(true);
        setShowNewButton(true);
    };

    const hideReport = () => {
        props.onShowReportButtonClicked(false);
        setShowNewButton(false);
    };

    const { isLoading, user } = useAuth();

    // Function to validate input fields and checkbox state
    const validateInputs = () => {
        const { number_persons, reference_period, electricity_usage, gas_usage, living_area, agreement_dsgv_sust } = props.building;

        const allFieldsFilled =
            number_persons > 0 &&
            reference_period > 0 &&
            electricity_usage >= 0 &&
            gas_usage >= 0 &&
            living_area > 0;

        const firstCheckboxChecked = agreement_dsgv_sust;

        // Enable button if all fields are filled and first checkbox is checked
        setIsButtonEnabled(allFieldsFilled && firstCheckboxChecked);
    };

    // Effect to validate inputs whenever props.building changes
    useEffect(() => {
        validateInputs();
    }, [props.building]);

    // Add a new text field dynamically
    const addTextField = () => {
        setTextFields([...textFields, ""]); // Add an empty string to represent a new text field
    };

    // Update the value of a specific text field
    const handleTextFieldChange = (index: number, value: string) => {
        const updatedFields = [...textFields];
        updatedFields[index] = value;
        setTextFields(updatedFields);
    };

    return (
        <Fragment>
            {user && user.username !== undefined ? (
                <div>
                    <button
                        id="showReportButton"
                        className="btn btn-warning"
                        onClick={showReport}
                        disabled={!isButtonEnabled} // Disable button based on validation
                    >
                        Vergleich anzeigen
                    </button>
                    {showNewButton && (
                        <button
                            id="hideReportButton"
                            className="btn btn-secondary"
                            onClick={hideReport}
                        >
                            Zurück zur Karte
                        </button>
                    )}
                </div>
            ) : (
                <p></p>
            )}

            <InfoBox>
                Die Daten werden von <a href="https://www.ioer.de/projekte/buildingtrust">Building Trust</a> verarbeitet und annonymisiert an Colouring Dresden weitergegeben.
            </InfoBox>

            {/* Numeric Data Inputs */}
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
                step={0.01}
                min={5}
                max={1000}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

            {/* Dynamic Text Fields */}
            <div>
                <h5>Zusätzliche Daten:</h5>
                {textFields.map((field, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={field}
                            onChange={(e) => handleTextFieldChange(index, e.target.value)}
                            placeholder={`Zusatzfeld ${index + 1}`}
                            className="form-control"
                        />
                    </div>
                ))}
                <button
                    className="btn btn-primary"
                    onClick={addTextField}
                    style={{ marginTop: '10px' }}
                >
                    (+) Neues Feld hinzufügen
                </button>
            </div>

            {/* Checkbox Data Entries */}
            <CheckboxDataEntry
                title={dataFields.agreement_dsgv_sust.title}
                slug="agreement_dsgv_sust"
                value={props.building.agreement_dsgv_sust}
                onChange={props.onChange}
                tooltip={dataFields.agreement_dsgv_sust.tooltip}
            />
            <CheckboxDataEntry
                title={dataFields.agreement_science_sust.title}
                slug="agreement_science_sust"
                value={props.building.agreement_science_sust}
                onChange={props.onChange}
            />
        </Fragment>
    );
};

const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
