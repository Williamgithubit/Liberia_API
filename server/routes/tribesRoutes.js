import express from 'express';
import *as tribesController from '../controllers/tribesController.js';

const tribesRouter = express.Router();

// Get all tribes
tribesRouter.get('/tribes', tribesController.getTribes);

// GET one tribe by ID
tribesRouter.get('/tribes/:id', tribesController.getTribeById);

// POST a new tribe
tribesRouter.post('/tribes', tribesController.createTribe);

// PUT update a tribe
tribesRouter.put('/tribes/:id', tribesController.updateTribe);

// DELETE a tribe
tribesRouter.delete('/tribes/:id', tribesController.deleteTribe);

export default tribesRouter;