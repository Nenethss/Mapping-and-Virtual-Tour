// CampusManager.jsx
import React, { useState } from 'react';

const CampusManager = ({ onCampusSelect }) => {
  const [campuses, setCampuses] = useState([]);

  const addCampus = () => {
    const name = prompt("Enter campus name:");
    if (name) {
      setCampuses([...campuses, { name, markers: [], uploadedMap: null }]);
    }
  };

  const handleCampusClick = (campus) => {
    onCampusSelect(campus);
  };

  return (
    <div>
      <h1>System Folders</h1>
      <div className="campus-list">
        {campuses.map((campus, index) => (
          <div key={index} onClick={() => handleCampusClick(campus)}>
            {campus.name}
          </div>
        ))}
      </div>
      <button onClick={addCampus}>Add Campus</button>
    </div>
  );
};

export default CampusManager;
