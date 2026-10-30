const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest
} = require('../controllers/testController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllTests);
router.get('/:id', getTestById);
router.post('/', protect, admin, createTest);
router.put('/:id', protect, admin, updateTest);
router.delete('/:id', protect, admin, deleteTest);

module.exports = router;