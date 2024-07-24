import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AttributionControl, MapContainer, ZoomControl, useMapEvent, Pane, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './sustanainability_report.css';

import { apiGet } from '../../apiHelpers';


interface SustReportProps {

}

export const SustReport: FC<SustReportProps> = ({

}) => {
    return (
        <div >
            <h1>Hellooo</h1>
        </div>
    );
}

