import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { LayerEnablementState, MapTheme } from './config/map-config';

interface DisplayPreferencesContextState {
    showOverlayList: (e: React.FormEvent<HTMLFormElement>) => void;
    resetLayersAndHideTheirList: (e: React.FormEvent<HTMLFormElement>) => void;

    vista: LayerEnablementState;
    vistaSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    vistaSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    flood: LayerEnablementState;
    floodSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    floodSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    creative: LayerEnablementState;
    creativeSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    creativeSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    housing: LayerEnablementState;
    housingSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    housingSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    district: LayerEnablementState;
    districtSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    districtSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    conservation: LayerEnablementState;
    conservationSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    conservationSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    parcel: LayerEnablementState;
    parcelSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    parcelSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    borough: LayerEnablementState;
    boroughSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    boroughSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    historicData: LayerEnablementState;
    historicDataSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    historicDataSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    historic_1880_Data: LayerEnablementState;
    historic_1880_DataSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    historic_1880_DataSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    historic_1911_Data: LayerEnablementState;
    historic_1911_DataSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    historic_1911_DataSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    historic_1945_Data: LayerEnablementState;
    historic_1945_DataSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    historic_1945_DataSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    darkLightTheme: MapTheme;
    darkLightThemeSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    darkLightThemeSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;

