"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = () => {
  const position: [number, number] = [9.0227, 38.7469]; // Addis Ababa coordinates
  const markers = [
    { position: [9.0300, 38.7500] as L.LatLngTuple, popup: 'Summit Feyel bet' },
    { position: [9.0200, 38.7400] as L.LatLngTuple, popup: 'Location 2' },
    { position: [9.0100, 38.7600] as L.LatLngTuple, popup: 'Location 3' },
  ];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;