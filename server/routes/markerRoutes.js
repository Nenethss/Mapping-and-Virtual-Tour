// // // server/routes/markerRoutes.js
// // import express from 'express';
// // import { getMarkers, saveMarker } from '../controllers/markerController.js';
// // import multer from 'multer';
// // import path from 'path';

// // // Configure multer for marker uploads
// // const markerStorage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'images/360/'); // Save marker images to images folder
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const markerUpload = multer({
// //   storage: markerStorage,
// //   fileFilter: (req, file, cb) => {
// //     const filetypes = /jpeg|jpg|png/;
// //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// //     const mimetype = filetypes.test(file.mimetype);
// //     if (mimetype && extname) {
// //       return cb(null, true);
// //     } else {
// //       cb('Error: Only images are allowed');
// //     }
// //   },
// //   limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
// // });

// // const router = express.Router();

// // router.get('/', getMarkers); // Fetch all markers
// // router.post('/', markerUpload.single('image'), saveMarker); // Save a new marker

// // export default router;

// // markerController.js
// // markerRoutes.js
// // markerRoutes.js
// import express from 'express';
// import { addMarker, getMarkersForMap, getAllMarkers } from '../controllers/markerController.js';

// const router = express.Router();

// // Route to add a new marker
// router.post('/', addMarker);

// // Route to get all markers for a specific map
// router.get('/:mapId', getMarkersForMap);

// // Route to get all markers
// router.get('/', getAllMarkers);

// // Default export of the router
// export default router;
// markerRoutes.js
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









