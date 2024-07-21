import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function DistrictLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject | null>(null); // old one, maybe mine is false: const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { district } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/districts_Dresden.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(district == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution="Stadtteile Dresdens, aus der Plattform <a href=https://opendata.dresden.de/informationsportal/#app/mainpage//Stadtteile>Opendata Dresden</a>. © Amt für Geodaten und Kataster"
        data={boundaryGeojson}
        style={{color: '#FF8000', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else if (district == "disabled") {
        return <div></div>
    }
}