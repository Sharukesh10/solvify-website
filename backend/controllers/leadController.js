const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ success: true, message: "Your submission has been received! We'll reach out shortly.", data: lead });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { role, city, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (city) filter.city = new RegExp(city, "i");

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), leads });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch leads." });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Lead deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete lead." });
  }
};
