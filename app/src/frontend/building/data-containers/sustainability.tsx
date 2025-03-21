import React, { Fragment, useState, useEffect } from 'react'; // Added useState for dynamic fields
import { useKeycloakAuth } from '../../keycloakAuthProvider';
import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import { useAuth } from '../../auth-context';
import InfoBox from '../../components/info-box';

const API_BASE_URL = 'http://localhost:3003/households/';

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
    const [aggregatedData, setAggregatedData] = useState({
        electricityUsage: 0,
        gasUsage: 0,
    });

    // Get authentication states from both hooks
    const { isLoading, user } = useAuth();
    const { initialized, authenticated, token, login } = useKeycloakAuth();

    const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

    useEffect(() => {
        setIsAuthenticated(authenticated);
    }, [authenticated]);

    useEffect(() => {
        console.log("Keycloak initialized:", initialized);
        console.log("User authenticated:", authenticated);
        console.log("Current Keycloak Token:", token);
    }, [token, initialized, authenticated]);

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

    useEffect(() => {
        if (!token) return;
        fetchAggregatedData();
    }, [token]);

    const fetchAggregatedData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/aggregated?districtId=${props.building.building_id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
                const data = await response.json();
                setAggregatedData({
                    electricityUsage: data.electricityUsage,
                    gasUsage: data.gasUsage,
                });
            } else {
                console.error("Fehler beim Abrufen der aggregierten Daten", response.status);
            }
        } catch (error) {
            console.error("Netzwerkfehler", error);
        }
    };

    const sendData = async () => {
        if (!token) {
            console.error("Kein Zugriffstoken gefunden. Benutzer nicht authentifiziert.");
            return;
        }
        try {
          const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              locationName: props.building.location_name,
              locationNumber: props.building.location_number,
              locationStreet: props.building.location_street,
              locationTown: props.building.location_town,
              locationPostcode: props.building.location_postcode,
              locationLatitude: props.building.location_latitude,
              locationLongitude: props.building.location_longitude,
              numberOfPersons: props.building.number_persons,
              referencePeriod: props.building.reference_period,
              electricityUsage: props.building.electricity_usage,
              gasUsage: props.building.gas_usage,
              livingArea: props.building.living_area,
              districtId: props.building.building_id,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Haushalt erfolgreich erstellt:", data);
            fetchAggregatedData();
          } else {
            const errorText = await response.text();
            console.error("Fehler beim Senden der Daten:", response.status, errorText);
          }

          if (response.status === 403) {
            console.error("Zugriff verweigert. Überprüfen Sie die Berechtigungen.");
          } else if (response.status === 400) {
            console.error("Ungültige Anfrage. Überprüfen Sie die gesendeten Daten.");
          }
        } catch (error) {
          console.error("Fehler beim Senden der Daten", error);
        }
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
            {isAuthenticated ? (
                <>
                    <button
                        className="btn btn-success"
                        onClick={sendData}
                        disabled={!isButtonEnabled}
                    >
                        Daten senden
                    </button>
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
                </>
            ) : (
                <button
                    className="btn btn-warning"
                    onClick={login}
                >
                    Anmelden
                </button>
            )}

            <h3>Aggregierte Daten</h3>
            <div>
                <label>Aggregierter Stromverbrauch (kWh/Jahr):</label>
                <input type="number" value={aggregatedData.electricityUsage} readOnly className="form-control" />
            </div>
            <div>
                <label>Aggregierter Gasverbrauch (kWh/Jahr):</label>
                <input type="number" value={aggregatedData.gasUsage} readOnly className="form-control" />
            </div>
        </Fragment>
    );
};

const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
