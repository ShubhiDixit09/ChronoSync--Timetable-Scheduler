const express = require('express');
const router = express.Router();
const {
  generate,
  status,
  candidates,
  approve,
  published,
} = require('../controllers/timetableController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.post('/generate', protect, requireRole('admin'), generate);
router.get('/:jobId/status', protect, requireRole('admin'), status);
router.get('/:jobId/candidates', protect, requireRole('admin'), candidates);
router.post('/:id/approve', protect, requireRole('admin'), approve);
router.get('/published', protect, published); // any authenticated role can view published timetable

module.exports = router;
