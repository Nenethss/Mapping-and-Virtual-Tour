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




