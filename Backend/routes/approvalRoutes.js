const express = require('express');
const router = express.Router();
const { getPending, approveTSR, rejectTSR } = require('../controllers/approvalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/pending', protect, getPending);
router.post('/:id/approve', protect, approveTSR);
router.post('/:id/reject', protect, rejectTSR);

module.exports = router;
