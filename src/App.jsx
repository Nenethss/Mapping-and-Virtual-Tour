import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import './components/style.css';
import Maps from './components/Maps';
import MarkerForm from './components/MarkerForm';
import UploadMap from './components/UploadMap';

function App() {  
  const [markers, setMarkers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newMarker, setNewMarker] = useState({ lat: null, lng: null, title: '', description: '', image: null, imagePreview: null });
  const [uploadedMap, setUploadedMap] = useState(null); // State for the uploaded map

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('http://localhost:3002/backend/pins');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMarkers(data);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };
    fetchMarkers();
  }, []);

  useEffect(() => {
    const fetchUploadedMap = async () => {
      try {
        const response = await fetch('http://localhost:3002/backend/maps');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length > 0) {
          setUploadedMap(`http://localhost:3002/backend/maps/${data[0].filename}`); // Use backticks for string interpolation
        }
      } catch (error) {
        console.error('Error fetching uploaded map:', error);
      }
    };
    fetchUploadedMap();
  }, []);
  


  return (
    <div className="map-upload-container">
      <UploadMap setUploadedMap={setUploadedMap} />
      {uploadedMap && (
        <Maps markers={markers} setMarkers={setMarkers} uploadedMap={uploadedMap} setFormVisible={setFormVisible} setNewMarker={setNewMarker} />
      )}
      {formVisible && (
        <MarkerForm newMarker={newMarker} setNewMarker={setNewMarker} setMarkers={setMarkers} setFormVisible={setFormVisible} />
      )}
    </div>
  );
}

export default App;