import { MapContainer, Marker, Popup, useMapEvents, ImageOverlay } from 'react-leaflet';
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import './style.css';

const Maps = ({ markers, setMarkers, uploadedMap, setFormVisible, setNewMarker }) => {
  const bounds = [[14.482570, 121.185900], [14.488000, 121.194050]];

  useEffect(() => {
    console.log('Uploaded Map URL:', uploadedMap);
  }, [uploadedMap]);
  
  function AddMarkerToClick() {
    useMapEvents({
      click(e) {
        setNewMarker({ lat: e.latlng.lat, lng: e.latlng.lng, title: '', description: '', image: null, imagePreview: null });
        setFormVisible(true);
      },
    });

    return markers.map((position, idx) => (
      <Marker key={idx} position={[position.lat, position.lng]}>
        <Popup>
          <strong>{position.title}</strong><br />
          {position.description}
        </Popup>
      </Marker>
    ));
  }

  return (
    <MapContainer className="map" 
    center={[14.485300, 121.190000]} 
    zoom={17} 
    style={{ height: '80vh', width: '60%', cursor: 'crosshair'}}>
      <ImageOverlay url={uploadedMap} bounds={bounds} />
      <AddMarkerToClick />
    </MapContainer>
  );
};

export default Maps;