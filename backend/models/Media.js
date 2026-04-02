const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    label: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
