const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  program: { type: String, required: true },
  facultyId: { type: String, required: true },
  facultyName: { type: String, required: true },
  subject: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true }
});

// 🔐 Prevent duplicate room booking at DB level
scheduleSchema.index({ day: 1, time: 1, room: 1 }, { unique: true });

// 🔐 Prevent faculty double booking
scheduleSchema.index({ day: 1, time: 1, facultyId: 1 }, { unique: true });

module.exports = mongoose.model("Schedule", scheduleSchema);