const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    docType: { type: String, required: true },
    originalName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedBy: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);
