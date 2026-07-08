const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['classroom', 'lab'], required: true },
    capacity: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }, // null = shared/common
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
