// // server/controllers/markerController.js
// // import Marker from '../models/Marker.js';

// // // Fetch all markers
// // export const getMarkers = async (req, res) => {
// //   try {
// //     const markers = await Marker.find();
// //     res.json(markers);
// //   } catch (err) {
// //     console.error('Error fetching markers:', err);
// //     res.status(500).send('Internal Server Error');
// //   }
// // };

// // // Save a new marker
// // export const saveMarker = async (req, res) => {
// //   try {
// //     const { lat, lng, title, description } = req.body;
// //     const image = req.file ? req.file.filename : null;

// //     if (!lat || !lng || !title || !description || !image) {
// //       return res.status(400).json({ error: 'All fields are required' });
// //     }

// //     const newMarker = new Marker({ lat, lng, title, description, image });
// //     await newMarker.save();

// //     res.status(201).json({ lat, lng, title, description, image });
// //   } catch (error) {
// //     console.error('Error saving marker:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };
// // markerController.js
// import Marker from '../models/Marker.js';

// // Add a new marker
// export const addMarker = async (req, res) => {
//     try {
//         const { mapId, title, description, imageUrl, latitude, longitude } = req.body;  // Include lat and lng
//         const newMarker = new Marker({
//             mapId,
//             title,
//             description,
//             imageUrl,
//             latitude,  // Store latitude
//             longitude, // Store longitude
//         });

//         await newMarker.save();
//         res.status(201).json(newMarker);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get all markers for a specific map
// export const getMarkersForMap = async (req, res) => {
//     try {
//         const markers = await Marker.find({ mapId: req.params.mapId });
//         res.json(markers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all markers
// export const getAllMarkers = async (req, res) => {
//     try {
//         const markers = await Marker.find();
//         res.json(markers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

import Marker from '../models/Marker.js'; 

export const createMarker = async (req, res) => {
    try {
        const { campusId, latitude, longitude, title, description } = req.body;
        const imageFile = req.file; // Assuming you're using multer for file uploads

        // Validate input data
        if (!campusId || latitude === undefined || longitude === undefined || !title || !description || !imageFile) {
            return res.status(400).json({ message: "campusId, latitude, longitude, title, description, and image are required." });
        }

        // Create and save the marker
        const newMarker = new Marker({ 
            campusId, 
            latitude, 
            longitude, 
            title, 
            description, 
            image: imageFile.path // Store the file path of the uploaded image
        });
        await newMarker.save();
        res.status(201).json(newMarker);
    } catch (error) {
        console.error('Error creating marker:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Consolidated marker retrieval function
export const getMarkersByCampusId = async (req, res) => {
    try {
        const markers = await Marker.find({ campusId: req.params.campusId });
        res.status(200).json(markers);
    } catch (error) {
        console.error('Error fetching markers:', error);
        res.status(500).json({ message: 'Error fetching markers' });
    }
};

// If you still want to get a single marker by ID, you can keep this function
export const getMarker = async (req, res) => {
    try {
        const marker = await Marker.findById(req.params.id);
        if (!marker) {
            return res.status(404).json({ message: 'Marker not found' });
        }
        res.status(200).json(marker);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




