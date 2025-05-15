import { readData, writeData } from "../utils/dataHelpers.js";

// GET all tribes
export const getTribes = async (req, res, next) => {
  try {
    const tribes = await readData("tribes");
    res.json(tribes);
    console.log("Tribes found:", tribes);
  } catch (error) {
    next(error);
  }
};

// GET one tribe by ID
export const getTribeById = async (req, res, next) => {
  try {
    const tribes = await readData("tribes");
    const tribe = tribes.find((t) => t.id === parseInt(req.params.id));

    if (!tribe) {
      return res.status(404).json({ message: "Tribe not found" });
    }
    console.log("Tribe found:", tribe);
    res.json(tribe);
  } catch (error) {
    next(error);
  }
};

// POST a new tribe
export const createTribe = async (req, res, next) => {
  try {
    const tribes = await readData("tribes");
    const newId =
      tribes.length > 0 ? Math.max(...tribes.map((t) => t.id)) + 1 : 1;

    const newTribe = {
      id: newId,
      ...req.body,
    };

    tribes.push(newTribe);
    await writeData("tribes", tribes);

    res.status(201).json(newTribe);
    console.log("New tribe created:", newTribe);
  } catch (error) {
    next(error);
  }
};

// PUT update a tribe
export const updateTribe = async (req, res, next) => {
  try {
    const tribes = await readData('tribes');
    const index = tribes.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ message: 'Tribe not found' });
    }
    
    const updatedTribe = { 
      ...tribes[index], 
      ...req.body,
      id: tribes[index].id
    };
    
    tribes[index] = updatedTribe;
    await writeData('tribes', tribes);
    
    res.json(updatedTribe);
  } catch (error) {
    next(error);
  }
};

// DELETE a tribe
export const deleteTribe = async (req, res, next) => {
  try {
    let tribes = await readData('tribes');
    const initialLength = tribes.length;
    
    tribes = tribes.filter(t => t.id !== parseInt(req.params.id));
    
    if (tribes.length === initialLength) {
      return res.status(404).json({ message: 'Tribe not found' });
    }
    
    await writeData('tribes', tribes);
    res.json({ message: 'Tribe deleted successfully' });
  } catch (error) {
    next(error);
  }
};