const mongoose = require('mongoose');

const BankShareSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'TSRReport', required: true },
    sharedToBank: { type: String, required: true },
    sharedBy: { type: String, required: true },
    sharedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BankShare', BankShareSchema);
