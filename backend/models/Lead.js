const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ["Player", "Turf Owner", "Investor", "Collaborator", "Student"],
    },
    turfName: { type: String, trim: true },
    location: { type: String, trim: true },
    interest: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
