const mongoose = require('mongoose');

const constraintSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['hard', 'soft'], required: true },
    scope: { type: String, enum: ['global', 'department', 'faculty'], default: 'global' },
    scopeRef: { type: mongoose.Schema.Types.ObjectId }, // Department or Faculty id, if scoped
    name: { type: String, required: true }, // e.g. "no-double-booking", "prefer-morning-slots"
    weight: { type: Number, default: 1 }, // used by fitness function for soft constraints
    payload: { type: mongoose.Schema.Types.Mixed }, // rule-specific config
  },
  { timestamps: true }
);

module.exports = mongoose.model('Constraint', constraintSchema);
