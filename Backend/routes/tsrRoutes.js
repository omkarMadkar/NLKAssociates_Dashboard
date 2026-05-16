const express = require('express');
const router = express.Router();
const { generateTSR, getTSR, saveDraft, submitTSR } = require('../controllers/tsrController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate/:caseId', protect, generateTSR);
router.get('/:caseId', protect, getTSR);
router.put('/:id', protect, saveDraft);
router.post('/:id/submit', protect, submitTSR);

module.exports = router;
