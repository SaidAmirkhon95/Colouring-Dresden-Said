import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const HistoricDataSwitcher: React.FC<{}> = (props) => {
    const { historicData, historicDataSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`historic-data-switcher map-button ${historicData}-state ${darkLightTheme}`} onSubmit={historicDataSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historicData === 'enabled')? 'Meilenblätter (1780-1806) an' : 'Meilenblätter (1780-1806) aus'}
            </button>
        </form>
    );
}