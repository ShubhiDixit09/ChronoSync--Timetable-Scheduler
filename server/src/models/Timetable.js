const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', required: true },
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['draft', 'pending-approval', 'published', 'rejected'],
      default: 'draft',
    },
    generationJobId: { type: String },
    fitnessScore: { type: Number },
    generationNumber: { type: Number },
    hardViolations: { type: Number, default: 0 },
    assignments: [assignmentSchema],
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timetable', timetableSchema);
