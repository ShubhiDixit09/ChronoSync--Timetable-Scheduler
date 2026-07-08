const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    subjectsQualified: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    maxLoadPerWeek: { type: Number, default: 18 },
    leaveCalendar: [{ date: Date, reason: String }],
    preferences: {
      preferredSlots: [{ day: String, period: Number }],
      preferredSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
      avoidBackToBack: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);
