import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AttributionControl, MapContainer, ZoomControl, useMapEvent, Pane, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

import { apiGet } from '../apiHelpers';
import { initialMapViewport, mapBackgroundColor, MapTheme, LayerEnablementState } from '../config/map-config';

import { Building } from '../models/building';

import { CityBaseMapLayer } from './layers/city-base-map-layer';
import { CityBoundaryLayer } from './layers/city-boundary-layer';
import { BoroughBoundaryLayer } from './layers/borough-boundary-layer';
import { BoroughLabelLayer } from './layers/borough-label-layer';
import { ParcelBoundaryLayer } from './layers/parcel-boundary-layer';
import { HistoricDataLayer } from './layers/historic-data-layer';
import { FloodBoundaryLayer } from './layers/flood-boundary-layer';
import { ConservationAreaBoundaryLayer } from './layers/conservation-boundary-layer';
import { VistaBoundaryLayer } from './layers/vista-boundary-layer';
import { HousingBoundaryLayer } from './layers/housing-boundary-layer';
import { DistrictLayer } from './layers/district-layer';
import { CreativeBoundaryLayer } from './layers/creative-boundary-layer';
import { BuildingBaseLayer } from './layers/building-base-layer';
import { BuildingDataLayer } from './layers/building-data-layer';
import { BuildingNumbersLayer } from './layers/building-numbers-layer';
import { BuildingHighlightLayer } from './layers/building-highlight-layer';

import { Historic_1880_DataLayer } from './layers/historic-1880-data-layer';
import { Historic_1911_DataLayer } from './layers/historic-1911-data-layer';
import { Historic_1945_DataLayer } from './layers/historic-1945-data-layer';

import { Legend } from './legend';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';
import DataLayerSwitcher from './data-switcher';
import { BoroughSwitcher } from './borough-switcher';
import { ParcelSwitcher } from './parcel-switcher';
import { FloodSwitcher } from './flood-switcher';
import { ConservationAreaSwitcher } from './conservation-switcher';
import { HistoricDataSwitcher } from './historic-data-switcher';
import { VistaSwitcher } from './vista-switcher';
import { CreativeSwitcher } from './creative-switcher';
import { HousingSwitcher } from './housing-switcher';
import { DistrictSwitcher } from './district-switcher';
import { BuildingMapTileset } from '../config/tileserver-config';
import { useDisplayPreferences } from '../displayPreferences-context';
import { CategoryMapDefinition } from '../config/category-maps-config';

import { Historic_1880_DataSwitcher } from './historic-1880-data-switcher';
import { Historic_1911_DataSwitcher } from './historic-1911-data-switcher';
import { Historic_1945_DataSwitcher } from './historic-1945-data-switcher';

import { Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

/* import Geolocation_Button from './geolocation'; */

interface RadiusSelectorProps {
    households: { lat: number; lng: number }[]; // Liste der Haushalte mit Positionen
    onRadiusChange: (radius: number, center: [number, number]) => void;
}

const RadiusSelector: React.FC<RadiusSelectorProps> = ({ households, onRadiusChange }) => {
    const map = useMap();
    const [center, setCenter] = useState<[number, number] | null>(null);
    const [radius, setRadius] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const handleMouseDown = (e: L.LeafletMouseEvent) => {
            if (e.originalEvent.button === 2) { // Rechte Maustaste
                setCenter([e.latlng.lat, e.latlng.lng]);
                setRadius(0); // Start-Radius
                setIsDrawing(true);
                map.dragging.disable(); // Karte nicht verschieben während des Zeichnens
            }
        };

        const handleMouseMove = (e: L.LeafletMouseEvent) => {
            if (isDrawing && center) {
                const distance = map.distance(
                    L.latLng(center[0], center[1]),
                    L.latLng(e.latlng.lat, e.latlng.lng)
                );
                setRadius(distance);
            }
        };

        const handleMouseUp = () => {
            if (isDrawing) {
                setIsDrawing(false);
                map.dragging.enable(); // Karte wieder verschiebbar machen

                // Überprüfe, ob mindestens 3 Haushalte im Radius sind
                const householdsInRadius = households.filter(household => {
                    const distance = map.distance(
                        L.latLng(center![0], center![1]),
                        L.latLng(household.lat, household.lng)
                    );
                    return distance <= radius;
                });

                // Mindestens 3 Haushalte sicherstellen
                if (householdsInRadius.length < 3) {
                    alert('Bitte wählen Sie einen größeren Radius, um mindestens 3 Haushalte einzuschließen.');
                } else {
                    onRadiusChange(radius, center!);
                }
            }
        };

        map.on('contextmenu', handleMouseDown);
        map.on('mousemove', handleMouseMove);
        map.on('mouseup', handleMouseUp);

        return () => {
            map.off('contextmenu', handleMouseDown);
            map.off('mousemove', handleMouseMove);
            map.off('mouseup', handleMouseUp);
        };
    }, [map, center, radius, isDrawing, households, onRadiusChange]);

    return center && radius > 0 ? (
        <Circle
            center={center}
            radius={radius}
            pathOptions={{ color: 'lightblue', fillOpacity: 0.2 }}
        />
    ) : null;
};

interface ColouringMapProps {
    selectedBuildingId: number;
    mode: 'basic' | 'view' | 'edit' | 'multi-edit';
    revisionId: string;
    onBuildingAction: (building: Building) => void;
    mapColourScale: BuildingMapTileset;
    onMapColourScale: (x: BuildingMapTileset) => void;
    categoryMapDefinitions: CategoryMapDefinition[]
}

