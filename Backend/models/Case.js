const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    caseId: { type: String, required: true, unique: true }, // auto: NLK-YYYY-XXXXX
    bank: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    status: {
        type: String,
        enum: ['created', 'assigned', 'in_progress', 'draft_ready', 'under_review', 'approved', 'shared_to_bank'],
        default: 'created'
    },
    assignedTo: { type: String },
    createdBy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Case', CaseSchema);
