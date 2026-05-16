const Case = require('../models/Case');

const getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalCases, pendingApproval, approvedToday, recentCases] = await Promise.all([
      Case.countDocuments(),
      Case.countDocuments({ status: 'under_review' }),
      Case.countDocuments({ status: 'approved', updatedAt: { $gte: today } }),
      Case.find().populate('clientId').sort({ createdAt: -1 }).limit(10),
    ]);

    // Cases by bank
    const bankStats = await Case.aggregate([
      { $group: { _id: '$bank', count: { $sum: 1 } } }
    ]);

    // Cases by status
    const statusStats = await Case.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const activeBanks = bankStats.length;

    res.json({
      success: true,
      stats: { totalCases, pendingApproval, approvedToday, activeBanks },
      bankStats,
      statusStats,
      recentCases,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStats };
