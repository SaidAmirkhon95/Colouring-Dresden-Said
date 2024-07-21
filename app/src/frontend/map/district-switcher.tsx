import React from 'react';

import './map-button.css';
import { useDisplayPreferences } from '../displayPreferences-context';

export const DistrictSwitcher: React.FC<{}> = () => {
    const { district, districtSwitch, darkLightTheme } = useDisplayPreferences();
    return (
    <form className={`district-switcher map-button ${district}-state ${darkLightTheme}`} onSubmit={districtSwitch}>
        <button className="btn btn-outline btn-outline-dark"
            type="submit">
            {(district === 'enabled')? 'District Zones on' : 'District Zones off'}
        </button>
    </form>
    );
}
