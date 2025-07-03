import { Router } from 'express';
import bookingController from '../controllers/bookingController.js';
import roomingListBookingService from '../controllers/roomingListBookingService.js';
import roomingListController from '../controllers/roomingListController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    await roomingListController.truncateRoomingLists();

    await roomingListController.importRoomingLists();
    await bookingController.importBookings();
    await roomingListBookingService.importRoomingListBookings();

    res.status(200).json({ message: 'Imported data successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
