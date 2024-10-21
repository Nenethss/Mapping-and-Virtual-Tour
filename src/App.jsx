import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampusPage from './pages/CampusPage'; // New combined component
import UploadMap from './components/UploadMap';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route shows the Add Campus and Campus List */}
        <Route path="/" element={<CampusPage />} />
        
        {/* Route to Upload Map page when clicking on a campus */}
        <Route path="/campus/:campusId/upload" element={<UploadMap />} />
      </Routes>
    </Router>
  );
};

export default App;
