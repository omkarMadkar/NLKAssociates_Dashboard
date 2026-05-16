const express = require('express');
const router = express.Router();
const { createCase, getCases, getCaseById, updateCaseStatus } = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCases);
router.post('/', protect, createCase);
router.get('/:id', protect, getCaseById);
router.put('/:id/status', protect, updateCaseStatus);

module.exports = router;
