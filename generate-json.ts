import fs from 'fs';
import path from 'path';
import { trainings } from './_data/trainings';
import { programItems, programCategories } from './_data/programs';

const dataPath = path.join(process.cwd(), '_data');

// Write trainings
fs.writeFileSync(
  path.join(dataPath, 'trainings.json'),
  JSON.stringify(trainings, null, 2)
);

// We need to clean up icons from categories before stringifying
const cleanCategories = programCategories.map(cat => {
  const { icon, ...rest } = cat;
  return { ...rest, iconName: icon.displayName || icon.name || 'Box' };
});

const programsData = {
  categories: cleanCategories,
  items: programItems
};

fs.writeFileSync(
  path.join(dataPath, 'programs.json'),
  JSON.stringify(programsData, null, 2)
);

console.log('Successfully generated JSON data files');
