// // server/models/Marker.js
// import mongoose from 'mongoose';

// const markerSchema = new mongoose.Schema({
//   lat: Number,
//   lng: Number,
//   title: String,
//   description: String,
//   image: String,
//   mapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
// });

// const Marker = mongoose.model('Marker', markerSchema);
// export default Marker;


// Marker.js
import mongoose from 'mongoose';

const markerSchema = new mongoose.Schema({
    campusId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    title: { type: String, required: true },           // New field
    description: { type: String, required: true },     // New field
    image: { type: String, required: true },           // New field for image file path
}, { timestamps: true });

const Marker = mongoose.model('Marker', markerSchema);
export default Marker;


