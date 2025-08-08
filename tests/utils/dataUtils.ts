import * as fs from 'fs';
import * as path from 'path';

const dataFilePath = path.join(__dirname, '../data/sharedData.json');

/**
 * Writes data to a shared JSON file.
 * @param data The data object to be stored.
 */
export function writeSharedData(data: object): void {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        console.log(`Data successfully written to ${dataFilePath}`);
    } catch (error) {
        console.error('Failed to write shared data:', error);
    }
}

/**
 * Reads data from a shared JSON file.
 * @returns The parsed data object or null if the file does not exist or is invalid.
 */
export function readSharedData(): any | null {
    if (!fs.existsSync(dataFilePath)) {
        console.error(`Shared data file not found at ${dataFilePath}`);
        return null;
    }

    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Failed to read or parse shared data:', error);
        return null;
    }
}