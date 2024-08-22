import React, { Fragment, useState } from 'react'; //useState for the checkbox
import { dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import { useAuth } from '../../auth-context';
import InfoBox from '../../components/info-box';

const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const [showNewButton, setShowNewButton] = useState(false);
    const showReport = () => {
        props.onShowReportButtonClicked(true)
        setShowNewButton(true);
    }

    const hideReport = () => {
        props.onShowReportButtonClicked(false);
        setShowNewButton(false);
    }
    const { isLoading, user, userError, logout, generateApiKey, deleteAccount } = useAuth();

    return (

        <Fragment>
            {user && user.username !== undefined ? (
                <div>
                    <button id="showReportButton" className="btn btn-warning" onClick={showReport}>Vergleich anzeigen</button>
                    {showNewButton && (
                        <button id="hideReportButton" className="btn btn-secondary" onClick={hideReport}>Zurück zur Karte</button>
                    )}
                </div>
            ) : (
                <p></p>
            )}


            <InfoBox>
                Die Daten werden von <a href="https://www.ioer.de/projekte/buildingtrust">Building Trust</a> verarbeitet und annonymisiert an Colouring Dresden weitergegeben.
            </InfoBox>

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

        </Fragment >
    );
};
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
