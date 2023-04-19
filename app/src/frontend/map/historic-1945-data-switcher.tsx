import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const Historic_1945_DataSwitcher: React.FC<{}> = (props) => {
    const { historic_1945_Data, historic_1945_DataSwitch, darkLightTheme } = useDisplayPreferences();
    return (
        <form className={`historic-1945-data-switcher map-button ${historic_1945_Data}-state ${darkLightTheme}`} onSubmit={historic_1945_DataSwitch}>
            <button className="btn btn-outline btn-outline-dark"
                type="submit">
                {(historic_1945_Data === 'enabled')? 'Dresden 1945 an' : 'Dresden 1945 aus'}
            </button>
        </form>
    );
}