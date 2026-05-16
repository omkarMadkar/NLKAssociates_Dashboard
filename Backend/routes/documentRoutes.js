const express = require('express');
const router = express.Router();
const { uploadDocument, getDocuments } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/upload/:caseId', protect, upload.single('file'), uploadDocument);
router.get('/:caseId', protect, getDocuments);

module.exports = router;
