import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '_data');

// Generalized functions to read and write JSON data
export function getJsonData<T>(fileName: string): T | null {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return null;
  }
}

export function saveJsonData<T>(fileName: string, data: T): boolean {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
}

// Model-specific getters/setters
export function getTrainings() {
  return getJsonData<any[]>('trainings.json') || [];
}

export function saveTrainings(trainings: any[]) {
  return saveJsonData('trainings.json', trainings);
}

export function getPrograms() {
  return getJsonData<any>('programs.json') || { categories: [], items: [] };
}

export function savePrograms(programs: any) {
  return saveJsonData('programs.json', programs);
}

export function getAnnouncements() {
  return getJsonData<any[]>('announcements.json') || [];
}

export function saveAnnouncements(announcements: any[]) {
  return saveJsonData('announcements.json', announcements);
}
