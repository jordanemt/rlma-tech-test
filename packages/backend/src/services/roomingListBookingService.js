import getClient from '../common/db.js';

async function createRoomingListBooking(roomingListBooking) {
  const client = getClient();
  const res = await client.query(
    'INSERT INTO rooming_list_booking (rooming_list_id, booking_id) VALUES ($1, $2) RETURNING *',
    [roomingListBooking.rooming_list_id, roomingListBooking.booking_id]
  );
  return res.rows[0];
}

export default {
  createRoomingListBooking,
};
