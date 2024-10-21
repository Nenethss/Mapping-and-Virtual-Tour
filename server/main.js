// // server/main.js
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import fs from 'fs';
// import markerRoutes from './routes/markerRoutes.js';
// import mapRoutes from './routes/mapRoutes.js';

// // Setup __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json()); // To parse incoming JSON requests

// // MongoDB connection
// const db_password = 'admin123'; // DB Pass
// const mongoURI = `mongodb+srv://admin:${encodeURIComponent(db_password)}@cluster0.qd6mw.mongodb.net/mapdb?retryWrites=true&w=majority`;

// mongoose.connect(mongoURI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("Error connecting to MongoDB:", err));

// // Serve static files for images and maps
// app.use('/server/images/360', express.static(join(__dirname, 'images/360')));
// app.use('/server/images/maps', express.static(join(__dirname, 'images/maps')));

// // Use routes
// app.use('/server/pins', markerRoutes); // Marker routes
// app.use('/server/maps', mapRoutes); // Map routes

// // Start the server on port 3002
// app.listen(3002, () => {
//   console.log('Server running on http://localhost:3002');
// });
import express from 'express';
import mongoose from 'mongoose';
import campusRoutes from './routes/campusRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import markerRoutes from './routes/markerRoutes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Route registration
app.use('/api/campus', campusRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/markers', markerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

