import axios from 'axios';
import { API_BASE_URL } from '../common/constants.js';

export async function getAllBookingsByRoomingListId({ roomingListId }) {
  const response = await axios.get(
    `${API_BASE_URL}/rooming-lists/${roomingListId}/bookings`
  );
  return response.data;
}
