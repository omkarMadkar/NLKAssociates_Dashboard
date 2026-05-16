const Document = require('../models/Document');

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const doc = await Document.create({
      caseId: req.params.caseId,
      docType: req.body.docType || 'General',
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      uploadedBy: req.user.role,
    });

    res.status(201).json({ success: true, document: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ caseId: req.params.caseId }).sort({ uploadedAt: -1 });
    res.json({ success: true, documents: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { uploadDocument, getDocuments };