export const ColouringMap : FC<ColouringMapProps> = ({
    mode,
    revisionId,
    onBuildingAction,
    selectedBuildingId,
    mapColourScale,
    onMapColourScale,
    categoryMapDefinitions,
    children
}) => {
    const { darkLightTheme, darkLightThemeSwitch, showLayerSelection } = useDisplayPreferences();
    const [position, setPosition] = useState(initialMapViewport.position);
    const [zoom, setZoom] = useState(initialMapViewport.zoom);


    const handleLocate = useCallback(
        (lat: number, lng: number, zoom: number) => {
            setPosition([lat, lng]);
            setZoom(zoom);
        },
        []
    );

    const handleClick = useCallback(
        async (e) => {
            const {lat, lng} = e.latlng;
            const data = await apiGet(`/api/buildings/locate?lat=${lat}&lng=${lng}`);
            const building = data?.[0];
            onBuildingAction(building);
        },
        [onBuildingAction],
    )

    const [householdLocations, setHouseholdLocations] = useState<{ lat: number; lng: number }[]>([]);

    useEffect(() => {
        const fetchHouseholds = async () => {
            const data = await apiGet('/api/households');
            setHouseholdLocations(data.map(h => ({ lat: h.latitude, lng: h.longitude })));
        };
        fetchHouseholds();
    }, []);


    return (
        <div className="map-container">
            <MapContainer
                center={initialMapViewport.position}
                zoom={initialMapViewport.zoom}
                minZoom={9}
                maxZoom={18}
                doubleClickZoom={false}
                zoomControl={false}
                attributionControl={false}
            >
                <RadiusSelector
                    households={householdLocations} // Daten der Haushalte
                    onRadiusChange={(radius, center) => {
                        console.log(`Radius: ${radius} Meter, Zentrum:`, center);
                    }}
                />
                <ClickHandler onClick={handleClick} />
                <MapBackgroundColor theme={darkLightTheme} />
                <MapViewport position={position} zoom={zoom} />

                <Pane
                    key={darkLightTheme}
                    name={'cc-base-pane'}
                    style={{zIndex: 50}}
                >
                    <CityBaseMapLayer theme={darkLightTheme} />
                    <BuildingBaseLayer theme={darkLightTheme} />
                </Pane>

                <Pane
                    name='cc-overlay-pane-shown-behind-buildings'
                    style={{zIndex: 199}}
                >
                    <ConservationAreaBoundaryLayer/>
                </Pane>

                {
                    mapColourScale &&
                        <BuildingDataLayer
                            tileset={mapColourScale}
                            revisionId={revisionId}
                        />
                }

                <Pane
                    name='cc-overlay-pane'
                    style={{zIndex: 300}}
                >
                    <CityBoundaryLayer/>
                    <HistoricDataLayer/>
                    <Historic_1880_DataLayer/>
                    <Historic_1911_DataLayer/>
                    <Historic_1945_DataLayer/>
                    <BoroughBoundaryLayer/>
                    <ParcelBoundaryLayer/>
                    <FloodBoundaryLayer/>
                    <VistaBoundaryLayer/>
                    <HousingBoundaryLayer/>
                    <DistrictLayer/>
                    <CreativeBoundaryLayer/>
                    <BuildingNumbersLayer revisionId={revisionId} />
                    {
                        selectedBuildingId &&
                            <BuildingHighlightLayer
                                selectedBuildingId={selectedBuildingId}
                                baseTileset={mapColourScale} 
                            />
                    }
                </Pane>
                <Pane
                    name='cc-label-overlay-pane'
                    style={{zIndex: 1000}}
                >
                    <BoroughLabelLayer/>
                </Pane>

                <ZoomControl position="topright" />
                <AttributionControl prefix=""/>
                {/* <Geolocation_Button title="X"/> */}
                <GeolocationButton/>
            </MapContainer>
            {
                mode !== 'basic' &&
                <>
                    <Legend mapColourScaleDefinitions={categoryMapDefinitions} mapColourScale={mapColourScale} onMapColourScale={onMapColourScale}/>
                    <ThemeSwitcher onSubmit={darkLightThemeSwitch} currentTheme={darkLightTheme} />
                    <DataLayerSwitcher />
                    {
                        (showLayerSelection == "enabled") ?
                        <>
                            <BoroughSwitcher/>
                            {/* <ParcelSwitcher/> */}
                            {/* <FloodSwitcher/> */}
                            {/* <ConservationAreaSwitcher/> */}
                            <DistrictSwitcher/>
                            <HistoricDataSwitcher/>
                            {/* <VistaSwitcher /> */}
                            {/* <HousingSwitcher /> */}
                            {/* <CreativeSwitcher /> */}
                            <Historic_1911_DataSwitcher/>
                            <Historic_1945_DataSwitcher/>                            
                            <Historic_1880_DataSwitcher/>


                        </>
                        : <></>
                    }
                    {/* TODO change remaining ones*/}
                    {/* <SearchBox onLocate={handleLocate} /> */}
                </>
            }
        </div>
    );
}

function ClickHandler({ onClick }: {onClick: (e) => void}) {
    useMapEvent('click', (e) => onClick(e));
    
    return null;
}

function MapBackgroundColor({ theme}: {theme: MapTheme}) {
    const map = useMap();
    useEffect(() => {
        map.getContainer().style.backgroundColor = mapBackgroundColor[theme];
    });

    return null;
}

function MapViewport({
    position,
    zoom
}: {
    position: [number, number];
    zoom: number;
}) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, zoom)
    }, [position, zoom]);

    return null;
}

/* move map to current position after onClick button */

function GeolocationButton() {
    const map = useMap();
    const handleClick = () => {
        
        map.locate().on("locationfound", function (e) {
            

            console.log(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    }

    return (
        <button className="btn-geolocation" onClick={handleClick}>
            <img className="btn-geolocation-icon" src="../images/map-marker-alt-solid.svg" alt="Markersymbol, gehe zu aktueller Position"></img>
        </button>
    );
}



