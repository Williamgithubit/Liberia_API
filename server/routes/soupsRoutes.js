import express from 'express';
import *as soupsController from '../controllers/soupsController.js';

const soupsRouter = express.Router();

// Get all soups
soupsRouter.get('/soups', soupsController.getSoups);

// GET one soup by ID
soupsRouter.get('/soups/:id', soupsController.getSoupById);

// POST a new soup
soupsRouter.post('/soups', soupsController.createSoup);

// PUT update a soup
soupsRouter.put('/soups/:id', soupsController.updateSoup);

// DELETE a soup
soupsRouter.delete('/soups/:id', soupsController.deleteSoup);

export default soupsRouter;