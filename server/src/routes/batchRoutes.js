const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/batchController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getOne);
router.post('/', protect, requireRole('admin'), ctrl.create);
router.put('/:id', protect, requireRole('admin'), ctrl.update);
router.delete('/:id', protect, requireRole('admin'), ctrl.remove);

module.exports = router;
