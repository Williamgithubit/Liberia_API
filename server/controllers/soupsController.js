import { readData, writeData } from "../utils/dataHelpers.js";

// Get all soups
export const getSoups = async (req, res, next) => {
  try {
    const soups = await readData("soups");
    res.json(soups);
    console.log("Soups found:", soups);
  } catch (error) {
    next(error);
  }
};

// GET one soup by ID
export const getSoupById = async (req, res, next) => {
  try {
    const soups = await readData("soups");
    const soup = soups.find((s) => s.id === parseInt(req.params.id));

    if (!soup) {
      return res.status(404).json({ message: "Soup not found" });
    }
    console.log("Soup found:", soup);
    res.json(soup);
  } catch (error) {
    next(error);
  }
};

// POST a new soup
export const createSoup = async (req, res, next) => {
  try {
    const soups = await readData("soups");
    const newId =
      soups.length > 0 ? Math.max(...soups.map((s) => s.id)) + 1 : 1;

    const newSoup = {
      id: newId,
      ...req.body,
    };

    soups.push(newSoup);
    await writeData("soups", soups);

    res.status(201).json(newSoup);
    console.log("New soup created:", newSoup);
  } catch (error) {
    next(error);
  }
};

// PUT update a soup
export const updateSoup = async (req, res, next) => {
  try {
    const soups = await readData("soups");
    const index = soups.findIndex((s) => s.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: "Soup not found" });
    }

    const updatedSoup = {
      ...soups[index],
      ...req.body,
    };

    soups[index] = updatedSoup;
    await writeData("soups", soups);

    res.json(updatedSoup);
    console.log("Soup updated:", updatedSoup);
  } catch (error) {
    next(error);
  }
};
// DELETE a soup
export const deleteSoup = async (req, res, next) => {
  try {
    const soups = await readData("soups");
    const index = soups.findIndex((s) => s.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: "Soup not found" });
    }

    soups.splice(index, 1);
    await writeData("soups", soups);

    res.status(204).send();
    console.log("Soup deleted");
  } catch (error) {
    next(error);
  }
};