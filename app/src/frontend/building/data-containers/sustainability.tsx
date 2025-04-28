import React, { Fragment, useState, useEffect } from 'react'; // Added useState for dynamic fields
import { useKeycloakAuth } from '../../keycloakAuthProvider';
import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import { useAuth } from '../../auth-context';
import InfoBox from '../../components/info-box';
import { useRadiusModus } from "../../radiusModusContext";

const API_BASE_URL = 'http://localhost:3003/households/';

const getDummyDistrictId = (building: any): number => {
    // Fake calculation based on postal code or coordinates
    if (!building) return 0;
    const { location_postcode, location_latitude, location_longitude } = building;
  
    // Create a reproducible dummy ID
    const hash = Math.abs(
      (location_postcode?.length || 0) +
      Math.floor(location_latitude * 100) +
      Math.floor(location_longitude * 100)
    );
  
    return hash % 10; // Simulate up to 10 districts
  };
  

const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const [showNewButton, setShowNewButton] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const { isRadiusModus, setIsRadiusModus, radiusEnergyData, radiusDrawn, setRadiusDrawn, setDistrictEnergyData } = useRadiusModus();

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
        electricityUsage: 123, // Dummy value
        gasUsage: 456,         // Dummy value
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

    /* useEffect(() => {
        if (!token) return;
        fetchAggregatedData();
    }, [token]); */

    useEffect(() => {
        validateInputs();
        if (token && props.building) {
          fetchDistrictAggregatedData(props.building);
        }
      }, [props.building, token]);      

    /* const fetchAggregatedData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}aggregated?districtId=${props.building.building_id}`, {
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
    }; */

    const fetchDistrictAggregatedData = async (building: any) => {
        const dummyDistrictId = getDummyDistrictId(building);
      
        try {
          const response = await fetch(`${API_BASE_URL}aggregated?districtId=${dummyDistrictId}`, {
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
            console.warn("Using fallback values (dummy) because endpoint failed:", response.status);
            // 👇 Dummy fallback
            setAggregatedData({
              electricityUsage: 12 + dummyDistrictId * 100,
              gasUsage: 50 + dummyDistrictId * 300,
            });
            setDistrictEnergyData({
                averageElectricity: 12 + dummyDistrictId * 100,
                averageGas: 50 + dummyDistrictId * 300,
                name: "Dummy District", // or get from building or map later
                contributors: 8 + dummyDistrictId,
            });
          }
        } catch (error) {
          console.warn("District endpoint not available — using dummy values");
          setAggregatedData({
            electricityUsage: 12 + dummyDistrictId * 100,
            gasUsage: 50 + dummyDistrictId * 300,
          });
        }
    };      

    const sendData = async () => {
        if (!token) {
            console.error("Kein Zugriffstoken gefunden. Benutzer nicht authentifiziert.");
            return;
        }
        try {
            const requestBody = {
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
            };
    
            console.log("Sending data:", requestBody); 
    
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Haushalt erfolgreich erstellt:", data);
                //fetchAggregatedData();
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

    const onRadiusClick = async () => {
        const newState = !isRadiusModus;
        setIsRadiusModus(newState);
        // 👇 Reset radiusDrawn when turning radius mode OFF
        if (!newState) {
          setRadiusDrawn(false);
        }
    }      

    return (

        <Fragment>
            {user && user.username !== undefined ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        className="btn btn-success"
                        onClick={sendData}
                        disabled={!isButtonEnabled}
                      >
                        Daten senden
                      </button>
                      <button
                        className={`btn ${isRadiusModus ? "btn-secondary" : "btn-success"}`}
                        onClick={() => {
                            const newState = !isRadiusModus;
                            setIsRadiusModus(newState);

                            // 🔁 Reset radiusDrawn when turning radius mode OFF
                            if (!newState) {
                            setRadiusDrawn(false);
                            }
                        }}
                        >
                        {isRadiusModus ? "Vergleichen Aktiviert" : "Vergleichen"}
                        </button>
                    </div>
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
                    {radiusDrawn && isRadiusModus ? (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Daten nach Nachbarschaft (Umkreis)</h4>
                            <div>
                            <label>Ø Haushaltsstrom im Radius (kWh)</label>
                            <input
                                type="number"
                                //value={radiusEnergyData?.averageElectricity?.toFixed(2) ?? ""}
                                value={(1234.56).toFixed(2)}
                                readOnly
                                className="form-control"
                            />
                            </div>
                            <div>
                            <label>Ø Heizenergieverbrauch im Radius (kWh)</label>
                            <input
                                type="number"
                                //value={radiusEnergyData?.averageGas?.toFixed(2) ?? ""}
                                value={(7890.12).toFixed(2)}
                                readOnly
                                className="form-control"
                            />
                            </div>
                        </div>
                        ) : null}
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

            <h3>Daten nach Stadtviertel</h3>
            <div>
                <label>Haushaltsstrom</label>
                <input type="number" value={aggregatedData.electricityUsage} readOnly className="form-control" />
            </div>
            <div>
                <label>Heizenergieverbrauch</label>
                <input type="number" value={aggregatedData.gasUsage} readOnly className="form-control" />
            </div>
        </Fragment>
    );
};

const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
