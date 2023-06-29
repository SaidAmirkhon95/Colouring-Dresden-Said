import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { WMSTileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function Historic_1911_DataLayer({}) {
    const { historic_1911_Data } = useDisplayPreferences();
    if(historic_1911_Data == "enabled") {
        return <><WMSTileLayer
            /* layers="dresden_1911" */
            layers="df_dk_0000314"
            /* url="https://wms.kartenforum.slub-dresden.de/map/dresden_1911?" */
            url="https://wms.kartenforum.slub-dresden.de/map/10007029?"

            attribution='Alle Metadaten stehen unter der CC0-Lizenz zur Verfuegung. Alle ueber die Infrastruktur des Virtuellen Kartenforum angeboten Karten mit einer Datierung vor 1900 stehen unter CC-BY-SA 4.0 zur Verfuegung. Für juengere Karten gilt aus urheberrechtlichen Gruenden Rechte vorbehalten/rights reserved. Naehere Informationen finden sie auch in den Nutzungsbestimmungen auf den Webseiten der SLUB (http://www.deutschefotothek.de).'
            
        /><BuildingBaseLayerAllZoom theme="night_outlines" /></>
	} else {
        return null;
    }
}

