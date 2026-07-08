const Faculty = require('../models/Faculty');
const Room = require('../models/Room');
const Subject = require('../models/Subject');
const Batch = require('../models/Batch');
const TimeSlot = require('../models/TimeSlot');
const Timetable = require('../models/Timetable');
const { runGA } = require('../engine/gaRunner');

/**
 * Builds the session list + context from the DB, runs the GA, and persists
 * the top candidates as Timetable documents with status "pending-approval".
 * params: { departmentId, semester }
 */
async function runGenerationPipeline(params) {
  const { departmentId, semester } = params;

  const [batches, rooms, timeSlots] = await Promise.all([
    Batch.find({ department: departmentId, semester }).populate('subjects'),
    Room.find(),
    TimeSlot.find(),
  ]);

  // Flatten batches/subjects into individual sessions to schedule
  const sessionsToSchedule = [];
  for (const batch of batches) {
    for (const subject of batch.subjects) {
      const faculty = await Faculty.findOne({ subjectsQualified: subject._id });
      if (!faculty) continue; // TODO: surface "no qualified faculty" as a data issue to the admin
      for (let i = 0; i < subject.classesPerWeek; i++) {
        sessionsToSchedule.push({
          batchId: String(batch._id),
          subjectId: String(subject._id),
          facultyId: String(faculty._id),
          isLab: subject.type === 'lab',
        });
      }
    }
  }

  const timeSlotsById = {};
  timeSlots.forEach((s) => (timeSlotsById[String(s._id)] = s));

  const facultyList = await Faculty.find();
  const facultyPreferences = {};
  facultyList.forEach((f) => {
    facultyPreferences[String(f._id)] = {
      preferredSlotIds: (f.preferences?.preferredSlots || []).map((s) => String(s)),
    };
  });

  const context = {
    rooms: rooms.map((r) => ({ id: String(r._id), type: r.type, capacity: r.capacity })),
    timeSlots: timeSlots.map((s) => ({ id: String(s._id), day: s.day, period: s.period })),
    timeSlotsById,
    facultyPreferences,
  };

  const candidates = runGA(sessionsToSchedule, context);

  const saved = await Promise.all(
    candidates.map((c, idx) =>
      Timetable.create({
        status: 'pending-approval',
        fitnessScore: c.score,
        hardViolations: c.hard,
        generationNumber: idx,
        assignments: c.assignments,
      })
    )
  );

  return saved.map((t) => t._id);
}

module.exports = { runGenerationPipeline };
