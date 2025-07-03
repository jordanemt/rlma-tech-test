import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import roomingListService from '../services/roomingListService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getFilteredRoomingLists({ search, status, sortBy, sortOrder }) {
  return await roomingListService.getFilteredRoomingLists({
    search,
    status,
    sortBy,
    sortOrder,
  });
}

async function importRoomingLists() {
  const filePath = path.resolve(__dirname, '../data/rooming-lists.json');
  const roomingLists = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const rooming_list of roomingLists) {
    await roomingListService.createRoomingList(rooming_list);
  }
}

async function truncateRoomingLists() {
  return await roomingListService.truncateRoomingLists();
}

export default {
  getFilteredRoomingLists,
  importRoomingLists,
  truncateRoomingLists,
};
