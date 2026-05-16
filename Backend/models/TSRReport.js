const mongoose = require('mongoose');

const TSRReportSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    draftContent: { type: String, required: true },
    version: { type: Number, default: 1 },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'approved', 'rejected'],
        default: 'draft'
    },
    aiGenerated: { type: Boolean, default: false },
    approvalNotes: { type: String },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TSRReport', TSRReportSchema);
