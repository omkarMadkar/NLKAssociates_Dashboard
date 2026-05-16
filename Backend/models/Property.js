const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    address: { type: String, required: true },
    surveyNo: { type: String },
    village: { type: String },
    taluka: { type: String },
    district: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
