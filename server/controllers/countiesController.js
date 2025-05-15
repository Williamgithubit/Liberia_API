import { readData, writeData } from "../utils/dataHelpers.js";

// Get all counties
export const getCounties = async(req, res, next) => {
  try {
    const counties = await readData("counties");
    res.json(counties);
    console.log("Counties found:", counties);
  } catch (error) {
    next(error);
  }
}

// GET one county by ID
export const getCountyById = async(req, res, next) => {
  try {
    const counties = await readData("counties");
    const county = counties.find(c => c.id === parseInt(req.params.id));
    
    if (!county) {
      return res.status(404).json({ message: "County not found" });
    }
    console.log("County found:", county);
    res.json(county);
  } catch (error) {
    next(error);
  }
}

//POST a new county
export const createCounty = async(req, res, next) => {
  try {
    const counties = await readData("counties");
    const newId = counties.length > 0 ? Math.max(...counties.map(c => c.id)) + 1 : 1;
    
    const newCounty = {
      id: newId,
      ...req.body
    };
    
    counties.push(newCounty);
    await writeData("counties", counties);
    
    res.status(201).json(newCounty);
    console.log("New county created:", newCounty);
  } catch (error) {
    next(error);
  }
}

// PUT update a county
export const updateCounty = async(req, res, next) => {
try {
    const counties = await readData('counties');
    const index = counties.findIndex(c => c.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ message: 'County not found' });
    }
    
    const updatedCounty = { 
      ...counties[index], 
      ...req.body,
      id: counties[index].id // Prevent ID change
    };
    
    counties[index] = updatedCounty;
    await writeData('counties', counties);
    
    res.json(updatedCounty);
    console.log("County updated:", updatedCounty);
  } catch (error) {
    next(error);
  }
}
// DELETE a county
export const deleteCounty = async(req, res, next) => {
  try {
    const counties = await readData("counties");
    const index = counties.findIndex(c => c.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ message: "County not found" });
    }
    
    counties.splice(index, 1);
    await writeData("counties", counties);
    
    res.status(204).send();
    console.log("County deleted:", req.params.id);
  } catch (error) {
    next(error);
  }
}