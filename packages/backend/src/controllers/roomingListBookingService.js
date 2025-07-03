import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import roomingListBookingsService from '../services/roomingListBookingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importRoomingListBookings() {
  const filePath = path.resolve(
    __dirname,
    '../data/rooming-list-bookings.json'
  );
  const roomingListBookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const roomingListBooking of roomingListBookings) {
    await roomingListBookingsService.createRoomingListBooking(
      roomingListBooking
    );
  }
}

export default {
  importRoomingListBookings,
};
