// validationSchemas.js
import Joi from 'joi';

const mapSchema = Joi.object({
  filename: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  campusId: Joi.string().optional() // Assuming it's a string representation of an ObjectId
});

const markerSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  mapId: Joi.string().required(),
});

// Export the validation functions
export const validateMap = (data) => mapSchema.validate(data);
export const validateMarker = (data) => markerSchema.validate(data);
