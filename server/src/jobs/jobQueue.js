/**
 * Minimal in-memory job tracker for timetable generation.
 * Fine for a prototype / single-instance deployment. For production/multi-instance,
 * swap this for a real queue (e.g. Bull + Redis) without changing the controller API.
 */
const jobs = new Map(); // jobId -> { status, result, error }

const { runGenerationPipeline } = require('./generateTimetableJob');

function enqueueGenerationJob(jobId, params) {
  jobs.set(jobId, { status: 'running', result: null, error: null });

  // Fire and forget — in a real deployment this would be a worker process
  runGenerationPipeline(params)
    .then((result) => jobs.set(jobId, { status: 'complete', result, error: null }))
    .catch((err) => jobs.set(jobId, { status: 'failed', result: null, error: err.message }));
}

function getJobStatus(jobId) {
  return jobs.get(jobId) || null;
}

module.exports = { enqueueGenerationJob, getJobStatus };
