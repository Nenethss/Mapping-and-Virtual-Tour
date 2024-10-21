import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads
import { createMarker, getMarker, getMarkersByCampusId } from '../controllers/markerController.js';

// Set up multer to save uploaded files in the 'images/360' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/360'); // Save files to images/360 folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original file name
    }
});

const upload = multer({ storage }); // Create multer instance with storage configuration

const router = express.Router();

router.post('/', upload.single('image'), createMarker);  // Route for creating a marker with image upload
router.get('/:id', getMarker);    // Route for getting a single marker by ID
router.get('/campus/:campusId', getMarkersByCampusId); // Route for getting markers by campus ID

export default router;









