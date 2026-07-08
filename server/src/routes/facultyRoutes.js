const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/facultyController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getOne);
router.post('/', protect, requireRole('admin'), ctrl.create);
router.put('/:id', protect, requireRole('admin', 'teacher'), ctrl.update); // teachers can update their own preferences
router.delete('/:id', protect, requireRole('admin'), ctrl.remove);

module.exports = router;
