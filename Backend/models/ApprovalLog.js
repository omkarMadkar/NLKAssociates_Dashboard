const mongoose = require('mongoose');

const ApprovalLogSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'TSRReport', required: true },
    reportType: { type: String, required: true },
    action: {
        type: String,
        enum: ['approved', 'rejected', 'changes_requested'],
        required: true
    },
    doneBy: { type: String, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApprovalLog', ApprovalLogSchema);
