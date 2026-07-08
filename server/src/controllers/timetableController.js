const crypto = require('crypto');
const Timetable = require('../models/Timetable');
const { enqueueGenerationJob, getJobStatus } = require('../jobs/jobQueue');

// POST /api/timetable/generate
const generate = async (req, res, next) => {
  try {
    const jobId = crypto.randomUUID();
    // req.body carries the scope to generate for, e.g. { departmentId, semester }
    enqueueGenerationJob(jobId, req.body);
    res.status(202).json({ jobId, message: 'Generation started' });
  } catch (err) {
    next(err);
  }
};

// GET /api/timetable/:jobId/status
const status = async (req, res, next) => {
  try {
    const jobStatus = getJobStatus(req.params.jobId);
    if (!jobStatus) return res.status(404).json({ message: 'Job not found' });
    res.json(jobStatus);
  } catch (err) {
    next(err);
  }
};

// GET /api/timetable/:jobId/candidates
const candidates = async (req, res, next) => {
  try {
    const results = await Timetable.find({ generationJobId: req.params.jobId }).sort({
      fitnessScore: -1,
    });
    res.json(results);
  } catch (err) {
    next(err);
  }
};

// POST /api/timetable/:id/approve
const approve = async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      { status: 'published', approvedBy: req.user._id },
      { new: true }
    );
    if (!timetable) return res.status(404).json({ message: 'Not found' });
    res.json(timetable);
  } catch (err) {
    next(err);
  }
};

// GET /api/timetable/published?batch=<id>
const published = async (req, res, next) => {
  try {
    const filter = { status: 'published' };
    const timetable = await Timetable.findOne(filter).sort({ createdAt: -1 });
    if (!timetable) return res.status(404).json({ message: 'No published timetable yet' });

    if (req.query.batch) {
      timetable.assignments = timetable.assignments.filter(
        (a) => String(a.batch) === req.query.batch
      );
    }
    res.json(timetable);
  } catch (err) {
    next(err);
  }
};

module.exports = { generate, status, candidates, approve, published };
