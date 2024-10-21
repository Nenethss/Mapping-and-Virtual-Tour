import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CampusList = () => {
    const [campuses, setCampuses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/campus');
                if (!response.ok) {
                    throw new Error('Failed to fetch campuses');
                }
                const data = await response.json();
                setCampuses(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCampuses();
    }, []);

    const handleCampusClick = (campusId) => {
        navigate(`/campus/${campusId}/upload`);
    };

    return (
        <div>
            <div className='campus-container'>
                {campuses.map((campus) => (
                    <button className='campuses' key={campus._id} onClick={() => handleCampusClick(campus._id)}>
                        {campus.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CampusList;
