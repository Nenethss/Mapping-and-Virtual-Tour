import express from 'express';
import Map from '../models/Map.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/maps/');  // Directory where uploaded images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // Limit file size to 10MB
}).single('mapImage');  // Expect a field named 'mapImage' for file upload

// Upload a new map with an image
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload error', error: err });
        }

        const { campusId } = req.body;
        const imageUrl = `/images/maps/${req.file.filename}`;  // The path to the uploaded file

        try {
            const newMap = new Map({
                campusId,
                imageUrl,
            });
            await newMap.save();
            res.status(201).json(newMap);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
});

router.get('/', async (req, res) => {
  try {
      const maps = await Map.find(); // Fetch all maps from the database
      res.json(maps);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Get all maps for a specific campus
router.get('/:campusId', async (req, res) => {
    try {
        const maps = await Map.find({ campusId: req.params.campusId });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

