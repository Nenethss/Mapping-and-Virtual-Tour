import Map from '../models/Map.js';
import multer from 'multer';
import path from 'path';

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');  // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Give the file a unique name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // Limit file size to 10MB
}).single('mapImage');

// Add a new map with an image upload
export const addMap = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload error', error: err });
        }

        try {
            const { campusId } = req.body;
            const imageUrl = `/images/${req.file.filename}`;  // Path to the uploaded image

            const newMap = new Map({
                campusId,
                imageUrl,
            });

            await newMap.save();
            res.status(201).json(newMap);
        } catch (error) {
            res.status(500).json({ message: 'Error adding map', error });
        }
    });
};

// Other map-related functions can go here (like fetching maps, etc.)

