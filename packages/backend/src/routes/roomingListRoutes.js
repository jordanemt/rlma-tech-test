import { Router } from 'express';
import bookingController from '../controllers/bookingController.js';
import roomingListController from '../controllers/roomingListController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.get('/filter', verifyToken, async (req, res) => {
  try {
    const { search, status, sortBy, sortOrder } = req.query;
    const roomingLists = await roomingListController.getFilteredRoomingLists({
      search,
      status,
      sortBy,
      sortOrder,
    });
    res.status(200).json(roomingLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/bookings', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await bookingController.getAllBookingsByRoomingListId({
      roomingListId: id,
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
