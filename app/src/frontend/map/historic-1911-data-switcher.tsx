import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const Historic_1911_DataSwitcher: React.FC<{}> = (props) => {
    const { historic_1911_Data, historic_1911_DataSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`historic-1911-data-switcher map-button ${historic_1911_Data}-state ${darkLightTheme}`} onSubmit={historic_1911_DataSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historic_1911_Data === 'enabled')? 'Dresden 1911 an' : 'Dresden 1911 aus'}
            </button>
        </form>
    );
}