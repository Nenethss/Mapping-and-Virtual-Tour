// // server/controllers/mapController.js
// import Map from '../models/Map.js';

// // Upload a new map image
// export const uploadMapImage = async (req, res) => {
//   const mapImage = req.file ? req.file.filename : null;

//   if (!mapImage) {
//     return res.status(400).send('Map image is required');
//   }

//   try {
//     const map = new Map({ filename: mapImage });
//     await map.save();
//     res.json({ message: 'Map image uploaded and saved successfully', filename: mapImage });
//   } catch (err) {
//     console.error('Error saving map image to database:', err);
//     res.status(500).send('Internal Server Error');
//   }
// };

// // Fetch current map images
// export const getMapImages = async (req, res) => {
//   try {
//     const maps = await Map.find();
//     res.json(maps);
//   } catch (err) {
//     console.error('Error fetching maps:', err);
//     res.status(500).send('Internal Server Error');
//   }
// };



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

