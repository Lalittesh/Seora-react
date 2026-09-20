const express = require('express');
const router = express.Router();
const {
  getTechnicians,
  getTechnicianById,
  getMyProfile,
  updateMyProfile
} = require('../controllers/technicianController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTechnicians);

router.route('/me')
  .get(protect, authorizeRoles('technician'), getMyProfile)
  .put(protect, authorizeRoles('technician'), updateMyProfile);

router.route('/:id')
  .get(getTechnicianById);

module.exports = router;
