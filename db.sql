CREATE TABLE IF NOT EXISTS rooming_list (
  rooming_list_id SERIAL PRIMARY KEY,
  event_id INT NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  hotel_id INT NOT NULL,
  rfp_name VARCHAR(255) NOT NULL,
  cut_off_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('archived', 'completed', 'received', 'confirmed')),
  agreement_type VARCHAR(20) NOT NULL CHECK (agreement_type IN ('leisure', 'staff', 'artistic'))
);

CREATE TABLE IF NOT EXISTS booking (
  booking_id SERIAL PRIMARY KEY,
  hotel_id INT NOT NULL,
  event_id INT NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_phone_number VARCHAR(20) NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS rooming_list_booking (
  rooming_list_id INT NOT NULL REFERENCES rooming_list(rooming_list_id),
  booking_id INT NOT NULL REFERENCES booking(booking_id),
  PRIMARY KEY (rooming_list_id, booking_id)
);
