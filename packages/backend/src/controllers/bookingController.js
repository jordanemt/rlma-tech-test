import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bookingService from '../services/bookingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAllBookingsByRoomingListId({ roomingListId }) {
  return await bookingService.getAllBookingsByRoomingListId({ roomingListId });
}

async function importBookings() {
  const filePath = path.resolve(__dirname, '../data/bookings.json');
  const bookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const booking of bookings) {
    await bookingService.createBooking(booking);
  }
}

export default {
  getAllBookingsByRoomingListId,
  importBookings,
};
