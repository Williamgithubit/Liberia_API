import express from 'express';
import *as countiesController from "../controllers/countiesController.js"

const countiesRouter = express.Router();

//Get all Counties
countiesRouter.get('/counties', countiesController.getCounties);

//Create a counties 
countiesRouter.post('/counties', countiesController.createCounty);

// GET one county by ID
countiesRouter.get('/counties/:id', countiesController.getCountyById);

// Update a county
countiesRouter.put('/counties/:id', countiesController.updateCounty);

// Delete a county
countiesRouter.delete('/counties/:id', countiesController.deleteCounty);

export default countiesRouter;





