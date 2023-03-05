import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { WMSTileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { useDisplayPreferences } from '../../displayPreferences-context';





export function Historic_1880_DataLayer({}) {
    const { historic_1880_Data } = useDisplayPreferences();
    if(historic_1880_Data == "enabled") {
        return <><WMSTileLayer
            /* layers="1880_background" */
            layers="sn_dop_020"
            /* version='1.1.1' */
           /*  url="http://maps.ioer.de/cgi-bin/mapserv?" */
            /* url="https://maps.ioer.de/cgi-bin/mapserv?MAP=FNDD_MAPFILE&VISIBILITY=true" */
            url="https://geodienste.sachsen.de/wms_geosn_dop-rgb/guest?"

            /* attribution='&copy; Kartendienst Meilenblätter Sachsen, Berliner Exemplar (HTW Dresden) <a href="https://geoinformatik.htw-dresden.de/geoportal/karten-und-downloaddienste/">Berliner Meilenblätter Sachsen (WMS)</a>' */
            attribution=""
            
            /* format='image/jpeg' */
            /* crs={'EPSG:3857'} */


            
            
            
        /><BuildingBaseLayerAllZoom theme="night_outlines" /></>
	} else {
        return null;
    }
}

