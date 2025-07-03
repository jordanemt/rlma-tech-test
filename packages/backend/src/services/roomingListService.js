import getClient from '../common/db.js';

async function getFilteredRoomingLists({ search, status, sortBy, sortOrder }) {
  const client = getClient();
  let query = `SELECT * FROM rooming_list WHERE 1=1`;
  const params = [];

  if (status) {
    const statuses = Array.isArray(status) ? status : status.split(',');
    const placeholders = statuses
      .map((_, i) => `$${params.length + i + 1}`)
      .join(', ');
    query += ` AND status IN (${placeholders})`;
    params.push(...statuses);
  }

  if (search) {
    query += ` AND (event_name ILIKE $${params.length + 1}`;
    query += ` OR rfp_name ILIKE $${params.length + 2}`;
    query += ` OR agreement_type ILIKE $${params.length + 3})`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (sortBy && sortOrder) {
    query += ` ORDER BY ${sortBy} ${sortOrder}`;
  }

  const res = await client.query(query, params);
  const roomingLists = res.rows;

  for (const roomingList of roomingLists) {
    const earliestCheckInDateRes = await client.query(
      'SELECT MIN(check_in_date) AS earliest_check_in_date, MAX(check_out_date) AS latest_check_out_date ' +
        'FROM booking b ' +
        'INNER JOIN rooming_list_booking rlb ON b.booking_id = rlb.booking_id ' +
        'WHERE rlb.rooming_list_id = $1',
      [roomingList.rooming_list_id]
    );
    roomingList.start_date =
      earliestCheckInDateRes.rows[0].earliest_check_in_date;
    roomingList.end_date = earliestCheckInDateRes.rows[0].latest_check_out_date;

    const bookingsRes = await client.query(
      'SELECT COUNT(*) AS bookings_count FROM rooming_list_booking WHERE rooming_list_id = $1',
      [roomingList.rooming_list_id]
    );

    roomingList.bookings_count = parseInt(
      bookingsRes.rows[0].bookings_count,
      10
    );
  }

  return roomingLists;
}

async function createRoomingList(roomingList) {
  const client = getClient();
  const res = await client.query(
    'INSERT INTO rooming_list (event_id, event_name, hotel_id, rfp_name, cut_off_date, status, agreement_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      roomingList.event_id,
      roomingList.event_name,
      roomingList.hotel_id,
      roomingList.rfp_name,
      roomingList.cut_off_date,
      roomingList.status,
      roomingList.agreement_type,
    ]
  );
  return res.rows[0];
}

export async function truncateRoomingLists() {
  const client = getClient();
  await client.query('TRUNCATE TABLE rooming_list RESTART IDENTITY CASCADE');
  await client.query('TRUNCATE TABLE booking RESTART IDENTITY CASCADE');
}

export default {
  getFilteredRoomingLists,
  createRoomingList,
  truncateRoomingLists,
};
