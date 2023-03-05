import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const Historic_1880_DataSwitcher: React.FC<{}> = (props) => {
    const { historic_1880_Data, historic_1880_DataSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`historic-1880-data-switcher map-button ${historic_1880_Data}-state ${darkLightTheme}`} onSubmit={historic_1880_DataSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historic_1880_Data === 'enabled')? 'Dresden 2020 an' : 'Dresden 2020 aus'}
            </button>
        </form>
    );
}