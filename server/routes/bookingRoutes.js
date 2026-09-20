const express = require('express');
const router = express.Router();
const {
  createBooking,
  getCustomerBookings,
  getBookingById,
  cancelBooking,
  getTechnicianRequests,
  acceptBooking,
  rejectBooking,
  getTechnicianJobs,
  startJob,
  completeJob,
  getBookingHistory
} = require('../controllers/bookingController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, authorizeRoles('customer'), createBooking);

router.get('/my', protect, authorizeRoles('customer'), getCustomerBookings);
router.get('/history', protect, getBookingHistory);
router.get('/requests', protect, authorizeRoles('technician'), getTechnicianRequests);
router.get('/jobs', protect, authorizeRoles('technician'), getTechnicianJobs);

router.get('/:id', protect, getBookingById);

router.put('/:id/cancel', protect, authorizeRoles('customer'), cancelBooking);
router.put('/:id/accept', protect, authorizeRoles('technician'), acceptBooking);
router.put('/:id/reject', protect, authorizeRoles('technician'), rejectBooking);
router.put('/:id/start', protect, authorizeRoles('technician'), startJob);
router.put('/:id/complete', protect, authorizeRoles('technician'), completeJob);

module.exports = router;
