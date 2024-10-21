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


