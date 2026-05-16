const TSRReport = require('../models/TSRReport');
const Case = require('../models/Case');
const Document = require('../models/Document');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GENERATE AI DRAFT
const generateTSR = async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.caseId).populate('clientId').populate('propertyId');
    if (!caseData) return res.status(404).json({ success: false, message: 'Case not found' });

    const docs = await Document.find({ caseId: req.params.caseId });
    const docList = docs.map(d => d.originalName).join(', ') || 'No documents uploaded';

    const prompt = `You are a senior Indian legal advocate. Generate a formal Title Search Report (TSR) in structured legal format for the following property:

Client: ${caseData.clientId?.name || 'N/A'}
Bank: ${caseData.bank}
Property Address: ${caseData.propertyId?.address || 'N/A'}
Survey No: ${caseData.propertyId?.surveyNo || 'N/A'}
Village: ${caseData.propertyId?.village || 'N/A'}
Taluka: ${caseData.propertyId?.taluka || 'N/A'}
District: ${caseData.propertyId?.district || 'N/A'}
Documents Available: ${docList}

Format the TSR with these sections:
1. REPORT PARTICULARS
2. PROPERTY DESCRIPTION
3. OWNERSHIP HISTORY (last 30 years)
4. ENCUMBRANCES & CHARGES
5. LEGAL OBSERVATIONS
6. TITLE OPINION

Use formal Indian legal language. Be thorough and professional.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
    });

    const draftContent = completion.choices[0].message.content;

    // Check if TSR already exists for this case
    let tsr = await TSRReport.findOne({ caseId: req.params.caseId });
    if (tsr) {
      tsr.draftContent = draftContent;
      tsr.version = (tsr.version || 1) + 1;
      tsr.aiGenerated = true;
      tsr.status = 'draft';
      await tsr.save();
    } else {
      tsr = await TSRReport.create({
        caseId: req.params.caseId, draftContent,
        version: 1, status: 'draft', aiGenerated: true,
        createdBy: req.user.role,
      });
    }

    // Update case status
    await Case.findByIdAndUpdate(req.params.caseId, { status: 'draft_ready' });

    res.json({ success: true, tsr });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET TSR FOR CASE
const getTSR = async (req, res) => {
  try {
    const tsr = await TSRReport.findOne({ caseId: req.params.caseId });
    res.json({ success: true, tsr });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// SAVE DRAFT EDITS
const saveDraft = async (req, res) => {
  try {
    const tsr = await TSRReport.findByIdAndUpdate(
      req.params.id,
      { draftContent: req.body.draftContent },
      { new: true }
    );
    res.json({ success: true, tsr });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// SUBMIT TO NLK SIR
const submitTSR = async (req, res) => {
  try {
    const tsr = await TSRReport.findByIdAndUpdate(
      req.params.id,
      { status: 'submitted' },
      { new: true }
    );
    await Case.findByIdAndUpdate(tsr.caseId, { status: 'under_review' });
    res.json({ success: true, tsr });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { generateTSR, getTSR, saveDraft, submitTSR };
