const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }, // set if role === 'teacher'
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },     // set if role === 'student'
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
