import React from 'react';
import AddCampus from '../components/AddCampus';
import CampusList from '../components/CampusList';

const CampusPage = () => {
  return (
    <div className='main-container' >
      <h1 className='manage-campus'>Manage Campuses</h1>
      <AddCampus />
      <CampusList />
    </div>
  );
};

export default CampusPage;
