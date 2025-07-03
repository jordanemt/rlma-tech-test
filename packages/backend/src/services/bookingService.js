import getClient from '../common/db.js';

async function getAllBookingsByRoomingListId({ roomingListId }) {
  const client = getClient();
  const res = await client.query(
    'SELECT * FROM booking b ' +
      'INNER JOIN rooming_list_booking rlb ON b.booking_id = rlb.booking_id ' +
      'WHERE rlb.rooming_list_id = $1',
    [roomingListId]
  );
  return res.rows;
}

async function createBooking(booking) {
  const client = getClient();
  const res = await client.query(
    'INSERT INTO booking (hotel_id, event_id, guest_name, guest_phone_number, check_in_date, check_out_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      booking.hotel_id,
      booking.event_id,
      booking.guest_name,
      booking.guest_phone_number,
      booking.check_in_date,
      booking.check_out_date,
    ]
  );
  return res.rows[0];
}

export default {
  getAllBookingsByRoomingListId,
  createBooking,
};