    showLayerSelection: LayerEnablementState;
    showLayerSelectionSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
    showLayerSelectionSwitchOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

const stub = (): never => {
    throw new Error('DisplayPreferencesProvider not set up');
};

export const DisplayPreferencesContext = createContext<DisplayPreferencesContextState>({
    showOverlayList: stub,
    resetLayersAndHideTheirList: stub,

    vista: undefined,
    vistaSwitch: stub,
    vistaSwitchOnClick: undefined,

    flood: undefined,
    floodSwitch: stub,
    floodSwitchOnClick: undefined,

    creative: undefined,
    creativeSwitch: stub,
    creativeSwitchOnClick: undefined,

    housing: undefined,
    housingSwitch: stub,
    housingSwitchOnClick: undefined,

    district: undefined,
    districtSwitch: stub,
    districtSwitchOnClick: undefined,

    conservation: undefined,
    conservationSwitch: stub,
    conservationSwitchOnClick: undefined,

    parcel: undefined,
    parcelSwitch: stub,
    parcelSwitchOnClick: undefined,

    borough: undefined,
    boroughSwitch: stub,
    boroughSwitchOnClick: undefined,

    historicData: undefined,
    historicDataSwitch: stub,
    historicDataSwitchOnClick: undefined,

    historic_1880_Data: undefined,
    historic_1880_DataSwitch: stub,
    historic_1880_DataSwitchOnClick: undefined,

    historic_1911_Data: undefined,
    historic_1911_DataSwitch: stub,
    historic_1911_DataSwitchOnClick: undefined,

    historic_1945_Data: undefined,
    historic_1945_DataSwitch: stub,
    historic_1945_DataSwitchOnClick: undefined,

    darkLightTheme: undefined,
    darkLightThemeSwitch: stub,
    darkLightThemeSwitchOnClick: undefined,

    showLayerSelection: undefined,
    showLayerSelectionSwitch: stub,
    showLayerSelectionSwitchOnClick: undefined,
});

const noop = () => {};

export const DisplayPreferencesProvider: React.FC<{}> = ({children}) => {
    const defaultVista = 'disabled'
    const defaultFlood = 'disabled'
    const defaultCreative = 'disabled'
    const defaultHousing = 'disabled'
    const defaultDistrict = 'disabled'
    const defaultBorough = 'disabled'
    const defaultParcel = 'disabled'
    const defaultConservation = 'disabled'
    const defaultHistoricData = 'disabled'
    const defaultHistoric_1880_Data = 'disabled'
    const defaultHistoric_1911_Data = 'disabled'
    const defaultHistoric_1945_Data = 'disabled'
    const defaultShowLayerSelection = 'disabled'
    const [vista, setVista] = useState<LayerEnablementState>(defaultVista);
    const [flood, setFlood] = useState<LayerEnablementState>(defaultFlood);
    const [creative, setCreative] = useState<LayerEnablementState>(defaultCreative);
    const [housing, setHousing] = useState<LayerEnablementState>(defaultHousing);
    const [district, setDistrict] = useState<LayerEnablementState>(defaultDistrict);
    const [borough, setBorough] = useState<LayerEnablementState>(defaultBorough);
    const [parcel, setParcel] = useState<LayerEnablementState>(defaultParcel);
    const [conservation, setConservation] = useState<LayerEnablementState>(defaultConservation);
    const [historicData, setHistoricData] = useState<LayerEnablementState>(defaultHistoricData);
    const [historic_1880_Data, setHistoric_1880_Data] = useState<LayerEnablementState>(defaultHistoric_1880_Data);
    const [historic_1911_Data, setHistoric_1911_Data] = useState<LayerEnablementState>(defaultHistoric_1911_Data);
    const [historic_1945_Data, setHistoric_1945_Data] = useState<LayerEnablementState>(defaultHistoric_1945_Data);
    const [darkLightTheme, setDarkLightTheme] = useState<MapTheme>('night');
    const [showLayerSelection, setShowLayerSelection] = useState<LayerEnablementState>(defaultShowLayerSelection);

    const showOverlayList = useCallback(
        (e) => {
            setShowLayerSelection('enabled')
        },
        []
    )

    const resetLayersAndHideTheirList = useCallback(
        (e) => {
            setVista(defaultVista);
            setFlood(defaultFlood);
            setCreative(defaultCreative);
            setHousing(defaultHousing);
            setDistrict(defaultDistrict);
            setBorough(defaultBorough)
            setParcel(defaultParcel);
            setConservation(defaultConservation);
            setHistoricData(defaultHistoricData);
            setHistoric_1880_Data(defaultHistoric_1880_Data);
            setHistoric_1911_Data(defaultHistoric_1911_Data);
            setHistoric_1945_Data(defaultHistoric_1945_Data);
            setShowLayerSelection(defaultShowLayerSelection); // reset layers + hiding this panel is integrated into one action
            //setDarkLightTheme('night'); // reset only layers
    },
        []
    )

    function anyLayerModifiedState() {
        if(vista != defaultVista) {
            return true;
        }
        if(flood != defaultFlood) {
            return true;
        }
        if(creative != defaultCreative) {
            return true;
        }
        if(housing != defaultHousing) {
            return true;
        }
        if(district != defaultDistrict) {
            return true;
        }
        if(borough != defaultBorough) {
            return true;
        }
        if(parcel != defaultParcel) {
            return true;
        }
        if(conservation != defaultConservation) {
            return true;
        }
        if(historicData != defaultHistoricData) {
            return true;
        }
        if(historic_1880_Data != defaultHistoric_1880_Data) {
            return true;
        }
        if(historic_1911_Data != defaultHistoric_1911_Data) {
            return true;
        }
        if(historic_1945_Data != defaultHistoric_1945_Data) {
            return true;
        }
        //darkLightTheme not handled here
        return false;
    }

    const vistaSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newVista = (vista === 'enabled')? 'disabled' : 'enabled';
            setVista(newVista);
        },
        [vista],
    )

    const vistaSwitchOnClick = (e) => {
            e.preventDefault();
            const newVista = (vista === 'enabled')? 'disabled' : 'enabled';
            setVista(newVista);
    }

    const floodSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newFlood = (flood === 'enabled')? 'disabled' : 'enabled';
            setFlood(newFlood);
        },
        [flood],
    )

    const floodSwitchOnClick = (e) => {
        e.preventDefault();
        const newFlood = (flood === 'enabled')? 'disabled' : 'enabled';
        setFlood(newFlood);
    }

    const housingSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newHousing = (housing === 'enabled')? 'disabled' : 'enabled';
            setHousing(newHousing);
        },
        [housing],
    )

    const housingSwitchOnClick = (e) => {
        e.preventDefault();
        const newHousing = (housing === 'enabled')? 'disabled' : 'enabled';
        setHousing(newHousing);
    }

    const districtSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newDistrict = (district === 'enabled')? 'disabled' : 'enabled';
            setDistrict(newDistrict);
        },
        [district],
    )

    const districtSwitchOnClick = (e) => {
        e.preventDefault();
        const newDistrict = (district === 'enabled')? 'disabled' : 'enabled';
        setDistrict(newDistrict);
    }

    const creativeSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newCreative = (creative === 'enabled')? 'disabled' : 'enabled';
            setCreative(newCreative);
        },
        [creative],
    )

    const creativeSwitchOnClick = (e) => {
        e.preventDefault();
        const newCreative = (creative === 'enabled')? 'disabled' : 'enabled';
        setCreative(newCreative);
    }

    const boroughSwitch = useCallback(
        (e) => {
            flipBorough(e)
        },
        [borough],
    )
    const boroughSwitchOnClick = (e) => {
        flipBorough(e)
    }
    function flipBorough(e) {
        e.preventDefault();
        const newBorough = (borough === 'enabled')? 'disabled' : 'enabled';
        setBorough(newBorough);
    }

    const parcelSwitch = useCallback(
        (e) => {
            flipParcel(e)
        },
        [parcel],
    )
    const parcelSwitchOnClick = (e) => {
        flipParcel(e)
    }
    function flipParcel(e) {
        e.preventDefault();
        const newParcel = (parcel === 'enabled')? 'disabled' : 'enabled';
        setParcel(newParcel);
    }

    const conservationSwitch = useCallback(
        (e) => {
            flipConservation(e)
        },
        [conservation],
    )
    const conservationSwitchOnClick = (e) => {
        flipConservation(e)
    }
    function flipConservation(e) {
        e.preventDefault();
        const newConservation = (conservation === 'enabled')? 'disabled' : 'enabled';
        setConservation(newConservation);
    }

    const historicDataSwitch = useCallback(
        (e) => {
            flipHistoricData(e)
        },
        [historicData],
    )
    const historicDataSwitchOnClick = (e) => {
        flipHistoricData(e)
    }
    function flipHistoricData(e) {
        e.preventDefault();
        const newHistoric = (historicData === 'enabled')? 'disabled' : 'enabled';
        setHistoricData(newHistoric);
    }

    const historic_1880_DataSwitch = useCallback(
        (e) => {
            flipHistoric_1880_Data(e)
        },
        [historic_1880_Data],
    )
    const historic_1880_DataSwitchOnClick = (e) => {
        flipHistoric_1880_Data(e)
    }
    function flipHistoric_1880_Data(e) {
        e.preventDefault();
        const newHistoric_1880 = (historic_1880_Data === 'enabled')? 'disabled' : 'enabled';
        setHistoric_1880_Data(newHistoric_1880);
    }

    const historic_1911_DataSwitch = useCallback(
        (e) => {
            flipHistoric_1911_Data(e)
        },
        [historic_1911_Data],
    )
    const historic_1911_DataSwitchOnClick = (e) => {
        flipHistoric_1911_Data(e)
    }
    function flipHistoric_1911_Data(e) {
        e.preventDefault();
        const newHistoric_1911 = (historic_1911_Data === 'enabled')? 'disabled' : 'enabled';
        setHistoric_1911_Data(newHistoric_1911);
    }

    const historic_1945_DataSwitch = useCallback(
        (e) => {
            flipHistoric_1945_Data(e)
        },
        [historic_1945_Data],
    )
    const historic_1945_DataSwitchOnClick = (e) => {
        flipHistoric_1945_Data(e)
    }
    function flipHistoric_1945_Data(e) {
        e.preventDefault();
        const newHistoric_1945 = (historic_1945_Data === 'enabled')? 'disabled' : 'enabled';
        setHistoric_1945_Data(newHistoric_1945);
    }


    const darkLightThemeSwitch = useCallback(
        (e) => {
            flipDarkLightTheme(e)
        },
        [darkLightTheme],
    )
    const darkLightThemeSwitchOnClick = (e) => {
        flipDarkLightTheme(e)
    }
    function flipDarkLightTheme(e) {
        e.preventDefault();
        const newDarkLightTheme = (darkLightTheme === 'light')? 'night' : 'light';
        setDarkLightTheme(newDarkLightTheme);
    }

    const showLayerSelectionSwitch = useCallback(
        (e) => {
            flipShowLayerSelection(e)
        },
        [showLayerSelection],
    )
    const showLayerSelectionSwitchOnClick = (e) => {
        flipShowLayerSelection(e)
    }
    function flipShowLayerSelection(e) {
        e.preventDefault();
        const newShowLayerSelection = (showLayerSelection === 'enabled')? 'disabled' : 'enabled';
        setShowLayerSelection(newShowLayerSelection);
    }


    return (
        <DisplayPreferencesContext.Provider value={{
            showOverlayList,
            resetLayersAndHideTheirList,

            vista,
            vistaSwitch,
            vistaSwitchOnClick,
            flood,
            floodSwitch,
            floodSwitchOnClick,
            creative,
            creativeSwitch,
            creativeSwitchOnClick,
            housing,
            housingSwitch,
            housingSwitchOnClick,
            district,
            districtSwitch,
            districtSwitchOnClick,
            conservation,
            conservationSwitch,
            conservationSwitchOnClick,
            parcel,
            parcelSwitch,
            parcelSwitchOnClick,
        
            borough,
            boroughSwitch,
            boroughSwitchOnClick,
        
            historicData,
            historicDataSwitch,
            historicDataSwitchOnClick,

            historic_1880_Data,
            historic_1880_DataSwitch,
            historic_1880_DataSwitchOnClick,

            historic_1911_Data,
            historic_1911_DataSwitch,
            historic_1911_DataSwitchOnClick,

            historic_1945_Data,
            historic_1945_DataSwitch,
            historic_1945_DataSwitchOnClick,

            darkLightTheme,
            darkLightThemeSwitch,
            darkLightThemeSwitchOnClick,

            showLayerSelection,
            showLayerSelectionSwitch,
            showLayerSelectionSwitchOnClick
        }}>
            {children}
        </DisplayPreferencesContext.Provider>
    );
};

export const useDisplayPreferences = (): DisplayPreferencesContextState => {
    return useContext(DisplayPreferencesContext);
};
