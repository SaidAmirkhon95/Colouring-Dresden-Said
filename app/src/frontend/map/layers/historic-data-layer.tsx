import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { WMSTileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function HistoricDataLayer({}) {
    const { historicData } = useDisplayPreferences();
    if(historicData == "enabled") {
        return <><WMSTileLayer
            layers="Meilenblatt_V"
            url="https://geoinformatik.htw-dresden.de/ms/mbl?"

            attribution='&copy; Kartendienst Meilenblätter Sachsen, Berliner Exemplar (HTW Dresden) <a href="https://geoinformatik.htw-dresden.de/geoportal/karten-und-downloaddienste/">Berliner Meilenblätter Sachsen (WMS)</a>'
            
        /><BuildingBaseLayerAllZoom theme="night_outlines" /></>
	} else {
        return null;
    }
}

