const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema(
  {
    day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], required: true },
    period: { type: Number, required: true }, // 1..N periods per day
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true },   // "10:00"
    isFixedSlot: { type: Boolean, default: false }, // reserved for special/fixed classes
  },
  { timestamps: true }
);

timeSlotSchema.index({ day: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
