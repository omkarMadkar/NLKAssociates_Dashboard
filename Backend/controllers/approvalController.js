const TSRReport = require('../models/TSRReport');
const ApprovalLog = require('../models/ApprovalLog');
const Case = require('../models/Case');

// GET PENDING TSRs (senior only)
const getPending = async (req, res) => {
  try {
    if (req.user.role !== 'senior') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const pending = await TSRReport.find({ status: 'submitted' }).populate('caseId');
    res.json({ success: true, pending });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// APPROVE
const approveTSR = async (req, res) => {
  try {
    if (req.user.role !== 'senior') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const tsr = await TSRReport.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    await Case.findByIdAndUpdate(tsr.caseId, { status: 'approved' });
    await ApprovalLog.create({
      caseId: tsr.caseId, reportId: tsr._id,
      reportType: 'TSR', action: 'approved',
      doneBy: req.user.role, notes: req.body.notes || '',
    });
    res.json({ success: true, message: 'TSR Approved' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// REJECT / REQUEST CHANGES
const rejectTSR = async (req, res) => {
  try {
    if (req.user.role !== 'senior') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const tsr = await TSRReport.findByIdAndUpdate(req.params.id, { status: 'rejected', approvalNotes: req.body.notes }, { new: true });
    await Case.findByIdAndUpdate(tsr.caseId, { status: 'in_progress' });
    await ApprovalLog.create({
      caseId: tsr.caseId, reportId: tsr._id,
      reportType: 'TSR', action: 'changes_requested',
      doneBy: req.user.role, notes: req.body.notes || '',
    });
    res.json({ success: true, message: 'Changes Requested' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getPending, approveTSR, rejectTSR };
