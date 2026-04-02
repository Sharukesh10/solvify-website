const Media = require("../models/Media");
const fs = require("fs");
const path = require("path");

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });
    const { type, label } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const media = new Media({ type, label, imageUrl, filename: req.file.filename });
    await media.save();

    res.status(201).json({ success: true, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: "Upload failed." });
  }
};

exports.getMedia = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch media." });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: "Not found." });

    const filePath = path.join(__dirname, "../uploads", media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await media.deleteOne();
    res.json({ success: true, message: "Media deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete media." });
  }
};
