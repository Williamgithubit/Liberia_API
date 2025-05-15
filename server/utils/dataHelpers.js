import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const readData = async (file) => {
  const dataPath = path.join(__dirname, `../data/${file}.json`);
  try {
    const rawData = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    throw new Error(`Error reading ${file} data: ${error.message}`);
  }
};

export const writeData = async (file, data) => {
  const dataPath = path.join(__dirname, `../data/${file}.json`);
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing ${file} data: ${error.message}`);
  }
};