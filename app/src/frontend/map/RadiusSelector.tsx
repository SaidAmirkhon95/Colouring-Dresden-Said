import React, { FC, useEffect, useState, useRef } from 'react';
import { Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { apiGet } from '../apiHelpers';
import { Building } from '../models/building';
import { useRadiusModus } from '../radiusModusContext';

interface RadiusSelectorProps {
  households: { lat: number; lng: number }[];
  onRadiusChange: (radius: number, center: [number, number]) => void;
  onBuildingsInRadiusChange: (buildings: Building[]) => void;
  onAggregatedDataChange: (
    aggregatedData: { averageElectricity: number; averageGas: number } | null
  ) => void;
  onDrawingStateChange?: (isDrawing: boolean) => void;
  onInitialClick?: (latlng: L.LatLng) => void;
}

type Mode = 'idle' | 'drawing' | 'updating';

const destinationPoint = (
  start: L.LatLng,
  bearing: number,
  distance: number
): L.LatLng => {
  const R = 6378137;
  const δ = distance / R;
  const θ = (bearing * Math.PI) / 180;
  const φ1 = (start.lat * Math.PI) / 180;
  const λ1 = (start.lng * Math.PI) / 180;
  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
  const λ2 =
    λ1 +
    Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
  return L.latLng((φ2 * 180) / Math.PI, (λ2 * 180) / Math.PI);
};

const RadiusSelector: FC<RadiusSelectorProps> = ({
  households,
  onRadiusChange,
  onBuildingsInRadiusChange,
  onAggregatedDataChange,
  onDrawingStateChange,
  onInitialClick,
}) => {
  const map = useMap();
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [radius, setRadius] = useState(0);
  const [mode, setMode] = useState<Mode>('idle');
  const { setRadiusEnergyData, setRadiusDrawn } = useRadiusModus();

  const API_BASE_URL = 'http://localhost:3003/households/';

  const isDraggingRef = useRef(false);
  const startPointRef = useRef<L.Point | null>(null);
  // NEW: a ref to store the initial mousedown latlng (the “selected building”)
  const initialClickLatLngRef = useRef<L.LatLng | null>(null);
  const justDrewCircleRef = useRef(false);
  const dragThreshold = 5;
  const edgeTolerance = 10;

  const updateDrawingState = (state: boolean) => {
    onDrawingStateChange && onDrawingStateChange(state);
  };

  const triggeredInitialClickRef = useRef(false); // 🧠 track if we already triggered the click

  useEffect(() => {
    const getMouseEventLatLng = (e: MouseEvent): L.LatLng => {
      return map.mouseEventToLatLng(e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const startPoint = map.mouseEventToContainerPoint(e);
      startPointRef.current = startPoint;
      const latlng = getMouseEventLatLng(e);
      triggeredInitialClickRef.current = false;
    
      // Case 1: Update existing circle if clicking near edge
      if (center && radius > 0) {
        const centerLatLng = L.latLng(center[0], center[1]);
        const mousePoint = map.latLngToContainerPoint(latlng);
        const centerPoint = map.latLngToContainerPoint(centerLatLng);
        const edgeLatLng = destinationPoint(centerLatLng, 90, radius);
        const edgePixelPoint = map.latLngToContainerPoint(edgeLatLng);
        const radiusInPixels = edgePixelPoint.distanceTo(centerPoint);
    
        if (Math.abs(mousePoint.distanceTo(centerPoint) - radiusInPixels) < edgeTolerance) {
          setMode('updating');
          isDraggingRef.current = true;
          updateDrawingState(true);
          map.dragging.disable();
          return;
        }
      }
    
      // 🧠 Only reset radius-drawn *if* the user is about to start drawing a new one
      // So we delay the reset to the mousemove handler
      isDraggingRef.current = true;
      setMode('drawing');
      updateDrawingState(true);
      map.dragging.disable();
    
      setCenter([latlng.lat, latlng.lng]);
      setRadius(0);
    
      if (onInitialClick) {
        onInitialClick(latlng);
        triggeredInitialClickRef.current = true;
      }
      setRadiusDrawn(false);
    };          

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !center) return;

      if (isDraggingRef.current && !justDrewCircleRef.current) {
        setRadiusDrawn(false); // ⬅️ Reset radiusDrawn only on actual draw
      }      

      const currentPoint = map.mouseEventToContainerPoint(e);
      if (
        startPointRef.current &&
        currentPoint.distanceTo(startPointRef.current) < dragThreshold
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const latlng = getMouseEventLatLng(e);
      const newRadius = map.distance(L.latLng(center[0], center[1]), latlng);
      setRadius(newRadius);
    };

    const handleMouseUp = async (e: MouseEvent) => {
      if (triggeredInitialClickRef.current) {
        // 👋 We already selected a building — do NOT re-trigger anything here
        triggeredInitialClickRef.current = false; // reset for next interaction
      }

      if (startPointRef.current) {
        const endPoint = map.mouseEventToContainerPoint(e);
        const distance = endPoint.distanceTo(startPointRef.current);
        if (distance < dragThreshold) {
          isDraggingRef.current = false;
          setMode('idle');
          updateDrawingState(false);
          map.dragging.enable();
          return;
        }
      }

      if (!isDraggingRef.current || !center) return;

      justDrewCircleRef.current = true;

      e.preventDefault();
      e.stopPropagation();

      isDraggingRef.current = false;
      map.dragging.enable();
      updateDrawingState(false);
      setMode('idle');

      const householdCount = households.filter((household) => {
        const d = map.distance(L.latLng(center[0], center[1]), L.latLng(household.lat, household.lng));
        return d <= radius;
      }).length;

      setRadiusDrawn(true);

      if (householdCount < 3) {
        alert('Please choose a larger radius to include at least 3 households.');
        onAggregatedDataChange(null);
      } else {
        try {
          const aggregatedData = await apiGet(
            `${API_BASE_URL}households/aggregated/location-point?latitude=${center[0]}&longitude=${center[1]}&radius=${radius}`
          );
          onAggregatedDataChange({
            averageElectricity: aggregatedData.averageElectricity,
            averageGas: aggregatedData.averageGas,
          });
          setRadiusEnergyData({
            averageElectricity: aggregatedData.averageElectricity,
            averageGas: aggregatedData.averageGas,
          });
          onRadiusChange(radius, center);
        } catch (error) {
          console.error('Error fetching aggregated data:', error);
          onAggregatedDataChange(null);
        }
      }
      justDrewCircleRef.current = false;
    };

    const container = map.getContainer();
    container.addEventListener('mousedown', handleMouseDown, false);
    container.addEventListener('mousemove', handleMouseMove, true);
    container.addEventListener('mouseup', handleMouseUp, true);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown, false);
      container.removeEventListener('mousemove', handleMouseMove, true);
      container.removeEventListener('mouseup', handleMouseUp, true);
    };
  }, [
    map,
    center,
    radius,
    households,
    onAggregatedDataChange,
    onBuildingsInRadiusChange,
    onRadiusChange,
    onDrawingStateChange,
    onInitialClick, // ✅ include in dependency
  ]);

  return center && radius > 0 ? (
    <Circle
      center={center}
      radius={radius}
      pathOptions={{ color: 'lightblue', fillOpacity: 0.2 }}
    />
  ) : null;
};

export default RadiusSelector;
