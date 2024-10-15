import { useEffect } from "react";
import PanoramicViewer from './PanoramicViewer';

export const MarkerForm = ({ newMarker, setNewMarker, setMarkers, setFormVisible }) => {
  const handleFormSubmit = async () => {
    const { lat, lng, title, description, image } = newMarker;

    // Log newMarker to check its values
    console.log('New Marker:', newMarker);

    if (!title || !description || !image) {
      alert("Please fill out all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append('lat', lat);
    formData.append('lng', lng);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3002/backend/pins', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMarkers((prev) => [...prev, { ...data, lat, lng, title, description }]);
      setFormVisible(false);
    } catch (error) {
      console.error('Error saving marker:', error);
    }
  };

  const handleMarkerFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMarker({ ...newMarker, imagePreview: reader.result, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <input 
          type="text" 
          placeholder="Location Name" 
          value={newMarker.title} 
          onChange={(e) => setNewMarker({ ...newMarker, title: e.target.value })} 
        />
        <textarea 
          placeholder="Description" 
          value={newMarker.description} 
          onChange={(e) => setNewMarker({ ...newMarker, description: e.target.value })} 
        />
        
        <div className="upload-area-container">
          <div className="upload-area">
            <p>Drag and Drop to Upload Marker Image <br /></p>
            <input 
              type="file" 
              accept="image/*" 
              id="marker-file-upload" 
              style={{ display: 'none' }} 
              onChange={handleMarkerFileChange} 
            />
            <label htmlFor="marker-file-upload">Choose from Files</label>
            {newMarker.imagePreview && (
              <PanoramicViewer imageUrl={newMarker.imagePreview} />
            )}
          </div>
        </div>

        <div className="buttons">
          <button className="add" onClick={handleFormSubmit}>Add</button>
          <button className="cancel" onClick={() => setFormVisible(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MarkerForm;
