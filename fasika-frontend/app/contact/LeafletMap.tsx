"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMemo, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Optimized icon creation with memoization
const useDefaultIcon = () => {
  return useMemo(() => {
    return L.icon({
      iconUrl: "/marker-icon.png",
      iconRetinaUrl: "/marker-icon-2x.png",
      shadowUrl: "/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }, []);
};

// Predefined markers data
const MARKERS_DATA = [
  { position: [9.03, 38.75] as L.LatLngTuple, popup: "Summit Feyel bet" },
  { position: [9.02, 38.74] as L.LatLngTuple, popup: "Location 2" },
  { position: [9.01, 38.76] as L.LatLngTuple, popup: "Location 3" },
] as const;

const DEFAULT_CENTER: L.LatLngTuple = [9.0227, 38.7469]; // Addis Ababa coordinates
const DEFAULT_ZOOM = 13;

const LeafletMap = () => {
  const defaultIcon = useDefaultIcon();

  // Fix for Leaflet marker icons (runs once on mount)
  useEffect(() => {
    L.Marker.prototype.options.icon = defaultIcon;
  }, [defaultIcon]);

  // Performance optimization: Only rerender markers when data changes
  const markers = useMemo(() => (
    MARKERS_DATA.map((marker, index) => (
      <Marker key={`marker-${index}`} position={marker.position}>
        <Popup>{marker.popup}</Popup>
      </Marker>
    ))
  ), []);

  return (
    <MapContainer 
      center={DEFAULT_CENTER} 
      zoom={DEFAULT_ZOOM} 
      style={{ height: "100%", width: "100%" }}
      // Performance optimizations:
      preferCanvas={true} // Use canvas renderer for better performance with many markers
      zoomControl={false} // Disable default zoom control if not needed
      doubleClickZoom={false} // Disable double click zoom if not needed
      closePopupOnClick={false} // Prevents unnecessary rerenders
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // Performance optimizations for tile layer:
        maxZoom={19}
        minZoom={10}
        maxNativeZoom={19}
        updateWhenIdle={true} // Only updates tiles when panning ends
        keepBuffer={5} // Keep more tiles loaded around the edges
      />
      {markers}
    </MapContainer>
  );
};

export default LeafletMap;