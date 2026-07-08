const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    semester: { type: Number, required: true },
    type: { type: String, enum: ['lecture', 'lab'], default: 'lecture' },
    classesPerWeek: { type: Number, required: true },
    durationSlots: { type: Number, default: 1 }, // number of consecutive periods per session
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subject', subjectSchema);
